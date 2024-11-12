import * as dotenv from "dotenv";
import Joi from "joi";
import { envFilePath } from "#utils/env_finder";
import { config_ns } from "#ts/interfaces";
import df_config from "./defaults.js";

if (envFilePath) {
  dotenv.config({ path: envFilePath });
} else {
  throw new Error(".env file not found in any subdirectories.");
}

const schema = Joi.object({
  PORT: Joi.number().default(df_config.env.PORT),
  mysql_sv: Joi.string().min(1).max(255).default(df_config.env.mysql_sv),
  mysql_user: Joi.string().min(1).max(255).default(df_config.env.mysql_user),
  mysql_password: Joi.string()
    .min(8)
    .max(255)
    .allow("") /* allow empty for Mysql password */
    .default(df_config.env.mysql_password),
  database_name: Joi.string()
    .min(1)
    .max(255)
    .default(df_config.env.database_name),
  mysql_multipleStatements: Joi.boolean().default(
    df_config.env.mysql_multipleStatements,
  ),
  SECRET_KEY: Joi.string().min(10).required() /* no default for SECRET_KEY */,
  admin_user: Joi.string()
    .min(1)
    .max(255)
    .required() /* no default for admin user */,
  admin_pass: Joi.string()
    .min(6) /* admin password must be strong */
    .max(255)
    .required(),
  scriptSrc: Joi.string().uri().default("") /* no require */,
  mongo_url: Joi.string().uri().default(df_config.env.mongo_url),
  tc_book_name: Joi.string()
    .min(1)
    .max(255)
    .default(df_config.env.tc_book_name),
  database_use: Joi.string().valid("mongo", "mysql").default("mongo"),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`Configuration error: ${error.message}`);
}

export const config: config_ns.Settings = {
  PORT: value.PORT,
  mysql_sv: value.mysql_sv,
  mysql_user: value.mysql_user,
  mysql_password: value.mysql_password,
  database_name: value.database_name,
  mysql_multipleStatements: value.mysql_multipleStatements,
  SECRET_KEY: value.SECRET_KEY,
  admin_user: value.admin_user,
  admin_pass: value.admin_pass,
  scriptSrc: value.scriptSrc,
  mongo_url: value.mongo_url,
  tc_book_name: value.tc_book_name,
  database_use: value.database_use,
  ALLOWED_IPS: value.ALLOWED_IPS ? value.ALLOWED_IPS.split(",") : [],
};
