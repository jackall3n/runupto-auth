import { Request, Response } from 'express';
import { GET } from "../decorators/get";
import { Controller } from "../decorators/controller";

@Controller('/')
class HomeController {

  @GET('/')
  async home(request: Request, response: Response) {
    response.send(`
      <html lang="en">
        <body>
            <div>Hello. <a href="/strava/login">Strava Login?</a></div>
        </body>
      </html>
    `);
  }
}

export { HomeController };
