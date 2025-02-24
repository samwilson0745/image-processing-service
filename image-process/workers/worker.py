from services.image_queue import ImageQueue
from workers.image_process import process_image
import json

queue = ImageQueue()

def callback(ch, method, properties, body):
    data = json.loads(body)
    task = data["task"]
    file_path = data["file_path"]
    print(f"Processing {task} for {file_path}...")
    
    output_path = process_image(task, file_path)
    print(f"Processed Image Saved: {output_path}")

    queue.acknowledge_message(method)

if __name__ == "__main__":
    queue.consume_messages(callback)
