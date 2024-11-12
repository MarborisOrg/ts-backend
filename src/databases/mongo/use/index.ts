import mongoose from "mongoose";

export default class {
  private uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  public async connect() {
    try {
      await mongoose.connect(this.uri);
      log.info("MongoDB connected");
    } catch (error) {
      log.error("MongoDB connection error:", error);
      process.exit(1);
    }
  }
}
