import { model, Schema, Document } from 'mongoose';

export interface IStravaSession {
  strava_id: string;
  token_type: string;
  refresh_token: string;
  access_token: string;
  scope: string[];
  expires_at: number;
  expires_in: number;
}

export interface IStravaSessionSchema extends IStravaSession, Document {
}

const StravaSessionSchema = new Schema({
  strava_id: Number,
  access_token: String,
  refresh_token: String,
  token_type: String,
  expires_at: Number,
  expires_in: Number,
  scope: [{
    type: String
  }]
});

export const StravaSession = model<IStravaSessionSchema>('StravaSession', StravaSessionSchema, 'strava_sessions');
