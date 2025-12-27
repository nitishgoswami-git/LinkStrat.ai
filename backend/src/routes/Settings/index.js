// routes/settings.js
import express from 'express';
import authMiddleware from '../../middlewares/auth.middleware.js';
import { getGroqKeyController, saveGroqKeyController } from '../../controllers/settings.controller.js';

const router = express.Router();

router.route('/groq-key')
  .get(authMiddleware, getGroqKeyController)      // ✅ Check if exists
  .post(authMiddleware, saveGroqKeyController);   // ✅ Save new key

export default router;
