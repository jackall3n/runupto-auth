import { model, Schema } from 'mongoose';

const StravaSessionSchema = new Schema({
  strava_id: Number,
  access_token: String,
  refresh_token: String,
  token_type: String,
  expires_at: Number,
  expires_in: Number,
  scope: String
});

export const StravaSession = model('StravaSession', StravaSessionSchema, 'strava_sessions');
