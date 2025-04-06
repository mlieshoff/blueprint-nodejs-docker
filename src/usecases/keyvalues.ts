import { IKeyValuesService, KeyValue } from "../domain/keyvalue";
import { Producer } from "../services/broker/producer";
import Files from "../services/files/files";
import RabbitMQConnection from "../services/broker";
import sql from "../services/db/db";
import { Logger } from "pino";

export type IKeyValues = {
  getAll: (limit: number, offset: number) => Promise<KeyValue[]>;
};

export class KeyValues implements IKeyValues {
  constructor(
    private readonly logger: Logger,
    private readonly service: IKeyValuesService,
    private readonly files: Files,
    private readonly producer: Producer,
  ) {}

  async getAll(limit: number, offset: number) {
    this.logger.debug("Incoming request at /");

    // send notification to broker
    const newNotification = {
      title: "You have received new notification",
      description:
        "You have received new incmoing notification from the producer service",
    };
    this.producer.sendNotification(newNotification);

    // store in fs
    const key = sql.options.user;
    const value = new Date().toISOString();
    await this.files.write(key + "-" + value + ".txt", value);

    // store in db
    return await this.service.getAll(limit, offset);
  }
}
