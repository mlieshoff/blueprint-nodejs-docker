import { default as fastify, FastifyInstance } from "fastify";
import swaggerUi from "@fastify/swagger-ui";
import swagger from "@fastify/swagger";

import { errorHandler } from "./utils/error";
import apiRoutes from "./routes";

import { IKeyValues } from "../usecases/keyvalues";

export type Config = {
  port: number;
  host: string;
  openapi: boolean;
};

export type UseCases = {
  keyValues: IKeyValues;
};

export class FastifyApi {
  private readonly server: FastifyInstance;

  constructor(
    private readonly config: Config,
    useCases: UseCases,
  ) {
    this.server = fastify({
      ignoreTrailingSlash: true,
      exposeHeadRoutes: false,
    });

    this.server.setErrorHandler(errorHandler);

    if (config.openapi) {
      this.server.register(swagger);
      this.server.register(swaggerUi);
    }

    this.server.get("/health", () => "OK");
    this.server.register(apiRoutes(useCases));
  }

  async close() {
    return await this.server.close();
  }

  async serve() {
    await this.server.listen({
      port: this.config.port,
      host: "::",
    });

    if (this.config.openapi)
      console.log(
        `SwaggerUI hosted at http://[::]:${this.config.port}/documentation`,
      );
  }
}
