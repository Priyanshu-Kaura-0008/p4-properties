import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import env from './config/env.js';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import siteVisitRoutes from './routes/siteVisitRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import testRoutes from './routes/testRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

const allowedOrigins = env.CLIENT_URLS.split(',').map((origin) => origin.trim()).filter(Boolean);
const mongoSanitizeOptions = {};

const isMultipartRequest = (req) => req.is('multipart/form-data');

const sanitizeRequestData = (req, res, next) => {
  if (req.query) {
    Object.defineProperty(req, 'query', {
      value: mongoSanitize.sanitize({ ...req.query }, mongoSanitizeOptions),
      writable: true,
      enumerable: true,
      configurable: true,
    });
  }

  if (!isMultipartRequest(req) && req.body) {
    mongoSanitize.sanitize(req.body, mongoSanitizeOptions);
  }

  next();
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 150,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }),
);
app.use(limiter);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());
app.use(sanitizeRequestData);

if (env.NODE_ENV === 'development') app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'P4 Properties API is healthy' });
});

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/site-visits', siteVisitRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/test', testRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/dashboard', analyticsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
