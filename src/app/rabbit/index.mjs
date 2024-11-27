import { connectToRabbitMQ } from './rabbit_rec/index.js';
import { sendMessage } from './rabbit_send/index.js';

const queues = {
  pending: 'status_pending',
  processing: 'status_processing',
  completed: 'status_completed',
};

void connectToRabbitMQ(queues.processing);

const text = {
  item_id: 'macbook',
  text: 'This is a sample message to send receiver to check the ordered Item Availability',
  timestamp: new Date().toISOString(),
  source: 'source_name',
  module: 'module_name',
  status: 'processing', // وضعیت پیام
};

setInterval(() => {
  void sendMessage(text);
}, 1000);
