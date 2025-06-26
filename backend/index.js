import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import orderRoutes from './routes/orders.js';
import usersRoutes from './routes/users.js';
import outletsRoutes from './routes/outlets.js';
import categoryRoutes from './routes/categories.js';
import subCategoryRoutes from './routes/subcategories.js';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import settingsRoutes from './routes/settings.js';
import Admin from './models/Admin.js';
import bcrypt from 'bcryptjs';
import offersRoutes from './routes/offers.js';
import expensesRoutes from './routes/expenses.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/orders', orderRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/outlets', outletsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/sub-categories', subCategoryRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  // Ensure default admin user exists, but do NOT reset password if already present
  try {
    const adminExists = await Admin.findOne({ username: 'zappin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('ajinkya', 12);
      await Admin.create({
        username: 'zappin',
        password: hashedPassword,
      });
      console.log('Default admin user created.');
    }
  } catch (error) {
    console.error('Error with default admin setup:', error);
  }
})
.catch((err) => console.error('MongoDB connection error:', err)); 