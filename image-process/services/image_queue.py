import pika
import json
import uuid

class ImageQueue:
    def __init__(self, rabbitmq_host="localhost", queue_name="image_tasks"):
        self.rabbitmq_host = rabbitmq_host
        self.queue_name = queue_name
        self.connection = None
        self.channel = None
        self._connect()

    def _connect(self):
        """Establishes connection with RabbitMQ."""
        try:
            self.connection = pika.BlockingConnection(pika.ConnectionParameters(self.rabbitmq_host))
            self.channel = self.connection.channel()
            self.channel.queue_declare(queue=self.queue_name, durable=True)
        except Exception as e:
            print(f"RabbitMQ connection error: {e}")

    def publish_message(self, task_type: str, file_path: str):
        """Publishes an image processing task to RabbitMQ."""
        if not self.channel or self.connection.is_closed:
            self._connect()

        job_id = str(uuid.uuid4())  # Generate unique Job ID
        message = {
            "job_id": job_id,
            "task": task_type,
            "file_path": file_path
        }

        self.channel.basic_publish(
            exchange="",
            routing_key=self.queue_name,
            body=json.dumps(message),
            properties=pika.BasicProperties(delivery_mode=2),  # Message is persistent
        )

        print(f"Queued Task: {task_type} - Job ID: {job_id}")
        return job_id

    def consume_messages(self, callback):
        """Consumes messages from the RabbitMQ queue."""
        if not self.channel or self.connection.is_closed:
            self._connect()

        self.channel.basic_consume(queue=self.queue_name, on_message_callback=callback)
        print("Waiting for messages...")
        self.channel.start_consuming()

    def acknowledge_message(self, method):
        """Acknowledges a message after successful processing."""
        self.channel.basic_ack(delivery_tag=method.delivery_tag)

    def close(self):
        """Closes the connection."""
        if self.connection and not self.connection.is_closed:
            self.connection.close()
