import amqp, { Channel, Connection } from 'amqplib';

const EXCHANGE_NAME = 'delayed_exchange';

class RabbitMQService {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  private async initRabbitMQ(): Promise<void> {
    if (!this.connection) {
      this.connection = await amqp.connect($.env.config.amqp);
      this.channel = await this.connection.createChannel();
      console.log('RabbitMQ connection and channel created.');
    }
  }

  private async assertQueues(queue: string): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not initialized.');
    }

    await this.channel.assertExchange(EXCHANGE_NAME, 'x-delayed-message', {
      durable: true,
      arguments: {
        'x-delayed-type': 'direct',
      },
    });

    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.bindQueue(queue, EXCHANGE_NAME, '');
  }

  public async sendMessage(
    message: object,
    queue: string,
    delayMs: number = 0,
    retries: number = 3
  ): Promise<void> {
    try {
      await this.initRabbitMQ();
      await this.assertQueues(queue);

      if (!this.channel) {
        throw new Error('Channel is not initialized.');
      }

      this.channel.publish(
        EXCHANGE_NAME,
        '',
        Buffer.from(JSON.stringify(message)),
        {
          headers: {
            'x-delay': delayMs,
          },
        }
      );
      console.log(
        " [x] Sent '%s' to delay queue '%s'",
        JSON.stringify(message),
        `${queue}_delay`
      );
    } catch (err) {
      console.warn('Error sending message:', err);
      if (retries > 0) {
        console.log(`Retrying... (${3 - retries + 1})`);
        await this.sendMessage(message, queue, delayMs, retries - 1);
      }
    }
  }

  public async closeConnection(): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
    console.log('RabbitMQ connection closed.');
  }
}

export default new RabbitMQService();
