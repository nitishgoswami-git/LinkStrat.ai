// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export const authMiddleware = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authenticated - No token provided' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Optional: Fetch full user data from database
    const user = await User.findById(decoded.id).select('-accessToken -refreshToken');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Attach user to request
    req.user = {
      id: user._id,
      email: user.email,
      name: user.name,
      linkedinId: user.linkedinId,
      avatar: user.avatar,
    };
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired' 
      });
    }
    return res.status(500).json({ 
      success: false,
      message: 'Authentication error' 
    });
  }
};