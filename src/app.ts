import express from "express";

export interface App extends express.Application {
  locals: {}
}

export const app: App = express();

export default app;
