import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

const findEnvFileInSubdirectories = (startDir: string): string | null => {
    const files = fs.readdirSync(startDir);

    if (files.includes('.env')) {
        return path.join(startDir, '.env');
    }

    for (const file of files) {
        const fullPath = path.join(startDir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            const envPath = findEnvFileInSubdirectories(fullPath);
            if (envPath) {
                return envPath;
            }
        }
    }

    return null;
};

const envFilePath = findEnvFileInSubdirectories(process.cwd());

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