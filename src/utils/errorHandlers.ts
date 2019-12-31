import { NextFunction, Request, Response } from "express";

const notFound = (request: Request, response: Response) => {
  response.sendStatus(404);
};

const serverError = (error: Error, response: Response) => {
  console.log(error);
  response.status(500).send(error.message);
};

export default [notFound, serverError];
