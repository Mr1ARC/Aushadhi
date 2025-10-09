from flask import Flask, request, jsonify
import os
import csv
import easyocr
from thefuzz import process
from flask_cors import CORS
import logging
from werkzeug.utils import secure_filename
import uuid
from PIL import Image
import io

# Initialize the Flask application
app = Flask(__name__)
CORS(app) # This line gives your frontend permission to connect

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- Pre-load Models and Data ---
print("Loading EasyOCR reader...")
try:
    # Fix SSL certificate issue for model download
    import ssl
    ssl._create_default_https_context = ssl._create_unverified_context
    reader = easyocr.Reader(['en'])
    print("EasyOCR reader loaded successfully.")
except Exception as e:
    print(f"Error loading EasyOCR: {e}")
    reader = None

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_image(file):
    """Validate image file and return processed image"""
    try:
        # Check file size
        file.seek(0, 2)  # Seek to end
        file_size = file.tell()
        file.seek(0)  # Reset to beginning
        
        if file_size > MAX_FILE_SIZE:
            return None, "File size too large. Maximum size is 10MB."
        
        # Try to open with PIL to validate it's a proper image
        image = Image.open(file)
        file.seek(0)  # Reset for later use
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        return image, None
    except Exception as e:
        return None, f"Invalid image file: {str(e)}"

# --- MODIFIED FUNCTION FOR YOUR NEW CSV ---
def load_medicines_from_csv(filename="Finally.csv"):
    """Function to load the trusted database from your new two-column CSV file."""
    medicines = []
    brand_names = []
    
    try:
        # Use 'utf-8-sig' to handle potential BOM characters in CSV files
        with open(filename, mode='r', encoding='utf-8-sig') as infile:
            # Use csv.reader for files without a header
            csv_reader = csv.reader(infile)
            for row_num, row in enumerate(csv_reader, 1):
                if len(row) == 2: # Ensure the row has exactly two columns
                    composition, brand_name = row
                    # Clean and validate data
                    composition = composition.strip()
                    brand_name = brand_name.strip()
                    
                    if composition and brand_name:  # Skip empty rows
                        medicines.append({
                            "composition": composition, 
                            "brand_name": brand_name,
                            "id": row_num
                        })
                        brand_names.append(brand_name)
                elif len(row) > 0:  # Skip completely empty rows
                    logger.warning(f"Skipping malformed row {row_num}: {row}")
        
        print(f"Successfully loaded {len(medicines)} medicine records from {filename}.")
        return medicines, brand_names
        
    except FileNotFoundError:
        logger.error(f"CSV file {filename} not found!")
        return [], []
    except Exception as e:
        logger.error(f"Error loading CSV file: {e}")
        return [], []

# Load medicine database
all_medicines, known_brand_names = load_medicines_from_csv()

# Create a list of all compositions for matching
known_compositions = [med['composition'] for med in all_medicines]

if not all_medicines:
    logger.warning("No medicine data loaded! The verification system will not work properly.")

# --- API Endpoints ---
@app.route("/")
def health_check():
    """A simple health check to confirm the server is running."""
    return jsonify({
        "status": "success", 
        "message": "Aushadhi-OCR API is running!",
        "version": "2.0.0",
        "database_loaded": len(all_medicines) > 0,
        "medicine_count": len(all_medicines),
        "ocr_available": reader is not None
    })

@app.route("/api/stats", methods=['GET'])
def get_stats():
    """Get database and system statistics."""
    return jsonify({
        "status": "success",
        "stats": {
            "total_medicines": len(all_medicines),
            "database_loaded": len(all_medicines) > 0,
            "ocr_available": reader is not None,
            "supported_formats": list(ALLOWED_EXTENSIONS),
            "max_file_size_mb": MAX_FILE_SIZE // (1024 * 1024)
        }
    })

