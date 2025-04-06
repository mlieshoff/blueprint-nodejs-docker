import Config from "./config/config";
import closeWithGrace from "close-with-grace";

import { KeyValues } from "./usecases/keyvalues";
import KeyValuesDB from "./services/keyvaluesdb";
import Files from "./files/files";

import { FastifyApi } from "./api";
import { Producer } from "./services/broker/producer";
import { Consumer } from "./services/broker/consumer";
import { init, Logger } from "./services/logger";

(async () => {
  const logger: Logger = init(Config.services.logger);

  const keyValueService = new KeyValuesDB();
  const fileService = new Files();
  const producer = new Producer();

  const api = new FastifyApi(Config.api, logger, {
    keyValues: new KeyValues(keyValueService, fileService, producer),
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

  const consumer = new Consumer();
  await consumer.listen();
})();
