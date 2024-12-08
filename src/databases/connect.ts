import ConnectDatabase from '#databases/database.init.service';

export default async function connectDatabase(): Promise<void> {
  try {
    await ConnectDatabase(); // Check databases connected
  } catch (error) {
    log.error('init file error:', error);
    quit();
  }
}
