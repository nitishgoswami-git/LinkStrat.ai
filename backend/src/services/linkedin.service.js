// services/linkedin.service.js
import User from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

class LinkedInServices {
  static getAccessToken = async (code) => {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      redirect_uri: `${process.env.AUTH_URL}/auth/callback`,
    });

    const response = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiError(400, `Token error: ${errorText}`);
    }

    return response.json();
  };

  static getUserProfile = async (accessToken) => {
    const response = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "cache-control": "no-cache",
        "X-Restli-Protocol-Version": "2.0.0",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiError(400, `Profile error: ${errorText}`);
    }

    return response.json();
  };

  static LoginUser = async (code) => {
    try {
      // Get access token from LinkedIn
      const accessTokenData = await this.getAccessToken(code);
      const userData = await this.getUserProfile(accessTokenData.access_token);

      // Find or create user
      let user = await User.findOne({ linkedinId: userData.sub });

      if (!user) {
        user = new User({
          name: userData.name || `${userData.given_name} ${userData.family_name}`,
          email: userData.email,
          avatar: userData.picture || "",
          linkedinId: userData.sub,
          provider: "linkedin",
          accessToken: accessTokenData.access_token, // Store for posting
          refreshToken: accessTokenData.refresh_token, // If available
        });
        await user.save();
      } else {
        // Update existing user with fresh token
        user.name = userData.name || `${userData.given_name} ${userData.family_name}`;
        user.email = userData.email;
        user.avatar = userData.picture || "";
        user.accessToken = accessTokenData.access_token;
        if (accessTokenData.refresh_token) {
          user.refreshToken = accessTokenData.refresh_token;
        }
        await user.save();
      }

      // Create JWT for session management
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          linkedinId: user.linkedinId, // Fixed: use linkedinId not sub
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          linkedinId: user.linkedinId,
          avatar: user.avatar,
        },
        token,
      };
    } catch (error) {
      throw new ApiError(500, "LinkedIn login failed: " + error.message);
    }
  };
}

export default LinkedInServices;