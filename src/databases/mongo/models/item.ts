import mongoose, { Document, Schema } from 'mongoose';

export interface IItem extends Document {
    title: string;
    descrp: string;
}

const itemSchema: Schema = new Schema({
    title: { type: String, required: true, unique: true },
    descrp: { type: String, required: true }
});

const Item = mongoose.model<IItem>('Item', itemSchema);

export default Item;
