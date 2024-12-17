import mongoose, { Document, Model, Schema } from 'mongoose'

interface IGenericDocument extends Document {
  [key: string]: any
}

export class MongoManager {
  private connection: mongoose.Connection

  public constructor() {
    this.connection = mongoose.createConnection('mongodb://localhost:27017/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }

  private getModel(collectionName: string): Model<IGenericDocument> {
    if (!this.connection.models[collectionName]) {
      const schema = new Schema({}, { strict: false })
      this.connection.model(collectionName, schema)
    }
    return this.connection.model(collectionName)
  }

  public async save(collectionName: string, data: object): Promise<void> {
    const Model = this.getModel(collectionName)
    const document = new Model(data)
    await document.save()
  }

  public async find(collectionName: string, query: object): Promise<any> {
    const Model = this.getModel(collectionName)
    return await Model.find(query).exec()
  }

  public async delete(collectionName: string, query: object): Promise<void> {
    const Model = this.getModel(collectionName)
    await Model.deleteMany(query).exec()
  }

  public async update(
    collectionName: string,
    query: object,
    updateData: object
  ): Promise<void> {
    const Model = this.getModel(collectionName)
    await Model.updateMany(query, { $set: updateData }).exec()
  }
}
