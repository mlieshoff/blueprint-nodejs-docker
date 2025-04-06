import Config from "../../../config/config";
import mqConnection from "../index";

export type INotification = {
  title: string;
  description: string;
};

export class Producer {
  public sendNotification = async (notification: INotification) => {
    await mqConnection.sendToQueue(Config.broker.queue, notification);

    console.log(`Sent the notification to consumer`);
  };
}
