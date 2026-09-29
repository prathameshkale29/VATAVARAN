import base64

with open('public/vatavaran-emblem-transparent.png', 'rb') as f:
    emblem_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('public/vatavaran-logo-transparent.png', 'rb') as f:
    full_logo_b64 = base64.b64encode(f.read()).decode('utf-8')

# Favicon SVG (Square emblem)
favicon_svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <image href="data:image/png;base64,{emblem_b64}" x="0" y="0" width="500" height="500" preserveAspectRatio="xMidYMid meet" />
</svg>'''

with open('public/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(favicon_svg_content)

# Full Logo SVG
logo_svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 831" width="100%" height="100%">
  <image href="data:image/png;base64,{full_logo_b64}" x="0" y="0" width="1024" height="831" preserveAspectRatio="xMidYMid meet" />
</svg>'''

with open('public/vatavaran-logo.svg', 'w', encoding='utf-8') as f:
    f.write(logo_svg_content)

print("SVG files successfully generated!")
