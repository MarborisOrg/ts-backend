import mongoose from 'mongoose'

import { CatchErrors } from './decorators.js'

export class DbManager {
  private connection: mongoose.Mongoose | null = null
  private dynamicSchema: any | null = null
  private dynamicModel: any | null = null

  @CatchErrors
  public async connect(): Promise<void> {
    if (!this.connection) {
      const dbName: string = configs.EnvConfig.db || 'db'
      console.log('dbName: ' + dbName)
      this.connection = await mongoose.connect(
        'mongodb://localhost:27017/' + dbName
      )
    }
    this.dynamicSchema = new mongoose.Schema({}, { strict: false })
    this.dynamicModel = mongoose.model('DynamicCollection', this.dynamicSchema)
  }

  @CatchErrors
  public async close(): Promise<void> {
    if (this.connection) await this.connection.disconnect()
  }

  @CatchErrors
  public async saveData(data: any): Promise<void> {
    const document = new this.dynamicModel(data)
    await document.save()
    /*
    const sampleData = {
        name: 'John',
        age: 30,
        address: {
          city: 'NYC',
          zip: '10001',
        },
      }
    */
  }

  @CatchErrors
  public async fetchData(): Promise<void> {
    const documents = await this.dynamicModel.find()
    console.log('Fetched data:', documents)
  }
}
