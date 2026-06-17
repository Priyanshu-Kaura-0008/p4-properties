import express from 'express';
import { getDashboardAnalytics } from '../controllers/analyticsController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/analytics', requireAdmin, getDashboardAnalytics);

export default router;
