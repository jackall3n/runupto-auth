import express from 'express';

export default (app: express.Application | any, middleware: any[]) => {
  for (const m of middleware) {
    app.use(m);
  }
}
