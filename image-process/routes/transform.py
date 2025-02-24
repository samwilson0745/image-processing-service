from fastapi import HTTPException,APIRouter, status
from fastapi.responses import JSONResponse
from dto.transform import TransformationDTO
import os
from dotenv import load_dotenv
import boto3
import os
from PIL import Image
from io import BytesIO
from workers.image_process import process_image 
import uuid
from utils.image import generate_presigned_url

load_dotenv()

router = APIRouter()

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
@router.get("/transform")
async def image_resize(transform: TransformationDTO,):
    try:
        img_object = s3_client.get_object(Bucket=AWS_BUCKET_INPUT_NAME,Key=transform.img_id_with_ext)
        img = Image.open(BytesIO(img_object["Body"].read()))
        img_bytes = process_image(transform.transformation, img, transform)
        new_filename = f"transformed_{uuid.uuid4()}.jpg"
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
            "message":"Image transformed successfully",
            "url":file_url
        })
    except Exception as e:
        raise HTTPException(status_code=404, detail="Image not found")