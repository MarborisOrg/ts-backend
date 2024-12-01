import { UserCounter } from '../models/item.js';

export default class {
  private readonly uri: string;

  public constructor(uri: string) {
    this.uri = uri;
  }

  public async connect(): Promise<void> {
    try {
      await $.mongoose.connect(this.uri);
      const initialCounter = await UserCounter.findOne();
      if (!initialCounter) {
        await new UserCounter({ sequenceValue: 0 }).save();
      }
    } catch (error) {
      log.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }
}
