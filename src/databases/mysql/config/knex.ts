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

const createKnexConfig = (database: string = ''): knex.Knex<any, unknown[]> => {
  const dbConfig: DatabaseConfig = {
    client: 'mysql2',
    connection: {
      host: config.mysql_sv,
      user: config.mysql_user,
      password: config.mysql_password,
      database: database || undefined,
    },
  };

  return knex(dbConfig);
};

export let mdb: knex.Knex<any, unknown[]>;

export function initializeMdb(databaseName: string = ''): void {
  mdb = createKnexConfig(databaseName);
}
