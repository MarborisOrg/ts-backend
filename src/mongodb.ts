import mongoose, { Document, Model } from 'mongoose'

import { CatchErrors } from './decorators.js'

interface DynamicData extends Document {
  [key: string]: any
}

const CheckDynamicModel = (
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
  const originalMethod = descriptor.value

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/require-await
  descriptor.value = async function (this: DbManager, ...args: any[]) {
    if (!this.dynamicModel) {
      throw new Error('Dynamic model is not initialized.')
    }
    return originalMethod.apply(this, args)
  }

  return descriptor
}

export class DbManager {
  private connection: mongoose.Mongoose | null = null
  private dynamicSchema: mongoose.Schema | null = null
  public dynamicModel: Model<DynamicData> | null = null

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
    this.dynamicModel = mongoose.model<DynamicData>(
      'DynamicCollection',
      this.dynamicSchema
    )
  }

  @CatchErrors
  public async close(): Promise<void> {
    if (this.connection) {
      await this.connection.disconnect()
      this.connection = null
    }
  }

  @CatchErrors
  @CheckDynamicModel
  public async saveData(data: DynamicData | unknown): Promise<void> {
    const document = new this.dynamicModel!(data)
    await document.save()
  }

  @CatchErrors
  @CheckDynamicModel
  public async fetchData(): Promise<void> {
    const documents: DynamicData[] = await this.dynamicModel!.find()
    console.log('Fetched data:', documents)
  }
}
