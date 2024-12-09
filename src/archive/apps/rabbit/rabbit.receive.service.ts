import amqp from 'amqplib';

import { alertCaller } from './rabbit.receive.c.module.js';

export const connectToRabbitMQ = async (queue: string): Promise<void> => {
  try {
    const connection = await amqp.connect($.env.config.amqp);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });

    process.once('SIGINT', async () => {
      await channel.close();
      await connection.close();
    });

    await channel.prefetch(1);
    await channel.consume(
      queue,
      (message) => {
        if (message) {
          const msgContent = JSON.parse(message.content.toString());
          console.log(" [x] Received '%s' from queue '%s'", msgContent, queue);
          void alertCaller(msgContent);
          channel.ack(message);
        }
      },
      { noAck: false }
    );

    console.log(
      ` [*] Waiting for messages in queue '${queue}'. To exit press CTRL+C`
    );
  } catch (err) {
    console.warn(err);
  }
};
