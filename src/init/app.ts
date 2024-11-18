import ConnectDatabase from '#modules/c-init';

// Init function, on the top
export default async function init(): Promise<void> {
  try {
    await ConnectDatabase(); // Check databases connected
  } catch (error) {
    log.error('init file error:', error);
    quit();
  }
}
