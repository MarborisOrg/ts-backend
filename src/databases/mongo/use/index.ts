export default class {
  private readonly uri: string;

  public constructor(uri: string) {
    this.uri = uri;
  }

  public async connect(): Promise<void> {
    try {
      await $.mongoose.connect(this.uri);
    } catch (error) {
      log.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }
}
