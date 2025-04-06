import postgres from "postgres";
import Config from "../../config/config";

const sql = postgres({
  host: Config.services.db.db_host,
  user: Config.services.db.db_user,
  pass: Config.services.db.db_password,
  db: Config.services.db.db_name,
  max: 20,
  idle_timeout: 20,
  max_lifetime: 60 * 30,
  debug: process.env.NODE_ENV !== "production",
});

export default sql;
