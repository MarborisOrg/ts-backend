import { freeMongo } from './mongoose.js';
import { freeMysql } from './mysql2.js';

let safeCleanBool = 0;

export async function freeAll() {
  if(safeCleanBool === 1) return
  safeCleanBool = 1;
  try {
    freeMysql();
    await freeMongo();
  } catch (error) {
    console.log("[core] ERR when free connections: " + error)
  }
}
