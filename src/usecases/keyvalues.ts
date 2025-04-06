import { KeyValue, IKeyValuesService } from "../domain/keyvalue";
import {Producer} from "../services/broker/producer";
import mqConnection from "../services/broker";

export type IKeyValues = {
  getAll: (limit: number, offset: number) => Promise<KeyValue[]>;
};

export class KeyValues implements IKeyValues {
  constructor(private readonly service: IKeyValuesService, private readonly  producer : Producer) {}

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

    // store in db
    return await this.service.getAll(limit, offset);
  }
}
