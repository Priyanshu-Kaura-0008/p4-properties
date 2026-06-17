import express from 'express';
import { getDashboardAnalytics, getDashboardSummary } from '../controllers/analyticsController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getDashboardSummary);
router.get('/analytics', requireAdmin, getDashboardAnalytics);

export default router;
