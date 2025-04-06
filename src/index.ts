import Config from "./config/config";

import { KeyValues } from "./usecases/keyvalues";
import KeyValuesDB from "./services/keyvaluesdb";

import { FastifyApi } from "./api";
import {Producer} from "./services/broker/producer";
import {Consumer} from "./services/broker/consumer";

(async () => {
  console.log(JSON.stringify(Config));

  const keyValueService = new KeyValuesDB();
  const producer = new Producer();

  const api = new FastifyApi(Config.api, {
    keyValues: new KeyValues(keyValueService, producer),
  });
  await api.serve();
  const consumer = new Consumer();
  await consumer.listen();
})();
