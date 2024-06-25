import jwt from 'jsonwebtoken';

export const generateToken = (userId: string): string => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'your_jwt_secret_key', {
    expiresIn: '1h', // Token expires in 1 hour
  });
  return token;
};
