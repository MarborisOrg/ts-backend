import * as dotenv from 'dotenv';

dotenv.config();

interface Config {
    PORT: number;
    sv: string;
    user: string;
    password: string;
    database: string;
    multipleStatements: boolean;
}

export const config: Config = {
    PORT: parseInt(process.env.PORT || '8080', 10),
    sv: process.env.sv || 'localhost',
    user: process.env.user || 'root',
    password: process.env.password || '',
    database: process.env.database || '',
    multipleStatements: process.env.multipleStatements === 'true'
};

//
console.log(`Server is running on http://${config.sv}:${config.PORT}`);
console.log('Database Config:', {
    user: config.user,
    password: config.password,
    database: config.database,
    multipleStatements: config.multipleStatements
});
