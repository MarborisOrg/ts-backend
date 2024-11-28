import amqp from 'amqplib';

const queues = {
  pending: 'status_pending',
  processing: 'status_processing',
  completed: 'status_completed',
};

export const sendMessage = async (/** @type {any} */ message, retries = 3) => {
  let connection;
  try {
    connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = queues[message.status] || queues.pending; // اگر وضعیت نامشخص باشد، به صف pending ارسال می‌شود
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
      await sendMessage(message, retries - 1);
    }
  } finally {
    if (connection) await connection.close();
  }
};
