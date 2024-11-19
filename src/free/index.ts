import { freeMongo } from './mongoose.js';
import { freeMysql } from './mysql2.js';

export async function freeAll() {
  try {
    freeMysql();
    await freeMongo();
  } catch (error) {
    die();
  }
}
