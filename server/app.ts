import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';

dotenv.config();

export const app = express();

// Initialize Database
connectDB().catch(err => console.error('DB connect error:', err));

// Middleware
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'active',
    app: 'SmartCart Fashion Platform',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

export default app;
