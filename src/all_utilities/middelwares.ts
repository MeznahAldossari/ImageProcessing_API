import express from 'express';

const middleware = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
): void => {
  console.log(request.url + '   This path visited before');
  next();
};

export default middleware;
