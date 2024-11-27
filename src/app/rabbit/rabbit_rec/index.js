import amqp from 'amqplib';

export const connectToRabbitMQ = async (queue) => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });

    process.once('SIGINT', async () => {
      await channel.close();
      await connection.close();
    });

    channel.prefetch(1);
    channel.consume(
      queue,
      async (message) => {
        if (message) {
          const msgContent = JSON.parse(message.content.toString());
          console.log(" [x] Received '%s' from queue '%s'", msgContent, queue);
          channel.ack(message); // تأیید پیام
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

// ایجاد مصرف‌کننده برای هر صف
// Object.values(queues).forEach(queue => connectToRabbitMQ(queue));
