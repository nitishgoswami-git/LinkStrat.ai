// controllers/linkedin.controller.js
import LinkedInServices from "../services/linkedin.service.js";
import { ApiError } from "../utils/ApiError.js";

class LinkedInController {
  static LoginUser = async (req, res) => {
    try {
      const { code, state, error } = req.query;

      // Handle OAuth errors
      if (error) {
        return res.redirect(
          `${process.env.CLIENT_URL}/?error=${encodeURIComponent(error)}`
        );
      }

      // Validate authorization code
      if (!code) {
        throw new ApiError(400, "No authorization code provided");
      }

      // Optional: Verify state for CSRF protection
      // You'd need to store state in session/cookie before redirect

      // Exchange code for user data and create session
      const result = await LinkedInServices.LoginUser(code);

      // Set httpOnly cookie
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Redirect to dashboard with success
      res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    } catch (err) {
      console.error("LinkedIn OAuth error:", err);

      // Redirect to frontend with error
      res.redirect(
        `${process.env.CLIENT_URL}/?error=${encodeURIComponent(err.message)}`
      );
    }
  };

  // Optional: Get current user endpoint
  static getUser = async (req, res) => {
    try {
      // Assumes you have auth middleware that sets req.user
      res.status(200).json({
        success: true,
        user: req.user,
      });
    } catch (err) {
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
      });
    }
  };

  static Logout = async (req, res) => {
    try {
      // Clear the authentication cookie
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (err) {
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
      });
    }
  };
}

export default LinkedInController;
