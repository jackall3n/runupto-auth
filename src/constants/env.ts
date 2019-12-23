import dotEnv from 'dotenv';

dotEnv.config();

const { PORT = '7000', MONGO_URL, MONGO_USERNAME, MONGO_PASSWORD, STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_URL, STRAVA_CLIENT_URL } = process.env;

const env = {
  port: Number(PORT),
  mongo_url: MONGO_URL as string,
  mongo_username: MONGO_USERNAME as string,
  mongo_password: MONGO_PASSWORD as string,
  strava_client_id: STRAVA_CLIENT_ID,
  strava_client_secret: STRAVA_CLIENT_SECRET,
  strava_url: STRAVA_URL,
  strava_client_url: STRAVA_CLIENT_URL
};

console.log('env', env);

export default env;
