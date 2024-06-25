import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Connect to MongoDB
mongoose.connect(`${process.env.MONGODB_URI}?retryWrites=true&w=majority`, {
});

app.use('/api', authRoutes);
app.use('/api', projectRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
