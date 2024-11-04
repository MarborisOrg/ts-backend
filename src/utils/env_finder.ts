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

export const envFilePath = findEnvFileInSubdirectories(process.cwd());
