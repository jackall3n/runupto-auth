import { Application } from 'express';
import { Route } from "../routes";

export default (app: Application | any, routes: Route[]) => {
  for (const { route, use } of routes) {
    app.use(route, use);
  }
}
