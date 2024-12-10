import { freeDatabases } from '#databases/database.free';

export async function freeCore(): Promise<void> {
  try {
    await freeDatabases();
  } catch (error) {
    echo('error: [core] ERR when free connections: ' + error);
  }
}
