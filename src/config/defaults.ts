import { config_ns } from "#ts/interfaces";

class EnvConfig implements config_ns.IEnvConfig {
  PORT: number;
  mysql_sv: string;
  mysql_user: string;
  mysql_password: string;
  database_name: string;
  mysql_multipleStatements: boolean;
  mongo_url: string;
  tc_book_name: string;
  database_use: "mongo" | "mysql";

  constructor() {
    this.PORT = 8080;
    this.mysql_sv = "localhost";
    this.mysql_user = "root";
    this.mysql_password = "";
    this.database_name = "sp";
    this.mysql_multipleStatements = false;
    this.mongo_url = "mongodb://localhost:27017/";
    this.tc_book_name = "tc";
    this.database_use = "mongo"; // mongo/mysql
  }
}

class Config implements config_ns.IConfig {
  env: config_ns.IEnvConfig;

  constructor() {
    this.env = new EnvConfig();
  }

  getEnv(): config_ns.IEnvConfig {
    return this.env;
  }
}

export default new Config();

export const blockIpMsg = "permission denied"

