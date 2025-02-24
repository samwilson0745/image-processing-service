from enum import Enum
from pydantic import BaseModel, Field
from typing import Optional, Literal


# 1️⃣ Enum for transformation types
class TransformationType(str, Enum):
    RESIZE = "resize"
    CROP = "crop"
    FLIP = "flip"
    ROTATE = "rotate"


# 2️⃣ DTO for each transformation

class ResizeDTO(BaseModel):
    width: int = Field(gt=0, description="Width of the image")
    height: int = Field(gt=0, description="Height of the image")


class CropDTO(BaseModel):
    x: int = Field(ge=0, description="X coordinate of top-left corner")
    y: int = Field(ge=0, description="Y coordinate of top-left corner")
    width: int = Field(gt=0, description="Width of the cropped area")
    height: int = Field(gt=0, description="Height of the cropped area")


class FlipDTO(BaseModel):
    mode: Optional[Literal["horizontal","vertical","both"]] = Field(None, description="Flip mode ('horizontal' or 'vertical')")


class RotateDTO(BaseModel):
    degree: int = Field(ge=0, le=360, description="Rotation degree (0-360)")


# 3️⃣ Unified DTO with conditional fields
class TransformationDTO(BaseModel):
    transformation: TransformationType
    resize: Optional[ResizeDTO] = None
    crop: Optional[CropDTO] = None
    flip: Optional[FlipDTO] = None
    rotate: Optional[RotateDTO] = None
    img_id_with_ext: str = Field(..., description="Image ID with extension")
    @staticmethod
    def validate_transformation(data):
        """ Ensure only the required transformation data is provided. """
        transformation_type = data["transformation"]

        if transformation_type == TransformationType.RESIZE and not data.get("resize"):
            raise ValueError("Resize parameters are required for resize transformation.")
        elif transformation_type == TransformationType.CROP and not data.get("crop"):
            raise ValueError("Crop parameters are required for crop transformation.")
        elif transformation_type == TransformationType.FLIP and not data.get("flip"):
            raise ValueError("Flip parameters are required for flip transformation.")
        elif transformation_type == TransformationType.ROTATE and not data.get("rotate"):
            raise ValueError("Rotate parameters are required for rotate transformation.")
        
        return data
