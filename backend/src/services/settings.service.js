import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";

class SettingsService {
  static updateUserGroqKey = async (req) => {
    // Extract groqKey from request body (not query)
    const { groqKey } = req.body;

    // Check if groqKey is empty or missing
    if (!groqKey || groqKey.trim() === "") {
      throw new ApiError(400, "GroqKey is required and cannot be empty");
    }

    // Encrypt the Groq key using bcrypt
    const saltRounds = 10;
    const encryptedGroqKey = await bcrypt.hash(groqKey, saltRounds);

    // Find the user by email (assuming req.user is set by auth middleware)
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Update user with encrypted Groq key
    user.groqKey = encryptedGroqKey;
    await user.save();

    return {
      success: true,
      message: "Groq API key updated successfully",
    };
  };
}

export default SettingsService;