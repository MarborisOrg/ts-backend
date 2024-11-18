import { config_ns } from '#ts/interfaces';

class EnvConfig implements config_ns.IEnvConfig {
  readonly PORT: number;
  readonly mysql_sv: string;
  readonly mysql_user: string;
  readonly mysql_password: string;
  readonly database_name: string;
  readonly mysql_multipleStatements: boolean;
  readonly mongo_url: string;
  readonly tc_book_name: string;
  readonly database_use: 'mongo' | 'mysql';

  constructor() {
    this.PORT = 8080;
    this.mysql_sv = 'localhost';
    this.mysql_user = 'root';
    this.mysql_password = '';
    this.database_name = 'sp';
    this.mysql_multipleStatements = false;
    this.mongo_url = 'mongodb://localhost:27017/';
    this.tc_book_name = 'tc';
    this.database_use = 'mongo'; // mongo/mysql
  }
}

class Config implements config_ns.IConfig {
  readonly env: config_ns.IEnvConfig;

  constructor() {
    this.env = new EnvConfig();
  }

  getEnv(): config_ns.IEnvConfig {
    return this.env;
  }
}

export default new Config();

export const blockIpMsg = 'permission denied';
