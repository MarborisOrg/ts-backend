import { connectToRabbitMQ } from './rabbit.receive.service.js';
import RabbitMQService from './rabbit.send.service.js';

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
    void RabbitMQService.sendMessage(text, $.config.queue, 3000).then(
      async function () {
        await RabbitMQService.closeConnection();
        process.exit();
      }
    );
  }
}
