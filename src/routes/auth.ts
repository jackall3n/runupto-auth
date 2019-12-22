import express from 'express';
import axios from 'axios';
import env from "../constants/env";
import query from 'query-string';

const auth = express.Router();

const { strava_client_id, strava_client_secret, strava_url, strava_client_url } = env;

auth.get('/', (req, res) => {
  const q = query.stringify({
    client_id: strava_client_id,
    response_type: 'code',
    redirect_uri: `${strava_client_url}/auth/redirect`,
    approval_prompt: 'force',
    scope: ['activity:read_all', 'activity:write', 'profile:read_all'].join(',')
  });

  res.redirect(`${strava_url}/oauth/authorize?${q}`)
});

auth.get('/redirect', async (req, res) => {
  const { code } = req.query;

  const response = await axios({
    params: {
      client_id: strava_client_id,
      client_secret: strava_client_secret,
      grant_type: 'authorization_code',
      code
    },
    method: 'POST',
    url: `${strava_url}/api/v3/oauth/token`
  });

  console.log(response.data);

  res.send('done')
});

export default auth;
