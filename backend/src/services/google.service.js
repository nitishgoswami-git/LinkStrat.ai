// services/google.service.js
import User from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

class GoogleServices {
  static getAccessToken = async (code) => {
    const body = new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.AUTH_URL}/auth/google/loginUser`,
      grant_type: "authorization_code",
    });

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!response.ok)
      throw new ApiError(400, `Token error: ${response.statusText}`);
    return response.json();
  };

  static getUserData = async (accessToken) => {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!response.ok)
      throw new ApiError(400, `Profile error: ${response.statusText}`);
    return response.json();
  };

  static GoogleLoginUser = async (code) => {
    try {
      const tokenData = await this.getAccessToken(code);
      const userData = await this.getUserData(tokenData.access_token);

      let user = await User.findOne({ email: userData.email });

      if (!user) {
        user = new User({
          name: userData.name,
          email: userData.email,
          avatar: userData.picture || "",
          googleId: userData.id,
          provider: "google",
        });
        await user.save();
      }

      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          provider: user.provider || "google",
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          provider: user.provider || "google",
        },
        token,
      };
    } catch (error) {
      throw new ApiError(500, "Google login failed", error);
    }
  };
}

export default GoogleServices;