import * as dotenv from 'dotenv';
import { envFilePath } from '../utils/env_finder';

if (envFilePath) {
    dotenv.config({ path: envFilePath });
} else {
    throw new Error('.env file not found in any subdirectories.');
}

interface Config {
    PORT: number;
    sv: string;
    user: string;
    password: string;
    database: string;
    multipleStatements: boolean;
    SECRET_KEY: string;
    admin_user: string;
    admin_pass: string;
    scriptSrc: string;
}

export const config: Config = {
    PORT: parseInt(process.env.PORT || '8080', 10),
    sv: process.env.sv || 'localhost',
    user: process.env.user || 'root',
    password: process.env.password || '',
    database: process.env.database || '',
    multipleStatements: process.env.multipleStatements === 'true',
    SECRET_KEY: process.env.SECRET_KEY || '',
    admin_user: process.env.admin_user || '',
    admin_pass: process.env.admin_pass || '',
    scriptSrc: process.env.scriptSrc || '',
};