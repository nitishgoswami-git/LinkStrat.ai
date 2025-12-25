// controllers/linkedin.controller.js
import LinkedInServices from '../services/linkedin.service.js';
import { ApiError } from '../utils/ApiError.js';

class LinkedInController {
  static LoginUser = async (req, res) => {
    try {
      const { code } = req.query; 
      if (!code) throw new ApiError(400, 'No authorization code');

      const result = await LinkedInServices.LoginUser(code); 

      // ✅ FIX: Same cookie settings as Google
      res.cookie('token', result.token, { 
        httpOnly: false,  // ✅ Changed from true
        secure: false,
        sameSite: 'lax',  // ✅ Added
        path: '/',        // ✅ Added
        maxAge: 24 * 60 * 60 * 1000  // ✅ Added
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