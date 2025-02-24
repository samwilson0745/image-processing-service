# import os
# import io
# import uuid


# def get_details():
#     connection_string = "DefaultEndpointsProtocol=https;AccountName=testvideosassets;AccountKey=wBHqMWFkkn5I4e/UCX2+iqC4vNnwX0zkf1pVTYA57hFPjNqmQ9B0++AszC1tWfssfgJBXBvNRsRv+AStfxYF5A==;EndpointSuffix=core.windows.net"
#     container_name = 'input-image'
#     return connection_string, container_name

# def get_clients_with_connection_string():
#     connection_string, container_name = get_details()
#     blob_service_client = BlobServiceClient.from_connection_string(connection_string)
#     container_client = blob_service_client.get_container_client(container_name)
#     return container_client

# def read_from_local_system(local_filename):
#     with open(f'{local_filename}', 'rb') as f:
#         binary_content = f.read()
#     return binary_content 

# def upload_to_blob_with_connection_string(byte_data,blob_name):
#     connection_string, container_name = get_details()
#     blob = BlobClient.from_connection_string(connection_string, container_name=container_name, blob_name=blob_name)
#     blob.upload_blob(byte_data)

# local_filename = "requirements.txt"
# blob_name = "req"

# byte_data = read_from_local_system(local_filename)
# upload_to_blob_with_connection_string(byte_data=byte_data,blob_name=blob_name)