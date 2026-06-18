import PropertyAlert from '../models/PropertyAlert.js';
import { notifyPropertyMatch } from './notificationService.js';

const buildMatchQuery = (property) => ({
  active: true,
  propertyType: property.propertyType,
  purpose: property.purpose || 'Buy',
  $or: [
    { location: property.city },
    { location: property.location },
    { location: property.locality },
  ].filter((item) => Object.values(item)[0]),
  $and: [
    { $or: [{ budgetMin: { $exists: false } }, { budgetMin: { $lte: property.price } }] },
    { $or: [{ budgetMax: { $exists: false } }, { budgetMax: { $gte: property.price } }] },
  ],
});

export const notifyMatchingPropertyAlerts = async (property) => {
  if (!property?.price || !property?.propertyType) return [];
  const alerts = await PropertyAlert.find(buildMatchQuery(property)).limit(50);

  await Promise.allSettled(
    alerts.map(async (alert) => {
      await notifyPropertyMatch({ alert, property });
      alert.lastMatchedAt = new Date();
      await alert.save();
    }),
  );

  return alerts;
};

export default { notifyMatchingPropertyAlerts };
