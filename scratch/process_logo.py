import os
from PIL import Image, ImageOps
import numpy as np

img_path = 'public/vatavaran-logo.jpg'
img = Image.open(img_path).convert('RGBA')
w, h = img.size

# 1. Full logo saved as PNG
img.save('public/vatavaran-logo.png', 'PNG')

# 2. Transparent background version (make near-white pixels transparent with smooth alpha blend)
data = np.array(img)
r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]

# Calculate brightness / distance from pure white (255, 255, 255)
# White is r>240, g>240, b>240
white_thresh = 240
is_white = (r > white_thresh) & (g > white_thresh) & (b > white_thresh)

# Create smooth alpha channel
alpha = np.ones_like(a) * 255
# For pixels close to white, fade out alpha
min_rgb = np.minimum(np.minimum(r, g), b)
# Scale alpha linearly between 210 and 250
alpha_factor = np.clip((252.0 - min_rgb) / (252.0 - 210.0), 0.0, 1.0)
alpha = (alpha * alpha_factor).astype(np.uint8)

transparent_data = data.copy()
transparent_data[:, :, 3] = alpha

transparent_img = Image.fromarray(transparent_data, 'RGBA')
transparent_img.save('public/vatavaran-logo-transparent.png', 'PNG')

# 3. Emblem crop (Top portion containing the circle emblem, roughly y=0 to y=690)
# Let's crop emblem box (x: 180 to 850, y: 20 to 690)
emblem_crop = img.crop((180, 20, 850, 690))
emblem_crop.save('public/vatavaran-emblem.png', 'PNG')

# Emblem transparent crop
emblem_trans_crop = transparent_img.crop((180, 20, 850, 690))
emblem_trans_crop.save('public/vatavaran-emblem-transparent.png', 'PNG')

# 4. Favicon icons (32x32, 48x48, apple touch 180x180)
# Use transparent emblem centered in a circular/square format
sq_size = max(emblem_trans_crop.width, emblem_trans_crop.height)
sq_bg = Image.new('RGBA', (sq_size, sq_size), (0, 0, 0, 0))
offset = ((sq_size - emblem_trans_crop.width) // 2, (sq_size - emblem_trans_crop.height) // 2)
sq_bg.paste(emblem_trans_crop, offset, emblem_trans_crop)

sq_bg.resize((32, 32), Image.Resampling.LANCZOS).save('public/vatavaran-icon-32.png')
sq_bg.resize((48, 48), Image.Resampling.LANCZOS).save('public/vatavaran-icon-48.png')
sq_bg.resize((180, 180), Image.Resampling.LANCZOS).save('public/apple-touch-icon.png')
# Save favicon.ico
sq_bg.resize((64, 64), Image.Resampling.LANCZOS).save('public/favicon.ico', format='ICO')

print("Logo variants successfully generated!")
