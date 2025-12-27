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
      redirect_uri: `${process.env.AUTH_URL}/auth/linkedin/loginUser`,
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
      throw new ApiError(400, `Token error: ${response.statusText}`);
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
      throw new ApiError(400, `Profile error: ${response.statusText}`);
    }

    return response.json();
  };

  static getUserData = async (accessToken) => {
    const profile = await this.getUserProfile(accessToken);

    return {
      name: profile.name || `${profile.given_name} ${profile.family_name}`,
      email: profile.email,
      avatar: profile.picture || "",
      linkedinId: profile.sub, // ✅ Added LinkedIn ID
    };
  };

  // services/linkedin.service.js
  // ... your existing methods unchanged until LoginUser ...

  static LoginUser = async (code) => {
    try {
      const accessTokenData = await this.getAccessToken(code);
      const userData = await this.getUserProfile(accessTokenData.access_token); // Fixed method name

      // ✅ Primary lookup by LinkedIn ID (not email)
      let user = await User.findOne({ linkedinId: userData.sub });

      if (!user) {
        user = new User({
          name: userData.name,
          email: userData.email,
          avatar: userData.picture || userData.avatar, // Handle both formats
          linkedinId: userData.sub,
          provider: "linkedin",
        });
        await user.save();
      } else {
        // Update existing user
        user.name = userData.name;
        user.email = userData.email;
        user.avatar = userData.picture || userData.avatar;
        await user.save();
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          linkedinId: user.sub, // ✅ Unique identifier
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" } // Longer expiry
      );

      return {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          linkedinId: user.sub,
        },
        token,
      };
    } catch (error) {
      throw new ApiError(500, "LinkedIn login failed: " + error.message);
    }
  };
}

export default LinkedInServices;
