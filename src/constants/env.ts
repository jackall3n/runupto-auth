import dotEnv from 'dotenv';

dotEnv.config();

const { PORT = '7000', STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_URL, STRAVA_CLIENT_URL } = process.env;

const env = {
  port: Number(PORT),
  strava_client_id: STRAVA_CLIENT_ID,
  strava_client_secret: STRAVA_CLIENT_SECRET,
  strava_url: STRAVA_URL,
  strava_client_url: STRAVA_CLIENT_URL
};

console.log('env', env);

export default env;
