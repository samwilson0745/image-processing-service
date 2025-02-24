from pydantic import BaseModel, Field

class CropRequest(BaseModel):
    image_url: str = Field(..., description="Must be a filename only")
    x: int = Field(..., gt=0, description="Must be a number")
    y: int = Field(..., gt=0, description="Must be a number")
    width: int = Field(..., gt=0, description="Must be a number")
    height: int = Field(..., gt=0, description="Must be a number")