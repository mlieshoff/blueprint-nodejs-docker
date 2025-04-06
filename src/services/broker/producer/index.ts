import Config from "../../../config/config";
import RabbitMQConnection from "../index";
import { Logger } from "pino";

export type INotification = {
  title: string;
  description: string;
};

export class Producer {
  constructor(
    private readonly logger: Logger,
    private readonly mqConnection: RabbitMQConnection,
  ) {}

  public sendNotification = async (notification: INotification) => {
    await this.mqConnection.sendToQueue(Config.broker.queue, notification);

    this.logger.debug(`Sent the notification to consumer`);
  };
}
