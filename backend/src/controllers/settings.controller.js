import SettingsService from "../services/settings.service.js";
import { ApiError } from "../utils/ApiError.js";

class SettingsController {
  static updateUserGroqKey = async (req, res) => {
    try {
      
      const result = await SettingsService.updateUserGroqKey(req);
      
      if (!result) {
        throw new ApiError(500, "Something went wrong");
      }
      
      return res.status(200).json({
        status: 200,
        msg: "Key updated successfully",
        data: result
      });

    } catch (err) {
      // Handle different error types
      if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
          status: err.statusCode,
          message: err.message
        });
      }
      
      // Generic error handler
      return res.status(500).json({
        status: 500,
        message: "Something went wrong"
      });
    }
  };
}

export default SettingsController;