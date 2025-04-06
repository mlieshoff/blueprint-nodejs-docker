import client, { ChannelModel, Channel, ConsumeMessage } from "amqplib";

import Config from "../../config/config";

type HandlerCB = (msg: string) => any;

class RabbitMQConnection {
  connection!: ChannelModel;
  channel!: Channel;
  private connected!: Boolean;

  async connect() {
    if (this.connected && this.channel) return;
    else this.connected = true;

    try {
      console.log(`⌛️ Connecting to Rabbit-MQ Server`);
      this.connection = await client.connect(
        `amqp://${Config.broker.user}:${Config.broker.password}@${Config.broker.host}:${Config.broker.port}`,
      );

      console.log(`✅ Rabbit MQ Connection is ready`);

      this.channel = await this.connection.createChannel();

      console.log(`🛸 Created RabbitMQ Channel successfully`);
    } catch (error) {
      console.error(error);
      console.error(`Not connected to MQ Server`);
    }
  }

  async sendToQueue(queue: string, message: any) {
    try {
      if (!this.channel) {
        await this.connect();
      }

      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (error) {
      console.error(error);
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
            return console.error(`Invalid incoming message`);
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

const mqConnection = new RabbitMQConnection();

export default mqConnection;
