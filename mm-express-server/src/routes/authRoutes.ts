import express from 'express';
import { register, login } from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', authMiddleware, register);
router.post('/login', authMiddleware, login);

export default router;
