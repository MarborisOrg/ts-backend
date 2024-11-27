import { config_ns } from '#ts/interfaces';

class EnvConfig implements config_ns.IEnvConfig {
  public readonly PORT: number;
  public readonly mysql_sv: string;
  public readonly mysql_user: string;
  public readonly mysql_password: string;
  public readonly database_name: string;
  public readonly mysql_multipleStatements: boolean;
  public readonly mongo_url: string;
  public readonly tc_book_name: string;
  public readonly database_use: 'mongo' | 'mysql';

  public constructor() {
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
  public readonly env: config_ns.IEnvConfig;

  public constructor() {
    this.env = new EnvConfig();
  }

  public getEnv(): config_ns.IEnvConfig {
    return this.env;
  }
}

export default new Config();

export const blockIpMsg = 'permission denied';
