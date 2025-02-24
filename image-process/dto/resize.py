from pydantic import BaseModel,Field, HttpUrl

class ResizeSchema(BaseModel):
    width: int = Field(..., gt=0, description="Width of the resized image")
    height: int = Field(..., gt=0, description="Height of the resized image")
    imageUrl: str = Field(..., description="Must be a the file name of the input")
    