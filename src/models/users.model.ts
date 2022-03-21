import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  bio: {
    type: String,
  },
  wallet: {
    type: String,
    required: true,
    unique: true
  },
  rank: {
    type: Number
  },
  achievements: {
    type: Array
  },
  avatar: {
    type: String,
    required: true
  },
  online: {
    type: Boolean
  }
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
