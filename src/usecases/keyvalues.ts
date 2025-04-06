import { IKeyValuesService, KeyValue } from "../domain/keyvalue";
import { Producer } from "../services/broker/producer";
import Files from "../services/files/files";
import { Logger } from "pino";

export type IKeyValues = {
  getAll: (limit: number, offset: number) => Promise<KeyValue[]>;
  write: (key: string, value: string) => Promise<KeyValue>;
};

export class KeyValues implements IKeyValues {
  constructor(
    private readonly logger: Logger,
    private readonly service: IKeyValuesService,
    private readonly files: Files,
    private readonly producer: Producer,
  ) {}

  async getAll(limit: number, offset: number) {
    this.logger.debug("Incoming request at /getAll");

    return await this.service.getAll(limit, offset);
  }

  async write(key: string, value: string): Promise<KeyValue> {
    this.logger.debug("Incoming request at /write");

    // send notification to broker
    const newNotification = {
      title: "You have received new notification",
      description:
        "You have received new incoming notification from the producer service",
    };
    await this.producer.sendNotification(newNotification);

    // write to share
    await this.files.write(key + "-" + value + ".txt", value);

    // store in db
    return await this.service.save(key, value);
  }
}
