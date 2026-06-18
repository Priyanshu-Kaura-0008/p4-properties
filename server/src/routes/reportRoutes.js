import express from 'express';
import { generateMonthlyReport, getMonthlyReports } from '../controllers/reportController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/monthly').get(requireAdmin, getMonthlyReports).post(requireAdmin, generateMonthlyReport);

export default router;
