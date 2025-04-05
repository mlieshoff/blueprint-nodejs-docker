import Config from "./config/config";

import { KeyValues } from "./usecases/keyvalues";
import KeyValuesDB from "./services/keyvaluesdb";

import { FastifyApi } from "./api";

(async () => {
  const keyValueService = new KeyValuesDB();

  const api = new FastifyApi(Config.api, {
    keyValues: new KeyValues(keyValueService),
  });
  await api.serve();
})();
