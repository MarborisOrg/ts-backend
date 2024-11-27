import { freeDatabases } from '#databases/free/index';

export async function freeCore(): Promise<void> {
  try {
    await freeDatabases();
  } catch (error) {
    console.log('[core] ERR when free connections: ' + error);
  }
}
