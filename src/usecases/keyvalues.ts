import { KeyValue, IKeyValuesService } from "../domain/keyvalue";
import { Producer } from "../services/broker/producer";
import Files from "../files/files";
import mqConnection from "../services/broker";
import sql from "../db/db";

export type IKeyValues = {
  getAll: (limit: number, offset: number) => Promise<KeyValue[]>;
};

export class KeyValues implements IKeyValues {
  constructor(
    private readonly service: IKeyValuesService,
    private readonly files: Files,
    private readonly producer: Producer,
  ) {}

  async getAll(limit: number, offset: number) {
    console.log("Incoming request at /");

    // send notification to broker
    await mqConnection.connect();
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
