import SettingsController from "../../controllers/settings.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { Router } from "express";

const settingsRouter = Router();

settingsRouter.patch(
  "/groq-key",
  authMiddleware,
  SettingsController.updateUserGroqKey
);

export default settingsRouter;
