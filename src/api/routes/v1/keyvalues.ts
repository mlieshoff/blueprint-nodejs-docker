import {
  Type,
  FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";

import { IKeyValues } from "../../../usecases/keyvalues";

const id = Type.String({ format: "uuid" });

const keyValue = Type.Object({
  id: Type.Number(),
  key: Type.String({ maxLength: 256 }),
  value: Type.String({ maxLength: 256 }),
});

const keyValues = Type.Array(keyValue);

const keyValueWithoutId = Type.Omit(keyValue, ["id"]);

const querystring = Type.Object({
  limit: Type.Number({ minimum: 10, maximum: 100 }),
  offset: Type.Number({ minimum: 0 }),
});

const key = Type.String();
const value = Type.String();

const params = Type.Object({ id, key, value });

export default (useCase: IKeyValues): FastifyPluginAsyncTypebox =>
  async (fastify) => {
    fastify.put(
      "/",
      {
        schema: {
          tags: ["todos"],
          body: keyValueWithoutId,
          response: { "2xx": keyValue },
        },
      },
      async (req, _res) => {
        return await useCase.write(req.body.key, req.body.value);
      },
    );

    fastify.get(
      "/",
      {
        schema: {
          tags: ["keyvalues"],
          querystring,
          response: { "2xx": keyValues },
        },
      },
      async (req, _res) => {
        return await useCase.getAll(req.query.limit, req.query.offset);
      },
    );
  };
