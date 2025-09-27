from flask import Flask, request, jsonify
import os
import csv
import easyocr
from thefuzz import process
from flask_cors import CORS 




# Initialize the Flask application
app = Flask(__name__)
CORS(app)

# --- Pre-load Models and Data (for performance) ---
# We do this once when the server starts, so we don't have to reload
# the models and data on every single API request. This is much faster.
print("Loading EasyOCR reader...")
reader = easyocr.Reader(['en'])
print("EasyOCR reader loaded.")

def load_medicines_from_csv(filename="medicines.csv"):
    """Function to load our trusted database from the CSV file."""
    medicines = []
    with open(filename, mode='r', encoding='utf-8') as infile:
        reader = csv.DictReader(infile)
        for row in reader:
            medicines.append(row)
    print(f"Loaded {len(medicines)} medicine records from CSV.")
    return medicines

all_medicines = load_medicines_from_csv()
known_brand_names = [med['brand_name'] for med in all_medicines]

# --- API Endpoints ---
@app.route("/")
def health_check():
    """A simple health check to confirm the server is running."""
    return jsonify({"status": "success", "message": "Aushadhi-OCR API is running!"})

@app.route("/api/verify", methods=['POST'])
def verify_medicine():
    """
    The main endpoint to verify a medicine image.
    It expects a file upload with the key 'image'.
    """
    # 1. Check if an image file is in the request
    if 'image' not in request.files:
        return jsonify({"status": "error", "message": "No image file provided."}), 400

    image_file = request.files['image']

    # 2. Check if the file is empty
    if image_file.filename == '':
        return jsonify({"status": "error", "message": "No selected file."}), 400

    if image_file:
        # 3. Save the image temporarily
        temp_path = "temp_image.jpg"
        image_file.save(temp_path)

        try:
            # 4. Run our existing OCR and matching logic
            extracted_text_list = reader.readtext(temp_path, detail=0)

            best_match_overall = None
            highest_score = 0
            
            for text_line in extracted_text_list:
                match = process.extractOne(text_line, known_brand_names)
                if match and match[1] > highest_score:
                    highest_score = match[1]
                    best_match_overall = match

            # 5. Prepare the JSON response
            if best_match_overall and highest_score > 85:
                matched_brand_name = best_match_overall[0]
                medicine_details = next((med for med in all_medicines if med['brand_name'] == matched_brand_name), None)
                
                response_data = {
                    "status": "success",
                    "match_found": True,
                    "confidence": highest_score,
                    "details": medicine_details
                }
                return jsonify(response_data)
            else:
                response_data = {
                    "status": "success",
                    "match_found": False,
                    "message": "No confident match found. Could be a counterfeit."
                }
                return jsonify(response_data)

        finally:
            # 6. Clean up by deleting the temporary file
            if os.path.exists(temp_path):
                os.remove(temp_path)

    return jsonify({"status": "error", "message": "Invalid file."}), 400

if __name__ == "__main__":
    app.run(debug=True)