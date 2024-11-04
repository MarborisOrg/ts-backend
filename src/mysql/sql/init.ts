import { config } from "../../config/env_get";

const CREATE_DATABASE = "CREATE DATABASE IF NOT EXISTS " + config.database;
const CHECK_DATABASE = "SHOW DATABASES LIKE '" + config.database + "';"

const CR_USE = 'USE ' + config.database + ';'
const CR_ALERT = "ALTER USER ''" + config.database + "@'" + config.sv + "' IDENTIFIED WITH mysql_native_password BY '" + config.password + "';"
const CR_FLUSH = 'FLUSH PRIVILEGES;'

export {
    CREATE_DATABASE, CR_USE, CR_ALERT, CR_FLUSH, CHECK_DATABASE
};