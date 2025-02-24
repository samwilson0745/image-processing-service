from pydantic import BaseModel, Field
from typing import Literal, Optional, Annotated

class FlipRotateSchema(BaseModel):
    image_url: str = Field(..., description="Must be a filename only")
    flip: Optional[Literal["horizontal", "vertical", "both"]] = Field(None, description="Must be horizontal, vertical, both")
    rotate: int = Field(None,le=360,gt=0)
