import Config from "./config/config";
import closeWithGrace from "close-with-grace";

import { KeyValues } from "./usecases/keyvalues";
import KeyValuesDB from "./services/keyvaluesdb";
import Files from "./services/files/files";

import { FastifyApi } from "./api";
import { Producer } from "./services/broker/producer";
import { Consumer } from "./services/broker/consumer";
import { init, Logger } from "./services/logger";
import RabbitMQConnection from "./services/broker";

(async () => {
  const logger: Logger = init(Config.services.logger);

  const keyValueService = new KeyValuesDB();
  const fileService = new Files(logger);
  const mqConnection = new RabbitMQConnection(logger);
  await mqConnection.connect();
  const producer = new Producer(logger, mqConnection);

  const api = new FastifyApi(Config.api, logger, {
    keyValues: new KeyValues(logger, keyValueService, fileService, producer),
  });
  await api.serve();

  closeWithGrace(
    { delay: Config.gracefulShutdownTimeoutMs },
    async ({ signal, err }) => {
      if (err) logger.fatal(err);
      else logger.info(`${signal} received, stopping server...`);
      await api.close();
    },
  );

  const consumer = new Consumer(logger, mqConnection);
  await consumer.listen();
})();
