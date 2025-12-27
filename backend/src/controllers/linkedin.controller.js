// controllers/linkedin.controller.js
import LinkedInServices from '../services/linkedin.service.js';
import { ApiError } from '../utils/ApiError.js';

class LinkedInController {
  static LoginUser = async (req, res) => {
    try {
      const { code } = req.query; 
      if (!code) throw new ApiError(400, 'No authorization code');

      const result = await LinkedInServices.LoginUser(code); 

      // ✅ Secure cookie settings
      res.cookie('token', result.token, { 
        httpOnly: true,        // ✅ XSS-proof
        secure: process.env.NODE_ENV === 'production',  // HTTPS only in prod
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
      });
      
      res.redirect('http://localhost:5173/profile');
    } catch (err) {
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message
      });
    }
  };
}

export default LinkedInController;
