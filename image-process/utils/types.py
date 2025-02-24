from enum import Enum
from typing import Dict, Any


class TransformationType(Enum):
    RESIZE = "resize"
    CROP = "crop"
    FLIP = "flip"
    ROTATE = "rotate"

    @staticmethod
    def get_transformation_schema() -> Dict[str, Any]:
        return {
            TransformationType.RESIZE.value: {"width": int, "height": int},
            TransformationType.CROP.value: {"x": int, "y": int, "width": int, "height": int},
            TransformationType.FLIP.value: {"mode": str},  # "horizontal" or "vertical"
            TransformationType.ROTATE.value: {"degree": int},  # Rotation in degrees (90, 180, etc.)
        }
