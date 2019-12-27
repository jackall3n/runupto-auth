import { model, Schema } from 'mongoose';

const ActivitySchema = new Schema({
  description: String
});

export const Activity = model('Activity', ActivitySchema, 'Activities');
