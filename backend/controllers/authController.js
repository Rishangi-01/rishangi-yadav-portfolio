const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login request received:', { email, password });
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const admin = await Admin.findOne({ email: normalizedEmail });

    console.log('Admin found:', !!admin);

    if (admin) {
      console.log('Admin email:', admin.email);
      console.log('Admin role:', admin.role);
      console.log('Password hash exists:', !!admin.password);

      const passwordMatched = await admin.matchPassword(password);

      console.log('Password matched:', passwordMatched);

      if (!passwordMatched) {
        return res.status(401).json({
          success: false,
          message: 'Password is incorrect',
        });
      }
    } else {
      console.log('Admin not found:', normalizedEmail);

      return res.status(401).json({
        success: false,
        message: 'Admin account not found',
      });
    }

    const token = generateToken(admin._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        admin: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Login failed',
    });
  }
};

const logoutAdmin = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

const getMe = async (req, res) => {
  const admin = req.admin;

  res.status(200).json({
    success: true,
    data: {
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    },
  });
};

module.exports = {
  loginAdmin,
  logoutAdmin,
  getMe,
};
