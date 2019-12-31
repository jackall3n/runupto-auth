import { model, Schema, Document} from 'mongoose';

export interface IActivity extends Document {
  description: string;
}

const ActivitySchema = new Schema({
  description: String
});

export const Activity = model<IActivity>('Activity', ActivitySchema, 'Activities');
