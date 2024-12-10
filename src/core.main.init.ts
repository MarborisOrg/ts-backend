import connectDatabase from '#databases/database.connect.init.module';

export class InitApp {
  public async initialize(): Promise<void> {
    echo('Debug: Database connect!');
    await connectDatabase();
  }
}
