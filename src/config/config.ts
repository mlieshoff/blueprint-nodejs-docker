export type DbConfig = {
  db_host: string;
  db_user: string;
  db_password: string;
  db_name: string;
};

export type FilesConfig = {
  folder: string;
};

export type ApiConfig = {
  port: number;
  host: string;
  openapi: boolean;
};

export type BrokerConfig = {
  user: string;
  password: string;
  host: string;
  port: number;
  queue: string;
};

export type LogConfig = {
  level: string;
  version: string;
};

type Config = {
  services: {
    logger: LogConfig;
    files: FilesConfig;
    db: DbConfig;
  };
  api: ApiConfig;
  broker: BrokerConfig;
  gracefulShutdownTimeoutMs: number;
};

export default {
  services: {
    logger: {
      level: process.env.LOG_LEVEL || "debug",
      version: "1.0.0",
    },
    db: {
      db_host: process.env.POSTGRES_DB_HOST || "localhost",
      db_user: process.env.POSTGRES_USER || "postgres",
      db_password: process.env.POSTGRES_PASSWORD || "postgres",
      db_name: process.env.POSTGRES_DB || "blueprint_nodejs_docker_postgres_db",
    },
    files: {
      folder: process.env.FOLDER || "/tmp/test",
    },
  },
  api: {
    host: "0.0.0.0",
    port: 8080,
    openapi: true,
  },
  broker: {
    host: process.env.RABBITMQ_HOST || "0.0.0.0",
    port: Number(process.env.RABBITMQ_PORT) || 5672,
    user: process.env.RABBITMQ_USER || "",
    password: process.env.RABBITMQ_PASSWORD || "",
    queue: "test",
  },
  gracefulShutdownTimeoutMs: 30 * 1000,
} satisfies Config;
