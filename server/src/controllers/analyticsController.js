import Blog from '../models/Blog.js';
import Inquiry from '../models/Inquiry.js';
import Property from '../models/Property.js';
import SiteVisit from '../models/SiteVisit.js';
import Testimonial from '../models/Testimonial.js';
import { sendSuccess } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const recentPropertyFields = 'title slug city locality price purpose propertyType';

const distributionPipeline = (field) => [
  {
    $group: {
      _id: `$${field}`,
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      label: { $ifNull: ['$_id', 'Unknown'] },
      count: 1,
    },
  },
  { $sort: { count: -1, label: 1 } },
];

export const getDashboardSummary = asyncHandler(async (req, res) => {
  const [properties, inquiries, siteVisits, testimonials] = await Promise.all([
    Property.countDocuments(),
    Inquiry.countDocuments(),
    SiteVisit.countDocuments(),
    Testimonial.countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    properties,
    inquiries,
    siteVisits,
    testimonials,
  });
});

export const getDashboardAnalytics = asyncHandler(async (req, res) => {
  const [
    totalProperties,
    featuredProperties,
    totalInquiries,
    totalSiteVisits,
    pendingSiteVisits,
    completedSiteVisits,
    testimonialsCount,
    blogsCount,
    recentInquiries,
    recentSiteVisits,
    propertyDistributionByType,
    propertyDistributionByCity,
  ] = await Promise.all([
    Property.countDocuments(),
    Property.countDocuments({ featured: true }),
    Inquiry.countDocuments(),
    SiteVisit.countDocuments(),
    SiteVisit.countDocuments({ status: 'pending' }),
    SiteVisit.countDocuments({ status: 'completed' }),
    Testimonial.countDocuments(),
    Blog.countDocuments(),
    Inquiry.find().sort('-createdAt').limit(6).populate('property', recentPropertyFields),
    SiteVisit.find().sort('-createdAt').limit(6).populate('property', recentPropertyFields),
    Property.aggregate(distributionPipeline('propertyType')),
    Property.aggregate(distributionPipeline('city')),
  ]);

  sendSuccess(res, {
    data: {
      totalProperties,
      featuredProperties,
      totalInquiries,
      totalSiteVisits,
      pendingSiteVisits,
      completedSiteVisits,
      testimonialsCount,
      blogsCount,
      recentInquiries,
      recentSiteVisits,
      propertyDistributionByType,
      propertyDistributionByCity,
    },
  });
});
