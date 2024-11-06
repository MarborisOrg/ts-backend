import mongoose from "mongoose";

export default class {
  private uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  public async connect() {
    try {
      await mongoose.connect(this.uri);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  }
}
