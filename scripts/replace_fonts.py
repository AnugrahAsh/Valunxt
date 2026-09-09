import re

def replace_fonts(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Common replacements
    content = content.replace('"DM Sans"', '"Helvetica"')
    content = content.replace('"Forum"', '"Playfair Display"')
    
    # Specific realestate.css fixes
    content = content.replace('"Playfair Display", Georgia, serif;', '"Playfair Display", serif; font-style: italic;')
    content = content.replace('"Playfair Display", Georgia, "Times New Roman", serif;', '"Playfair Display", serif; font-style: italic;')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

replace_fonts('public/assets/css/valunxt-re-panels.css')
replace_fonts('public/assets/css/valunxt-realestate.css')
print("Done")
