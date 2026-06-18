import express from 'express';
import { createDocument, deleteDocument, getDocuments, updateDocument } from '../controllers/documentController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(requireAdmin, createDocument).get(requireAdmin, getDocuments);
router.route('/:id').put(requireAdmin, updateDocument).delete(requireAdmin, deleteDocument);

export default router;
