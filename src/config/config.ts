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

type Config = {
  services: {
    files: FilesConfig;
    db: DbConfig;
  };
  api: ApiConfig;
};

export default {
  services: {
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
} satisfies Config;
