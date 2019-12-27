import { model, Schema, Document } from 'mongoose';

interface IEvent extends Document {
  description: string;
}

const EventSchema = new Schema({
  description: String
});

export const Event = model<IEvent>('Event', EventSchema);
