import mongoose, { Document, Schema } from 'mongoose';

export interface IItem extends Document {
    title: string;
    descrp: string;
}

class ItemModel {
    private itemSchema: Schema;

    constructor() {
        this.itemSchema = new Schema({
            title: { type: String, required: true, unique: true },
            descrp: { type: String, required: true }
        });
    }

    public getModel() {
        return mongoose.model<IItem>('Item', this.itemSchema);
    }
}

export default new ItemModel();
