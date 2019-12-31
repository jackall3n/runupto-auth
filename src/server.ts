import env from "./constants/env";
import middleware from './middleware';
import controllers from './controllers';
import applyMiddleware from "./utils/applyMiddleware";
import applyControllers from "./utils/applyControllers";
import app from "./app";
import connect from "./mongo";
import errorHandlers from "./utils/errorHandlers";

process.on("uncaughtException", e => {
  console.error('uncaughtException', e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.error('unhandledRejection', e);
  process.exit(1);
});

applyMiddleware(app, middleware);
applyControllers(app, controllers);
applyMiddleware(app, errorHandlers);

app.listen(env.port, () => {
  console.log('started auth');

  connect(env.mongo_url, env.mongo_username, env.mongo_password).then(() => {
    console.log('connected to mongo');
  });
});
