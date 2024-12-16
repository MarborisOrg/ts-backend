import mongoose from 'mongoose'

// اتصال به دیتابیس MongoDB
void mongoose.connect('mongodb://localhost:27017/dynamic_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// تعریف یک اسکیمای انعطاف‌پذیر برای ذخیره داده‌ها
const DynamicSchema = new mongoose.Schema({}, { strict: false })
const DynamicModel = mongoose.model('DynamicCollection', DynamicSchema)

const saveData = async (data: any) => {
  try {
    // ایجاد یک سند (Document) جدید
    const document = new DynamicModel(data)

    // ذخیره سند در MongoDB
    await document.save()

    console.log('Data saved to MongoDB:', data)
  } catch (error) {
    console.error('Error saving data:', error)
  }
}

// نمونه داده
const sampleData = {
  name: 'John',
  age: 30,
  address: {
    city: 'NYC',
    zip: '10001',
  },
}

// اجرای تابع
saveData(sampleData)
  .then(() => console.log('Process complete.'))
  .catch((err) => console.error('Error:', err))
