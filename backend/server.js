import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import connectDB from './config/db.js';

import bcrypt from 'bcryptjs';
import { User } from './models/User.model.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// 🛠 Function to create admin user
const createAdminIfNotExists = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error("❌ ADMIN_EMAIL or ADMIN_PASSWORD not set in .env");
    return;
  }

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const adminUser = new User({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
    role:"admin"
    });
    await adminUser.save();
    console.log('✅ Admin user created successfully');
  } else {
    console.log('✅ Admin already exists');
  }
};

// Connect to DB and start the server
connectDB().then(() => {
  createAdminIfNotExists(); // ✅ Ensure admin user is present

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
