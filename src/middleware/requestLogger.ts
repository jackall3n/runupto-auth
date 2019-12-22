import express from 'express';
import chalk from 'chalk';

const requestLogger: express.RequestHandler = (request, response, next) => {
  const { method, url, body } = request;

  console.log(chalk`{green ${method}}: ${url}`, body);

  next();
};

export default requestLogger;
