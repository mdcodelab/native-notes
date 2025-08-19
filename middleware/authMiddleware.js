const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Obține token-ul din cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated!' });
  }

  try {
    // Verifică token-ul
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Adaugă datele utilizatorului în obiectul request
    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };
    
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { authenticateToken };
