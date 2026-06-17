import express from 'express';
import { createSiteVisit, deleteSiteVisit, getSiteVisits, updateSiteVisit } from '../controllers/siteVisitController.js';
import { requireAdmin } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { siteVisitQueryValidator, siteVisitValidator, updateSiteVisitValidator } from '../validators/leadValidators.js';

const router = express.Router();

router
  .route('/')
  .post(siteVisitValidator, validate, createSiteVisit)
  .get(requireAdmin, siteVisitQueryValidator, validate, getSiteVisits);

router
  .route('/:id')
  .put(requireAdmin, updateSiteVisitValidator, validate, updateSiteVisit)
  .delete(requireAdmin, deleteSiteVisit);

export default router;
