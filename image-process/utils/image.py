from typing import Dict
import aiohttp
# from aws import s3_client

async def download_image(url: str) -> Dict:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return response
        
def generate_presigned_url(s3_client,bucket_name, object_key, expiration=3600):
    url = s3_client.generate_presigned_url(
        "get_object",
        Params={"Bucket": bucket_name, "Key": object_key },
        ExpiresIn=expiration
    )
    return url