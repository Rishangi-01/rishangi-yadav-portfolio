const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Admin = require('./models/Admin');

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected');

    const newPassword = 'admin123';

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const admin = await Admin.findOneAndUpdate(
      { email: 'admin@example.com' },
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    );

    if (!admin) {
      console.log('Admin not found');
      process.exit(1);
    }

    console.log('Admin password reset successfully');
    console.log('Email:', admin.email);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

resetAdminPassword();