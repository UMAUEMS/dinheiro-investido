#!/usr/bin/env python3
"""Generate favicon and app icons for the project."""

from PIL import Image, ImageDraw, ImageFont
import os

# Cores do projeto
BG_COLOR = "#171A3D"
TEXT_COLOR = "#FFFFFF"

def create_icon(size, text="DI", output_path="icon.png"):
    """Create a simple icon with text."""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Background rounded rectangle
    draw.rounded_rectangle(
        [(0, 0), (size-1, size-1)],
        radius=size//6,
        fill=BG_COLOR
    )
    
    # Text
    font_size = size // 2
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        font = ImageFont.load_default()
    
    # Get text bounding box
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Center text
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - bbox[1]
    
    draw.text((x, y), text, fill=TEXT_COLOR, font=font)
    
    img.save(output_path)
    print(f"Created: {output_path}")

def create_og_image(output_path="og-image.jpg"):
    """Create Open Graph image."""
    width, height = 1200, 630
    img = Image.new('RGB', (width, height), BG_COLOR)
    draw = ImageDraw.Draw(img)
    
    # Title
    try:
        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 72)
        subtitle_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    title = "Dinheiro Investido"
    subtitle = "Crie Flipbooks e Publicações Digitais Interativas"
    
    # Draw title
    bbox = draw.textbbox((0, 0), title, font=title_font)
    x = (width - (bbox[2] - bbox[0])) // 2
    draw.text((x, 200), title, fill=TEXT_COLOR, font=title_font)
    
    # Draw subtitle
    bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    x = (width - (bbox[2] - bbox[0])) // 2
    draw.text((x, 320), subtitle, fill="#E5E5E6", font=subtitle_font)
    
    img.save(output_path, "JPEG", quality=90)
    print(f"Created: {output_path}")

def main():
    public_dir = "/home/ubuntu/dinheiro-investido/public"
    os.makedirs(public_dir, exist_ok=True)
    
    # Generate icons
    create_icon(16, "DI", os.path.join(public_dir, "favicon-16x16.png"))
    create_icon(32, "DI", os.path.join(public_dir, "favicon-32x32.png"))
    create_icon(180, "DI", os.path.join(public_dir, "apple-touch-icon.png"))
    create_icon(192, "DI", os.path.join(public_dir, "icon-192.png"))
    create_icon(512, "DI", os.path.join(public_dir, "icon-512.png"))
    
    # Generate OG image
    create_og_image(os.path.join(public_dir, "og-image.jpg"))
    
    # Create favicon.ico from 32x32
    img32 = Image.open(os.path.join(public_dir, "favicon-32x32.png"))
    img32.save(os.path.join(public_dir, "favicon.ico"), format="ICO", sizes=[(32, 32)])
    print(f"Created: {os.path.join(public_dir, 'favicon.ico')}")

if __name__ == "__main__":
    main()
