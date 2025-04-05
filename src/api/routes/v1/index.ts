import { FastifyPluginAsync } from "fastify";

import { UseCases } from "../../../api";

import keyvalues from "./keyvalues";

export default (useCases: UseCases): FastifyPluginAsync =>
  async (fastify) => {
    fastify.register(keyvalues(useCases.keyValues), { prefix: "/keyValues" });
  };
