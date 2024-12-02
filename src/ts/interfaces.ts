import { Document } from 'mongoose';

export namespace config_ns {
  export type Settings = {
    PORT: number;
    mysql_sv: string;
    mysql_user: string;
    mysql_password: string;
    database_name: string;
    mysql_multipleStatements: boolean;
    SECRET_KEY: string;
    admin_user: string;
    admin_pass: string;
    scriptSrc: string;
    mongo_url: string;
    tc_book_name: string;
    database_use: string;
    ALLOWED_IPS: string[];
  };

  export type IEnvConfig = {
    readonly PORT: number;
    readonly mysql_sv: string;
    readonly mysql_user: string;
    readonly mysql_password: string;
    readonly database_name: string;
    readonly mysql_multipleStatements: boolean;
    readonly mongo_url: string;
    readonly tc_book_name: string;
    readonly database_use: 'mongo' | 'mysql';
  };

  export type IConfig = {
    readonly env: IEnvConfig;
  } & {
    readonly getEnv: () => IEnvConfig;
  };
}

export namespace mongo_ns {
  export type IUser = {
    readonly [x: string]: any;
    readonly name: string;
    readonly email: string;
    readonly ownedItems: ReadonlyArray<string>;
  } & Document;

  export type IItem = {
    readonly [x: string]: any;
    readonly title: string;
    readonly description: string;
    readonly owners: ReadonlyArray<string>;
    id: number;
  } & Document;

  export type IOwnership = {
    readonly [x: string]: any;
    readonly user: string;
    readonly item: string;
    readonly createdAt: Date;
  } & Document;
}
