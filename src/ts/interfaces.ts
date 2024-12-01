import { Document } from 'mongoose';

export namespace config_ns {
  export type Settings = {
    readonly PORT: number;
    readonly mysql_sv: string;
    readonly mysql_user: string;
    readonly mysql_password: string;
    readonly database_name: string;
    readonly mysql_multipleStatements: boolean;
    readonly SECRET_KEY: string;
    readonly admin_user: string;
    readonly admin_pass: string;
    readonly scriptSrc: string;
    readonly mongo_url: string;
    readonly tc_book_name: string;
    readonly database_use: string;
    readonly ALLOWED_IPS: readonly string[];
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
