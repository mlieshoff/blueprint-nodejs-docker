import { Logger } from "pino";
import RabbitMQConnection from "../index";

export class Consumer {
  constructor(
    private readonly logger: Logger,
    private readonly mqConnection: RabbitMQConnection,
  ) {}

  public handleIncomingNotification = (msg: string) => {
    try {
      const parsedMessage = JSON.parse(msg);

      this.logger.debug(`Received Notification`, parsedMessage);

      // Implement your own notification flow
    } catch (error) {
      this.logger.error(`Error While Parsing the message`, error);
    }
  };

  public listen = async () => {
    await this.mqConnection.connect();

    await this.mqConnection.consume(this.handleIncomingNotification);
  };
}
