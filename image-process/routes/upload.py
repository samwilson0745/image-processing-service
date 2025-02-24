from fastapi import File, UploadFile, HTTPException, APIRouter, status
import os
import uuid
from aws import s3_client

router = APIRouter()

AWS_BUCKET_INPUT_NAME = os.getenv("AWS_BUCKET_INPUT_NAME")
AWS_BUCKET_REGION = os.getenv("AWS_BUCKET_REGION")


@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    allowed_extensions = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"}
    file_extension = os.path.splitext(file.filename)[1].lower()

    if file_extension not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Invalid file type. Only images are allowed.")
    
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    
    try:
        s3_client.upload_fileobj(
            file.file,
            AWS_BUCKET_INPUT_NAME,
            unique_filename,
            ExtraArgs={"ContentType": file.content_type}
        )
        file_url = f"https://{AWS_BUCKET_INPUT_NAME}.s3.{AWS_BUCKET_REGION}.amazonaws.com/{unique_filename}"
        return {"message": "File uploaded successfully", "file_url": file_url}

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=f"File upload failed: {str(e)}")
