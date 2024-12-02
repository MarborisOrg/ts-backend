import { freeDatabases } from '#databases/free/index';

export async function freeCore(): Promise<void> {
  try {
    await freeDatabases();
  } catch (error) {
    echo('error: [core] ERR when free connections: ' + error);
  }
}
