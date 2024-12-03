import ConnectDatabase from '#databases/modules/c-init';

export default async function connectDatabase(): Promise<void> {
  try {
    await ConnectDatabase(); // Check databases connected
  } catch (error) {
    log.error('init file error:', error);
    quit();
  }
}
