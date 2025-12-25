import { Router } from "express";
import LinkedInController from "../../controllers/linkedin.controller.js";
// import { verifyUser } from "../../middlewares/auth.middleware.js";
// import {upload} from "../../middlewares/multer.middleware.js"

const authRouter = Router();

authRouter.get("/loginUser", LinkedInController.LoginUser);
// authRouter.post("/register", upload.single("photo"), AuthController.register);
// authRouter.get("/me", verifyUser, AuthController.userData);
// authRouter.get("/verify", verifyUser, AuthController.userData);
// authRouter.post("/logout", verifyUser, AuthController.logout);
// authRouter.post("/refresh", AuthController.refreshToken);

export default authRouter;