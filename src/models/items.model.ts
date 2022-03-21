import { model, Schema, Document } from 'mongoose';
import { Item } from '@/interfaces/items.interface';

const itemSchema: Schema = new Schema({
  imageLink: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true
  },
  externalLink: {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  property: {
    type: Object
  },
  unlockable: {
    type: Boolean
  },
  sensitive: {
    type: Boolean
  },
  numberOfCopy: {
    type: Number
  },
  chain: {
    type: Number,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  }
});

const itemModel = model<Item & Document>('Item', itemSchema);

export default itemModel;