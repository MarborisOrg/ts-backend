import amqp from 'amqplib';

import { config } from '#config/env_get';

export const sendMessage = async (
  message: object,
  queue: string,
  retries = 3
): Promise<void> => {
  let connection;
  try {
    connection = await amqp.connect(config.amqp);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
    console.log(" [x] Sent '%s' to queue '%s'", message, queue);
    await channel.close();
  } catch (err) {
    console.warn('Error sending message:', err);
    if (retries > 0) {
      console.log(`Retrying... (${3 - retries + 1})`);
      await sendMessage(message, queue, retries - 1);
    }
  } finally {
    if (connection) await connection.close();
  }
};
