// freeAll
import { freeMongo } from '../mongo/free/index.js';
import { freeMysql } from '../mysql/free/index.js';

let safeCleanBool = 0;

export async function freeAll() {
  if (safeCleanBool === 1) return;
  safeCleanBool = 1;
  try {
    freeMysql();
    await freeMongo();
  } catch (error) {
    console.log('[core] ERR when free connections: ' + error);
  }
}
