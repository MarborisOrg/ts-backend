import { freeAll } from "#databases/free";

export async function freeCore() {
  try {
    await freeAll();
  } catch (error) {
    console.log('[core] ERR when free connections: ' + error);
  }
}
