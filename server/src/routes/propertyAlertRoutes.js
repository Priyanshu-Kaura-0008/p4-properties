import express from 'express';
import {
  createPropertyAlert,
  deletePropertyAlert,
  getPropertyAlerts,
  updatePropertyAlert,
} from '../controllers/propertyAlertController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(createPropertyAlert).get(requireAdmin, getPropertyAlerts);
router.route('/:id').put(requireAdmin, updatePropertyAlert).delete(requireAdmin, deletePropertyAlert);

export default router;
