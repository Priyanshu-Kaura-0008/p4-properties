import express from 'express';
import { login, profile, register } from '../controllers/authController.js';
import { requireAdmin } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { loginValidator, registerValidator } from '../validators/authValidators.js';

const router = express.Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.get('/profile', requireAdmin, profile);

export default router;
