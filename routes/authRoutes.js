const prisma = require("../config/prisma");
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    
    // Validare
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Verifică dacă parolele coincid
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match!" });
    }

    // Verifică dacă utilizatorul există deja
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    // Criptează parola
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creează noul utilizator
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        createdAt: true
      }
    });

    // Generează token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Setează cookie-ul HTTP-Only
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 ore
    });

    // Returnează răspunsul fără parolă
    res.status(201).json({ 
      message: 'User registered successfully!',
      user 
    });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});


// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validare
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required!" });
    }

    // Găsește utilizatorul
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials!' });
    }

    // Verifică parola
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generează token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Setează cookie-ul HTTP-Only
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 ore
    });

    // Returnează răspunsul fără parolă
    const { password: _, ...userData } = user;
    
    res.json({ 
      message: 'Logged in successfully!',
      user: userData 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;