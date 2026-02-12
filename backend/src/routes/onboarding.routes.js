import express from 'express';
import { registerUser, checkEmail } from '../controllers/onboarding.controller.js';
import { validate, onboardingSchema } from '../middleware/validation.middleware.js';

const router = express.Router();

// Register new user
router.post('/register', validate(onboardingSchema), registerUser);

// Check if email exists
router.get('/check-email/:email', checkEmail);

export default router;
