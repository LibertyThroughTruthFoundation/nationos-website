#!/usr/bin/env python3
"""Convert markdown documents to HTML for NationOS website"""

import markdown
import os

# Document files to convert
documents = [
    ('The_Sovereign_Way_Constitution_FINAL_v3.0.md', 'constitution_content.html'),
    ('Universal_Declaration_of_Digital_Sovereignty_SOURCE.md', 'declaration_content.html'),
    ('Covenant_Education_Framework_FINAL_v2.0.md', 'education_content.html'),
    ('NationOS_12_Pillars_IMPLEMENTATION_GUIDE_v1.0.md', 'pillars_content.html')
]

docs_dir = 'documents'

for md_file, html_file in documents:
    md_path = os.path.join(docs_dir, md_file)
    html_path = os.path.join(docs_dir, html_file)
    
    if os.path.exists(md_path):
        with open(md_path, 'r', encoding='utf-8') as f:
            md_content = f.read()
        
        # Convert markdown to HTML
        html_content = markdown.markdown(md_content, extensions=['extra', 'codehilite'])
        
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"✓ Converted {md_file} to {html_file}")
    else:
        print(f"✗ File not found: {md_file}")

print("\nConversion complete!")
