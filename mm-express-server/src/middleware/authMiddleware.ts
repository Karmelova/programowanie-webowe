import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
};

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '').replaceAll('"','').trim();
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string };
    const user = await User.findOne({ uuid: decoded.id });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    const newToken = generateToken(user.uuid);
    res.setHeader('Authorization', `Bearer ${newToken}`);

    next();
  } catch (error) {
    console.error('Error during token verification:', error);
    res.status(403).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
