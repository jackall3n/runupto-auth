import { Router } from 'express';

import home from './home';
import auth from "./auth";

export type Route = { route: string, use: Router };

const routes: Route[] = [
  { route: '', use: home },
  { route: 'auth', use: auth }
];

export default routes
