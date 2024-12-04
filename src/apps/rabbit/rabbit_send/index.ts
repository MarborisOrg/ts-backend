import amqp from 'amqplib';

export const sendMessage = async (
  message: object,
  queue: string,
  delay: number = 0,
  retries = 3
): Promise<void> => {
  let connection;
  try {
    connection = await amqp.connect($.env.config.amqp);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });

    const delayQueue = `${queue}_delay`;
    await channel.assertQueue(delayQueue, {
      durable: true,
      arguments: {
        'x-dead-letter-exchange': '',
        'x-dead-letter-routing-key': queue,
        'x-message-ttl': delay,
      },
    });

    channel.sendToQueue(delayQueue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
    console.log(" [x] Sent '%s' to delay queue '%s'", message, delayQueue);
    await channel.close();
  } catch (err) {
    console.warn('Error sending message:', err);
    if (retries > 0) {
      console.log(`Retrying... (${3 - retries + 1})`);
      await sendMessage(message, queue, delay, retries - 1);
    }
  } finally {
    if (connection) await connection.close();
  }
};
