import connectDatabase from '#databases/connect';

export class InitApp {
  public async initialize(): Promise<void> {
    try {
      await connectDatabase(); // Check databases connected
    } catch (error) {
      log.error('init file error:', error);
    }
  }
}
