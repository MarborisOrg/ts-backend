import { freeMongo } from "./mongoose.js";
import { freeMysql } from "./mysql2.js";

export async function freeAll(){
    freeMysql()
    await freeMongo()
}