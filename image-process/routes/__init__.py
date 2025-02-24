from fastapi import APIRouter
from .upload import router as UploadRouter
from .image import router as ImageRouter
from .transform import router as TransformRouter
router = APIRouter()

router.include_router(UploadRouter, prefix="/image",tags=["Image Upload"])
router.include_router(ImageRouter,prefix="/image")
router.include_router(TransformRouter,prefix="/image")