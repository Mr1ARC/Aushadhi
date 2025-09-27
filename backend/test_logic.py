import easyocr
import os
import csv
from thefuzz import process

# --- Function to load our trusted database from the CSV file ---
def load_medicines_from_csv(filename="medicines.csv"):
    medicines = []
    with open(filename, mode='r', encoding='utf-8') as infile:
        reader = csv.DictReader(infile)
        for row in reader:
            medicines.append(row)
    return medicines

# --- Core Logic ---
# 1. Load the structured data from our CSV
all_medicines = load_medicines_from_csv()
known_brand_names = [med['brand_name'] for med in all_medicines]

# 2. Initialize OCR
reader = easyocr.Reader(['en'])
image_path = 'test2.jpg' # Make sure this is still correct

# 3. Process the image
if not os.path.exists(image_path):
    print(f"Error: The file '{image_path}' was not found.")
else:
    extracted_text_list = reader.readtext(image_path, detail=0)

    print("--- Finding Best Match ---")
    
    # --- FIXED LOGIC START ---
    # We will find the single best match from all the lines of text extracted.
    best_match_overall = None
    highest_score = 0
    
    # Loop through each individual line of text found in the image
    for text_line in extracted_text_list:
        # Find the best possible match for this specific line
        match = process.extractOne(text_line, known_brand_names)
        # If this line's match is better than any we've seen before, save it
        if match and match[1] > highest_score:
            highest_score = match[1]
            best_match_overall = match
    # --- FIXED LOGIC END ---

    # Now, check if the best match we found is above our confidence threshold
    if best_match_overall and highest_score > 85:
        matched_brand_name = best_match_overall[0]
        
        # Find the full details of the matched medicine
        medicine_details = next((med for med in all_medicines if med['brand_name'] == matched_brand_name), None)
        
        print(f"\n✅ Match Found with {highest_score}% confidence!")
        print("------------------------------------------")
        print(f"  Brand Name: {medicine_details['brand_name']}")
        print(f"  Generic Name: {medicine_details['generic_name']}")
        print(f"  Composition: {medicine_details['composition']}")
        print("------------------------------------------")

    else:
        print("\n❌ No confident match found in the trusted database.")
        print("This could be a look-alike or a counterfeit.")