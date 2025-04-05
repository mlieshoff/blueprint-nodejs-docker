import config from "./config/config";

import { KeyValues } from "./useCases/keyvalues";
import KeyValuesDB from "./services/keyvaluesdb";

import { FastifyApi } from "./api/index";

(async () => {

    const keyValueService = new KeyValuesDB();

    const api = new FastifyApi({port: 8080, host: '0.0.0.0', openapi: true}, {
        keyValues: new KeyValues(keyValueService),
    });
    await api.serve();
})();