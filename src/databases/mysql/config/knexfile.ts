import { config } from '#config/env_get';

type DatabaseConfig = {
  readonly client: string;
  readonly connection: {
    readonly host: string;
    readonly user: string;
    readonly password: string;
    readonly database: string;
  };
};

type KnexConfig = {
  readonly development: DatabaseConfig;
};

const knexConfig: KnexConfig = {
  development: {
    client: 'mysql2',
    connection: {
      host: config.mysql_sv,
      user: config.mysql_user,
      password: config.mysql_password,
      database: config.database_name,
    },
  },
};


export default knexConfig;
