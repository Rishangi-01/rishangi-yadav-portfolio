require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const email = "admin@example.com";
    const password = "Admin@2026";
    const name = "Rishangi";

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("Admin with this email already exists.");
      process.exit(0);
    }

    const admin = await Admin.create({
      name,
      email,
      password,
      role: "admin",
    });

    console.log("=================================");
    console.log("Admin created successfully!");
    console.log("=================================");
    console.log(`Name: ${admin.name}`);
    console.log(`Email: ${admin.email}`);
    console.log("Password: [the password you configured in this script]");
    console.log(`Role: ${admin.role}`);
    console.log("=================================");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

createAdmin();