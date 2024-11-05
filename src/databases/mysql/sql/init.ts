import { config } from "@config/env_get";

const CREATE_DATABASE = "CREATE DATABASE IF NOT EXISTS " + config.database_name;
const CHECK_DATABASE = "SHOW DATABASES LIKE '" + config.database_name + "';"

const CR_USE = 'USE ' + config.database_name + ';'
const CR_ALERT = "ALTER USER ''" + config.database_name + "@'" + config.mysql_sv + "' IDENTIFIED WITH mysql_native_password BY '" + config.mysql_password + "';"
const CR_FLUSH = 'FLUSH PRIVILEGES;'

export {
    CREATE_DATABASE, CR_USE, CR_ALERT, CR_FLUSH, CHECK_DATABASE
};