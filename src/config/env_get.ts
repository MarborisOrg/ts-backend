import * as dotenv from 'dotenv';
import Joi from 'joi';
import { envFilePath } from '../utils/env_finder';
import { config_ns } from '../ts/interfaces';

if (envFilePath) {
    dotenv.config({ path: envFilePath });
} else {
    throw new Error('.env file not found in any subdirectories.');
}

const schema = Joi.object({
    PORT: Joi.number().default(8080),
    mysql_sv: Joi.string().min(1).max(255).default('localhost'),
    mysql_user: Joi.string().min(1).max(255).default('root'),
    mysql_password: Joi.string().min(8).max(255).allow('').default(''),
    database_name: Joi.string().min(1).max(255).default('sp'),
    mysql_multipleStatements: Joi.boolean().default(false),
    SECRET_KEY: Joi.string().min(10).required(),
    admin_user: Joi.string().min(1).max(255).required(),
    admin_pass: Joi.string().min(6).max(255).required(),
    scriptSrc: Joi.string().uri().default(''),
    mongo_url: Joi.string().uri().default('mongodb://localhost:27017/'),
    tc_book_name: Joi.string().min(1).max(255).default('tc'),
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
};
