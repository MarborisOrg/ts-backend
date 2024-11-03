import { config } from "../src/config/get";

const CREATE_DATABASE = "CREATE DATABASE IF NOT EXISTS " + config.database;

export {
    CREATE_DATABASE
};