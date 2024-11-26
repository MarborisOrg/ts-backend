import knex from 'knex';

import { config } from '#config/env_get';

export type DatabaseConfig = {
  readonly client: string;
  readonly connection: {
    readonly host: string;
    readonly user: string;
    readonly password: string;
    readonly database?: string;
  };
};

const baseConnection = {
  host: config.mysql_sv,
  user: config.mysql_user,
  password: config.mysql_password,
};

const createKnexConfig = (database?: string): DatabaseConfig => ({
  client: 'mysql2',
  connection: {
    ...baseConnection,
    database,
  },
});

export let mdb = knex(createKnexConfig());

export function initializeMdb() {
  mdb = knex(createKnexConfig(config.database_name));
}

export default createKnexConfig();
