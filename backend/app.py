from flask import Flask, request, jsonify
import os
import csv
import easyocr
from thefuzz import process
from flask_cors import CORS 

# Initialize the Flask application
app = Flask(__name__)
CORS(app) # This line gives your frontend permission to connect

# --- Pre-load Models and Data ---
print("Loading EasyOCR reader...")
reader = easyocr.Reader(['en'])
print("EasyOCR reader loaded.")

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp'}
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# --- MODIFIED FUNCTION FOR YOUR NEW CSV ---
def load_medicines_from_csv(filename="Finally.csv"):
    """Function to load the trusted database from your new two-column CSV file."""
    medicines = []
    brand_names = []
    # Use 'utf-8-sig' to handle potential BOM characters in CSV files
    with open(filename, mode='r', encoding='utf-8-sig') as infile:
        # Use csv.reader for files without a header
        reader = csv.reader(infile)
        for row in reader:
            if len(row) == 2: # Ensure the row has exactly two columns
                composition, brand_name = row
                medicines.append({"composition": composition.strip(), "brand_name": brand_name.strip()})
                brand_names.append(brand_name.strip())
    print(f"Loaded {len(medicines)} medicine records from {filename}.")
    return medicines, brand_names

all_medicines, known_brand_names = load_medicines_from_csv()

# --- API Endpoints ---
@app.route("/")
def health_check():
    """A simple health check to confirm the server is running."""
    return jsonify({"status": "success", "message": "MedVerify-AI API is running!"})

@app.route("/api/verify", methods=['POST'])
def verify_medicine():
    """The main endpoint to verify a medicine image."""
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

    # --- If all checks pass, proceed ---
    temp_path = "temp_image.jpg"
    image_file.save(temp_path)

    try:
        extracted_text_list = reader.readtext(temp_path, detail=0)
        
        if not extracted_text_list:
            return jsonify({
                "status": "success",
                "match_found": False,
                "message": "No text could be detected in the image."
            })

        full_text = " ".join(extracted_text_list).lower()
        pharma_keywords = ["mg", "tablet", "capsule", "ointment", "syrup", "rx", "pharma", "dosage", "ndc"]
        if not any(keyword in full_text for keyword in pharma_keywords):
            return jsonify({
                "status": "success",
                "match_found": False,
                "message": "Image does not appear to be a medicine package (missing keywords)."
            })

        best_match_overall = None
        highest_score = 0
        
        for text_line in extracted_text_list:
            match = process.extractOne(text_line, known_brand_names)
            if match and match[1] > highest_score:
                highest_score = match[1]
                best_match_overall = match

        if best_match_overall and highest_score > 90:
            matched_brand_name = best_match_overall[0]
            medicine_details = next((med for med in all_medicines if med['brand_name'] == matched_brand_name), None)
            return jsonify({
                "status": "success",
                "match_found": True,
                "confidence": highest_score,
                "details": medicine_details
            })
        else:
            return jsonify({
                "status": "success",
                "match_found": False,
                "message": "No confident match found. Could be a counterfeit."
            })

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(debug=False, host="0.0.0.0", port=port)