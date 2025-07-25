import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js'
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

// Middlewares
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));
app.use(express.json());
app.use(cookieParser())

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

export default app;
