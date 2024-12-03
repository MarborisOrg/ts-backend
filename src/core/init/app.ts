import connectDatabase from '#databases/connect';

export class InitApp {
  public async initialize(): Promise<void> {
    echo('Debug: Database connect!');
    await connectDatabase(); // Check databases connected
  }
}
