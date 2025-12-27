// src/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    // ✅ PRIORITY 1: Check Authorization header first (backward compatible)
    let token = req.headers.authorization?.replace('Bearer ', '');
    
    // ✅ PRIORITY 2: Check cookie if no Authorization header
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }
    
    if (!token) {
      return res.status(401).json({ 
        error: 'No token provided',
        message: 'Authorization header or cookie missing'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({ error: 'Invalid token payload' });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.name, error.message);
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;