@app.route("/api/verify", methods=['POST'])
def verify_medicine():
    """The main endpoint to verify a medicine image."""
    # Check if OCR reader is available
    if not reader:
        return jsonify({
            "status": "error", 
            "message": "OCR service is not available. Please try again later."
        }), 503

    # Check if medicine database is loaded
    if not all_medicines:
        return jsonify({
            "status": "error", 
            "message": "Medicine database is not available. Please contact support."
        }), 503

    # 1. Check if the 'image' key is in the request
    if 'image' not in request.files:
        return jsonify({"status": "error", "message": "No image file provided."}), 400

    image_file = request.files['image']

    # 2. Check if the filename is empty
    if image_file.filename == '':
        return jsonify({"status": "error", "message": "No selected file."}), 400

    # 3. Check if the file type is allowed
    if not (image_file and allowed_file(image_file.filename)):
        return jsonify({
            "status": "error", 
            "message": "Invalid file type. Please upload a PNG, JPG, or BMP image."
        }), 400

    # 4. Validate image
    image, validation_error = validate_image(image_file)
    if validation_error:
        return jsonify({
            "status": "error", 
            "message": validation_error
        }), 400

    # --- If all checks pass, proceed ---
    temp_filename = f"temp_image_{uuid.uuid4().hex}.jpg"
    temp_path = os.path.join("/tmp", temp_filename) if os.path.exists("/tmp") else temp_filename
    
    try:
        # Save the validated image
        image.save(temp_path, "JPEG", quality=95)
        
        # Extract text using OCR
        extracted_text_list = reader.readtext(temp_path, detail=0)
        
        if not extracted_text_list:
            return jsonify({
                "status": "success",
                "match_found": False,
                "message": "No text could be detected in the image. Please ensure the image is clear and contains readable text.",
                "extracted_text": []
            })

        # Join all text and check for pharmaceutical keywords
        full_text = " ".join(extracted_text_list).lower()
        pharma_keywords = [
            "mg", "tablet", "capsule", "ointment", "syrup", "rx", "pharma", 
            "dosage", "ndc", "medicine", "drug", "pharmaceutical", "prescription",
            "batch", "expiry", "manufacturer", "composition", "ingredient"
        ]
        
        keyword_matches = [keyword for keyword in pharma_keywords if keyword in full_text]
        
        if not keyword_matches:
            return jsonify({
                "status": "success",
                "match_found": False,
                "message": "Image does not appear to be a medicine package. No pharmaceutical keywords detected.",
                "extracted_text": extracted_text_list[:5],  # Return first 5 lines for debugging
                "suggestions": "Please ensure you're uploading an image of a medicine package with visible text."
            })

        # Extract medicine name and brand name from the text
        def extract_medicine_info(text_list):
            medicine_names = []
            brand_names = []
            
            for text in text_list:
                text_upper = text.upper().strip()
                
                # Skip very short or numeric text
                if len(text_upper) < 3 or text_upper.isdigit():
                    continue
                
                # Skip common packaging words
                packaging_words = ['BLISTER', 'STRIP', 'TABLET', 'CAPSULE', 'MG', 'ML', 'EXP', 'BATCH', 'MFG', 'MANUFACTURED', 'BY']
                if any(word in text_upper for word in packaging_words):
                    continue
                
                # Clean the text
                import re
                cleaned_text = re.sub(r'[^A-Z\s\-]', '', text_upper)
                cleaned_text = ' '.join(cleaned_text.split())
                
                if len(cleaned_text) >= 3:
                    # Try to match against compositions (medicine names)
                    comp_match = process.extractOne(cleaned_text, known_compositions)
                    if comp_match and comp_match[1] > 80:
                        medicine_names.append({
                            "text": text,
                            "cleaned": cleaned_text,
                            "match": comp_match[0],
                            "score": comp_match[1],
                            "type": "composition"
                        })
                    
                    # Try to match against brand names
                    brand_match = process.extractOne(cleaned_text, known_brand_names)
                    if brand_match and brand_match[1] > 80:
                        brand_names.append({
                            "text": text,
                            "cleaned": cleaned_text,
                            "match": brand_match[0],
                            "score": brand_match[1],
                            "type": "brand"
                        })
            
            return medicine_names, brand_names
        
        # Extract medicine and brand information
        extracted_medicines, extracted_brands = extract_medicine_info(extracted_text_list)
        
        # Find matching combinations in our database
        verified_matches = []
        
        for med in extracted_medicines:
            for brand in extracted_brands:
                # Check if this combination exists in our database
                matching_medicine = next(
                    (m for m in all_medicines 
                     if m['composition'] == med['match'] and m['brand_name'] == brand['match']), 
                    None
                )
                
                if matching_medicine:
                    # Calculate combined confidence score
                    combined_score = (med['score'] + brand['score']) / 2
                    verified_matches.append({
                        "medicine": med,
                        "brand": brand,
                        "details": matching_medicine,
                        "confidence": combined_score
                    })
        
        # Sort by confidence score
        verified_matches.sort(key=lambda x: x['confidence'], reverse=True)
        
        # Determine if we have a good match
        confidence_threshold = 85

        if verified_matches and verified_matches[0]['confidence'] > confidence_threshold:
            best_match = verified_matches[0]
            
            return jsonify({
                "status": "success",
                "match_found": True,
                "confidence": round(best_match['confidence'], 1),
                "details": best_match['details'],
                "extracted_text": extracted_text_list[:5],
                "keyword_matches": keyword_matches,
                "verification_notes": "Medicine verified against trusted database.",
                "extracted_medicine": best_match['medicine']['text'],
                "extracted_brand": best_match['brand']['text'],
                "matched_composition": best_match['medicine']['match'],
                "matched_brand": best_match['brand']['match']
            })
        else:
            # Provide detailed feedback about what was found
            return jsonify({
                "status": "success",
                "match_found": False,
                "message": "No matching medicine found in database. This could indicate a counterfeit or unregistered medicine.",
                "extracted_text": extracted_text_list[:5],
                "keyword_matches": keyword_matches,
                "extracted_medicines": [{"text": m["text"], "match": m["match"], "score": m["score"]} for m in extracted_medicines],
                "extracted_brands": [{"text": b["text"], "match": b["match"], "score": b["score"]} for b in extracted_brands],
                "verified_matches": [{"confidence": m["confidence"], "composition": m["details"]["composition"], "brand": m["details"]["brand_name"]} for m in verified_matches[:3]],
                "confidence_threshold": confidence_threshold,
                "suggestions": [
                    "Check if the medicine name and brand are spelled correctly",
                    "Verify the medicine is from a licensed manufacturer",
                    "Consult a healthcare professional if unsure"
                ]
            })

    except Exception as e:
        logger.error(f"Error during medicine verification: {e}")
        return jsonify({
            "status": "error", 
            "message": "An error occurred during verification. Please try again."
        }), 500

    finally:
        # Clean up temporary file
        if os.path.exists(temp_path):
            try:
                os.remove(temp_path)
            except Exception as e:
                logger.warning(f"Could not remove temporary file {temp_path}: {e}")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(debug=False, host="0.0.0.0", port=port)