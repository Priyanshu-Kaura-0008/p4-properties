import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(requireAdmin, getSettings).put(requireAdmin, updateSettings);

export default router;
