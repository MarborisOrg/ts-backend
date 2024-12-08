import { connectToRabbitMQ } from './rabbit_rec/rabbit.receive.service.js';
import { sendMessage } from './rabbit_send/rabbit.send.service.js';

export default function (): void {
  if ($.config.rabbit == 'rec') {
    void connectToRabbitMQ($.config.queue);
  } else if ($.config.rabbit == 'send') {
    const text = {
      item_id: 'macbook',
      text: 'This is a sample message to send receiver to check the ordered Item Availability',
      timestamp: new Date().toISOString(),
      source: 'source_name',
      module: 'module_name',
    };
    void sendMessage(text, $.config.queue, 3000).then(function () {
      process.exit();
    });
  }
}
