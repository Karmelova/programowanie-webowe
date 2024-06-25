import express from 'express';

const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('Middleware authMiddleware executed');
  next(); 
};

export default authMiddleware;
