// controllers/google.controller.js
import GoogleServices from "../services/google.service.js";
import { ApiError } from "../utils/ApiError.js";

class GoogleController {
  static LoginInUser = async (req, res) => {
    try {
      const { code } = req.query;
      if (!code) throw new ApiError(400, "No authorization code");

      const result = await GoogleServices.GoogleLoginUser(code);

      res.cookie("token", result.token, {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.redirect("http://localhost:5173/profile");
    } catch (err) {
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
      });
    }
  };
}

export default GoogleController;