import express from 'express';
import axios from 'axios';
import env from "../constants/env";
import query from 'query-string';
import { StravaSession, User } from '../../../runupto-shared/src/mongo/models';

const strava = express.Router();

const { strava_client_id, strava_client_secret, strava_url, strava_client_url } = env;

strava.get('/login', (req, res) => {
  const q = query.stringify({
    client_id: strava_client_id,
    response_type: 'code',
    redirect_uri: `${strava_client_url}/strava/redirect`,
    scope: ['read', 'read_all', 'activity:read_all', 'activity:write', 'profile:read_all'].join(','),
    state: 'runup'
  });

  res.redirect(`${strava_url}/oauth/authorize?${q}`)
});

strava.get('/redirect', async (req, res) => {
  try {
    const { code, scope } = req.query;

    const { data } = await axios({
      params: {
        client_id: strava_client_id,
        client_secret: strava_client_secret,
        grant_type: 'authorization_code',
        code
      },
      method: 'POST',
      url: `${strava_url}/api/v3/oauth/token`
    });

    const { token_type, refresh_token, access_token, athlete, expires_at, expires_in } = data;
    const { id, firstname, lastname, city, state, country, sex, profile } = athlete;

    const session = {
      strava_id: id,
      token_type,
      refresh_token,
      access_token,
      scope,
      expires_at,
      expires_in
    };

    console.log(data);
    console.log('session');

    let strava_session = await StravaSession.update({ strava_id: id }, session, {
      upsert: true,
      setDefaultsOnInsert: true
    });

    if (!strava_session) {
      console.log('new session, create');
    }

    console.log('session save');
    await strava_session.save();

    const userUpdate = {
      name: {
        first: firstname,
        last: lastname
      },
      address: {
        city,
        state,
        country
      },
      sex,
      profile_picture: profile,
      strava_id: id,
      strava_session
    };

    console.log('user');
    let user = await User.update({ strava_id: id }, userUpdate, {
      upsert: true,
      setDefaultsOnInsert: true
    });

    if (!user) {
      console.log('no user, create');
    }

    console.log('user save');
    await user.save();

    res.send('done')
  } catch (e) {
    console.error(e);

    res.status(500).send(e.message);
  }
});

strava.get('/redirect-2', async (req, res) => {
  try {
    const { code } = req.query;

    const response = await axios({
      params: {
        client_id: strava_client_id,
        client_secret: strava_client_secret,
        grant_type: 'authorization_code',
        code
      },
      method: 'POST',
      url: `${strava_url}/oauth/token`
    });

    console.log(response.data);

    res.send('done')
  } catch (e) {
    console.error(e);

    res.status(500).send(e.message);
  }
});

export default strava;
