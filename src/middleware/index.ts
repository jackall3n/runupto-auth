import express from 'express';
import cors from 'cors';
import requestLogger from './requestLogger';

export default [
  cors(),
  express.urlencoded({ extended: true }),
  express.json(),
  requestLogger
];
