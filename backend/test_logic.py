import easyocr
import os


reader = easyocr.Reader(['en']) 


image_path = 'test.png'


if not os.path.exists(image_path):
    print(f"Error: The file '{image_path}' was not found. Please check the file name and path.")
else:

    result = reader.readtext(image_path, detail=0)


    print("--- Extracted Text ---")
    for line in result:
        print(line)
    print("----------------------")
    