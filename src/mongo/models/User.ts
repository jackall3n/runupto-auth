import { model, Schema } from 'mongoose';

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
  strava_id: Number,
  strava_session: {
    type: Schema.Types.ObjectId,
    ref: 'StravaSession'
  }
});

export const User = model('User', UserSchema);
