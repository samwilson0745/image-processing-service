from fastapi import HTTPException,APIRouter, status
from fastapi.responses import JSONResponse
import os
from PIL import Image
import uuid
from io import BytesIO
from dotenv import load_dotenv
from dto.resize import ResizeSchema
from dto.crop import CropRequest
from dto.flip_rotate import FlipRotateSchema
from utils.image import generate_presigned_url
# from aws import s3_client
import boto3
import os

router = APIRouter()

load_dotenv()

AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
AWS_BUCKET_REGION = os.getenv("AWS_BUCKET_REGION")

AWS_BUCKET_INPUT_NAME = os.getenv("AWS_BUCKET_INPUT_NAME")
AWS_BUCKET_OUTPUT_NAME = os.getenv("AWS_BUCKET_OUTPUT_NAME")

s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_BUCKET_REGION
)

@router.post("/resize")
async def image_resize(body:ResizeSchema):
    try:
        img_object = s3_client.get_object(Bucket=AWS_BUCKET_INPUT_NAME,Key=body.imageUrl)
        img = Image.open(BytesIO(img_object["Body"].read()))

        img = img.resize((body.width,body.height))

        img_bytes = BytesIO()
        img.save(img_bytes, format="PNG")  # Change format as needed
        img_bytes.seek(0)

        new_filename = f"resized_{uuid.uuid4()}.jpg"
        s3_client.upload_fileobj(
            img_bytes,
            AWS_BUCKET_OUTPUT_NAME,
            new_filename,
            ExtraArgs={"ContentType": "image/jpeg"}
        )
        file_url = generate_presigned_url(
            s3_client,
            bucket_name=AWS_BUCKET_OUTPUT_NAME,
            object_key=new_filename,
            expiration=3600
        )

        return JSONResponse(content={
            "message": "Image Resized and uploaded successfully",
            "url": file_url
        })

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Something went wrong")

@router.post("/crop")
async def image_crop(body: CropRequest):
    try:
        img_object = s3_client.get_object(Bucket=AWS_BUCKET_INPUT_NAME,Key=body.image_url)
        img = Image.open(BytesIO(img_object["Body"].read()))
        
        print("here")
        if body.x + body.width > img.width or body.y + body.height > img.height:
            raise HTTPException(status_code=400, detail="Crop area exceeds image boundaries")
        print("croping image")
        cropped_img = img.crop((body.x, body.y, body.x + body.width, body.y + body.height))

        img_bytes = BytesIO()
        cropped_img.save(img_bytes, format="PNG")  # Change format if needed
        img_bytes.seek(0)

        new_filename = f"cropped_{uuid.uuid4()}.jpg"
        print("saving image")
        s3_client.upload_fileobj(
            img_bytes,
            AWS_BUCKET_OUTPUT_NAME,
            new_filename,
            ExtraArgs={"ContentType": "image/jpeg"}
        )

        file_url = generate_presigned_url(
            bucket_name=AWS_BUCKET_OUTPUT_NAME,
            object_key=new_filename,
            expiration=3600
        )

        return JSONResponse(content={
            "message": "Image resized and uploaded successfully",
            "file_url": file_url
        })

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Something went wrong")

@router.post("/flip-rotate")
async def image_flip_rotate(body: FlipRotateSchema):
    try:
        print(body)
        img_object = s3_client.get_object(Bucket=AWS_BUCKET_INPUT_NAME, Key=body.image_url)
        print("got object")
        img = Image.open(BytesIO(img_object["Body"].read()))

        if body.flip:
            print("Image Flipping")
            if body.flip == "horizontal":
                img = img.transpose(Image.FLIP_LEFT_RIGHT)
            elif body.flip == "vertical":
                img = img.transpose(Image.FLIP_TOP_BOTTOM)
            elif body.flip == "both":
                img = img.transpose(Image.FLIP_LEFT_RIGHT).transpose(Image.FLIP_TOP_BOTTOM)
            else:
                raise HTTPException(status_code=400, detail="Invalid flip option. Use 'horizontal', 'vertical', or 'both'.")

        if body.rotate:
            print("Image rotating")
            if body.rotate not in [90, 180, 270]:
                raise HTTPException(status_code=400, detail="Invalid rotation angle. Use 90, 180, or 270.")
            img = img.rotate(body.rotate, expand=True)

        print("Converting to bytes images")
        img_bytes = BytesIO()
        img.save(img_bytes, format="PNG")
        img_bytes.seek(0)

        print("Svaing to s3 client")
        new_filename = f"modified_{uuid.uuid4()}.png"
        s3_client.upload_fileobj(
            img_bytes,
            AWS_BUCKET_OUTPUT_NAME,
            new_filename,
            ExtraArgs={"ContentType": "image/png"}
        )

        print("generating presigned url")
        file_url = generate_presigned_url(
            s3_client,
            bucket_name=AWS_BUCKET_OUTPUT_NAME,
            object_key=new_filename,
            expiration=3600
        )

        return JSONResponse(content={
            "message": "Image Modified successfully",
            "file_url": file_url
        })

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Something went wrong")