import env from "./constants/env";
import middleware from './middleware';
import routes from './routes';
import applyMiddleware from "./utils/applyMiddleware";
import applyRoutes from "./utils/applyRoutes";
import app from "./app";
import connect from "./mongo";

process.on("uncaughtException", e => {
  console.error('uncaughtException', e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.error('unhandledRejection', e);
  process.exit(1);
});

applyMiddleware(app, middleware);
applyRoutes(app, routes);

app.listen(env.port, () => {
  console.log('started auth');

  connect(env.mongo_url, env.mongo_username, env.mongo_password).then(() => {
    console.log('connected to mongo');
  });
});
