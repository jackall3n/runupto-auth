import { Router } from 'express';

import home from './home';
import strava from "./strava";

export type Route = { route: string, use: Router };

const routes: Route[] = [
  { route: '/', use: home },
  { route: '/strava', use: strava }
];

export default routes
