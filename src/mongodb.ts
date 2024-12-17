import mongoose from 'mongoose'

import { CatchErrors } from './decorators.js'

export class DbManager {
  private connection: mongoose.Mongoose | null = null
  private dynamicSchema: any | null = null
  private dynamicModel: any | null = null

  @CatchErrors
  public async connect(): Promise<void> {
    if (!this.connection) {
      this.connection = await mongoose.connect(
        'mongodb://localhost:27017/dynamic_db'
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
  }
}

// mongoose
//   .connect('mongodb://localhost:27017/dynamic_db')
//   .then(() => {

//     const saveData = async (data: any): Promise<void> => {
//       try {

//         console.log('Data saved to MongoDB:', data)
//       } catch (error) {
//         console.error('Error saving data:', error)
//       }
//     }

//     const sampleData = {
//       name: 'John',
//       age: 30,
//       address: {
//         city: 'NYC',
//         zip: '10001',
//       },
//     }

//     saveData(sampleData)
//       .then(() => console.log('Process complete.'))
//       .catch((err) => console.error('Error:', err))
//   })
//   .catch((err) => {
//     console.error('Could not connect to MongoDB', err)
//   })

/*
  async function fetchData() {
  try {
    const documents = await DynamicModel.find();
    console.log('Fetched data:', documents);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();

*/
