import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import User, { IUser } from '../models/User';
import { generateToken } from '../utils/authUtils';

const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const uuid = uuidv4();
    const newUser = new User({
      uuid,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser.uuid);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req: Request, res: Response) => {
  const { loginEmail, loginPassword } = req.body;
  try {
      console.log('Received login request for email:', loginEmail);
      const user = await User.findOne({ email: loginEmail });
      if (!user) {
          console.log('User not found');
          return res.status(404).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(loginPassword, user.password);
      if (!isMatch) {
          console.log('Password does not match');
          return res.status(404).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.uuid }, process.env.JWT_SECRET || '', {
          expiresIn: '1h',
      });

      res.status(200).json({ token });
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

export { register, login };
