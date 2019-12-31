import { Document, model, Schema } from 'mongoose';
import { IStravaSessionSchema } from "./";
import { IActivity } from "./Activity";

export interface IUser {
  name: {
    first: string;
    last: string;
  }
  address: {
    city: string,
    state: string,
    country: string
  },
  sex: string,
  profile_picture: string,
  activities: Array<IActivity['_id']>,
  strava: {
    id: number,
    session: IStravaSessionSchema['_id']
  }
}

export interface IUserSchema extends Document, IUser {
}

const UserSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  address: {
    city: String,
    state: String,
    country: String
  },
  sex: String,
  profile_picture: String,
  activities: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity'
  }],
  strava: {
    id: Number,
    session: {
      type: Schema.Types.ObjectId,
      ref: 'StravaSession'
    }
  }
});

export const User = model<IUserSchema>('User', UserSchema);
