import connectDatabase from "#databases/connect";

// Init function, on the top
export default async function init(): Promise<void> {
  try {
    await connectDatabase(); // Check databases connected
  } catch (error) {
    log.error('init file error:', error);
  }
}
