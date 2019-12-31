import axios from "axios";
import env from '../constants/env';

class StravaService {
  async getAuthToken(code: string) {

    const response = await axios({
      params: {
        client_id: env.strava_client_id,
        client_secret: env.strava_client_secret,
        grant_type: 'authorization_code',
        code
      },
      method: 'POST',
      url: `${env.strava_url}/api/v3/oauth/token`
    });

    return response.data;
  }
}

export default StravaService;
