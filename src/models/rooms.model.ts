import { model, Schema, Document } from 'mongoose';
import { Room } from '@/interfaces/room.interface';

const roomSchema: Schema = new Schema({
  player1: {
    type: String,
    required: true
  },
  player2: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

const roomModel = model<Room & Document>('Room', roomSchema);

export default roomModel;