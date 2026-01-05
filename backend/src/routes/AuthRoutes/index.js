import { Router } from "express";
import LinkedInController from "../../controllers/linkedin.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.get("/callback", LinkedInController.LoginUser);
authRouter.get('/me',authMiddleware, LinkedInController.getUser)
authRouter.post ("/logout", authMiddleware , LinkedInController.Logout);

export default authRouter;