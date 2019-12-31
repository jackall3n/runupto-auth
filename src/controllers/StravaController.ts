import { Request, Response } from 'express';
import StravaService from "../services/StravaService";
import queryString from "query-string";
import env from '../constants/env';
import { GET } from "../decorators/get";
import { Controller } from "../decorators/controller";
import { UserRepository } from "../repositories";

@Controller('/strava')
class StravaController {
  constructor(
    private stravaService = new StravaService(),
    private userRepository = new UserRepository()) {
  }

  @GET('/login')
  async login(request: Request, response: Response) {
    try {
      const query = queryString.stringify({
        client_id: env.strava_client_id,
        response_type: 'code',
        redirect_uri: `${env.strava_client_url}/strava/redirect`,
        scope: ['read', 'read_all', 'activity:read_all', 'activity:write', 'profile:read_all'].join(','),
        state: 'runup'
      });

      const url = `${env.strava_url}/oauth/authorize?${query}`;

      response.redirect(url);
    } catch (e) {
      response.send(e.message);
    }
  }

  @GET('/redirect')
  async redirect(request: Request, response: Response) {
    try {
      const { code, scope } = request.query;

      const token = await this.stravaService.getAuthToken(code);

      const { token_type, refresh_token, access_token, athlete, expires_at, expires_in } = token;
      const { id: strava_id, firstname, lastname, city, state, country, sex, profile } = athlete;

      const session = await this.userRepository.updateSession({
        strava_id,
        token_type,
        access_token,
        expires_at,
        expires_in,
        scope: scope.split(','),
        refresh_token
      });

      await this.userRepository.update({
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
        strava: {
          id: strava_id,
          session
        }
      });

      response.send(`<h1>Success</h1>`);
    } catch (e) {
      response.send(e.message);
    }
  }
}

export { StravaController };
