import * as dotenv from 'dotenv';
import { envFilePath } from '../utils/env_finder';

if (envFilePath) {
    dotenv.config({ path: envFilePath });
} else {
    throw new Error('.env file not found in any subdirectories.');
}

export const config: config.Settings = {
    PORT: parseInt(process.env.PORT || '8080', 10),
    mysql_sv: process.env.sv || 'localhost',
    mysql_user: process.env.mysql_user || 'root',
    mysql_password: process.env.mysql_password || '',
    database_name: process.env.database_name || '',
    mysql_multipleStatements: process.env.mysql_multipleStatements === 'true',
    SECRET_KEY: process.env.SECRET_KEY || '',
    admin_user: process.env.admin_user || '',
    admin_pass: process.env.admin_pass || '',
    scriptSrc: process.env.scriptSrc || '',
    mongo_url: process.env.mongo_url || 'mongodb://localhost:27017/',
    tc_book_name:  process.env.tc_book_name || 'tc',
};