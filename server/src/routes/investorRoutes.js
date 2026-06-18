import express from 'express';
import { createInvestor, deleteInvestor, getInvestors, updateInvestor } from '../controllers/investorController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(requireAdmin, createInvestor).get(requireAdmin, getInvestors);
router.route('/:id').put(requireAdmin, updateInvestor).delete(requireAdmin, deleteInvestor);

export default router;
