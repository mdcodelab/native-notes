const prisma = require("../config/prisma");
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Environment check
const isProduction = process.env.NODE_ENV === 'production';

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match!" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
      select: { id: true, email: true, createdAt: true }
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/'
    });

    res.status(201).json({ message: 'User registered successfully!', user });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: error.message || "Failed to register user" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required!" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials!' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/'
    });

    const { password: _, ...userData } = user;
    res.json({ message: 'Logged in successfully!', user: userData });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message || 'Error logging in' });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/'
    });
    res.json({ message: 'Logged out successfully!' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: error.message || 'Error logging out' });
  }
});

// CHECK AUTH STATUS
router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, createdAt: true }
    });

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });

  } catch (error) {
    console.error('Auth check error:', error);
    res.status(401).json({ error: 'Not authenticated' });
  }
});

module.exports = router;
