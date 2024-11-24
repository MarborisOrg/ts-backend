export default class {
  private readonly uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  public async connect() {
    try {
      await $.mongoose.connect(this.uri);
    } catch (error) {
      log.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }
}
