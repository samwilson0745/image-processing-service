from PIL import Image
import os
from dto.transform import TransformationDTO
from io import BytesIO
OUTPUT_DIR = "processed"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def process_image(task, img, transform: TransformationDTO):
    if task == "resize":
        img = img.resize((transform.width, transform.height))
    if task == "resize":
        img = img.resize((200, 200))
    elif task == "crop":
        img = img.crop((50, 50, 200, 200))
    elif task == "flip":
        img = img.transpose(Image.FLIP_LEFT_RIGHT)
    elif task == "rotate":
        img = img.rotate(90)

    img_bytes = BytesIO()
    img.save(img_bytes, format="PNG")
    img_bytes.seek(0)
    
    return img_bytes
