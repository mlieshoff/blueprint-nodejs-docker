import client, { Channel, ChannelModel } from "amqplib";

import Config from "../../config/config";
import { Logger } from "pino";

type HandlerCB = (msg: string) => any;

class RabbitMQConnection {
  constructor(private readonly logger: Logger) {}

  connection!: ChannelModel;
  channel!: Channel;
  private connected!: Boolean;

  async connect() {
    if (this.connected && this.channel) return;
    else this.connected = true;

    try {
      this.logger.info(`⌛️ Connecting to Rabbit-MQ Server`);
      this.connection = await client.connect(
        `amqp://${Config.broker.user}:${Config.broker.password}@${Config.broker.host}:${Config.broker.port}`,
      );

      this.logger.info(`✅ Rabbit MQ Connection is ready`);

      this.channel = await this.connection.createChannel();

      this.logger.info(`🛸 Created RabbitMQ Channel successfully`);
    } catch (error) {
      this.logger.error(`Not connected to MQ Server`, error);
    }
  }

  async sendToQueue(queue: string, message: any) {
    try {
      if (!this.channel) {
        await this.connect();
      }

      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async consume(handleIncomingNotification: HandlerCB) {
    await this.channel.assertQueue(Config.broker.queue, {
      durable: true,
    });

    this.channel.consume(
      Config.broker.queue,
      (msg) => {
        {
          if (!msg) {
            return this.logger.error(`Invalid incoming message`);
          }
          handleIncomingNotification(msg?.content?.toString());
          this.channel.ack(msg);
        }
      },
      {
        noAck: false,
      },
    );
  }
}
export default RabbitMQConnection;
