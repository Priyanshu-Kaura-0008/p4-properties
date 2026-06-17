# P4 Properties Backend API

Production-ready Express and MongoDB backend for P4 Properties.

## Tech Stack

- Node.js with modern ES Modules
- Express.js
- MongoDB Atlas
- Mongoose
- JWT authentication
- bcrypt password hashing
- Cloudinary image storage
- Multer memory uploads
- express-validator
- Helmet, CORS, rate limiting, and mongo sanitize

## Folder Structure

```text
server/
  server.js
  src/
    app.js
    config/
      cloudinary.js
      db.js
      env.js
    controllers/
      analyticsController.js
      authController.js
      blogController.js
      inquiryController.js
      propertyController.js
      testimonialController.js
    middleware/
      auth.js
      errorHandler.js
      notFound.js
      upload.js
      validate.js
    models/
      Blog.js
      Inquiry.js
      Property.js
      Testimonial.js
      User.js
    routes/
      analyticsRoutes.js
      authRoutes.js
      blogRoutes.js
      inquiryRoutes.js
      propertyRoutes.js
      testimonialRoutes.js
    utils/
      apiError.js
      apiResponse.js
      asyncHandler.js
      generateToken.js
      queryFeatures.js
    validators/
      authValidators.js
      blogValidators.js
      leadValidators.js
      propertyValidators.js
      testimonialValidators.js
```

## Environment

Copy `.env.example` to `.env` and set:

```text
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-frontend-domain.com
CLIENT_URLS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
MONGO_URI=mongodb+srv://...
JWT_SECRET=use_a_long_random_secret
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## Main Endpoints

Full Postman-ready examples are in [`API.md`](./API.md).

### Auth

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Properties

```text
POST   /api/properties
GET    /api/properties
GET    /api/properties/featured
GET    /api/properties/search
GET    /api/properties/:slug
PUT    /api/properties/:id
DELETE /api/properties/:id
```

`GET /api/properties/:slug` returns the public property detail page payload.

Property filtering supports:

```text
search, featured, city, location, purpose, propertyType, type, category,
minPrice, maxPrice, budget, minArea, maxArea, minLandArea, maxLandArea, page, limit, sort
```

Property image uploads use `mainImage` and `galleryImages`. The legacy `images` field is also accepted. Images are stored in:

```text
p4-properties/properties
```

### Inquiries

```text
POST   /api/inquiries
GET    /api/inquiries
GET    /api/inquiries/:id
PUT    /api/inquiries/:id
DELETE /api/inquiries/:id
```

Public users can create inquiries. Admins manage inquiries.

### Site Visits

```text
POST   /api/site-visits
GET    /api/site-visits
GET    /api/site-visits/:id
PUT    /api/site-visits/:id
DELETE /api/site-visits/:id
```

Public users can request site visits. Admins manage site visits.

### Testimonials

```text
POST   /api/testimonials
GET    /api/testimonials
GET    /api/testimonials/admin
GET    /api/testimonials/:id
PATCH  /api/testimonials/:id/approve
PUT    /api/testimonials/:id
DELETE /api/testimonials/:id
```

Public testimonial fetches return approved testimonials. Images are stored in:

```text
p4-properties/testimonials
```

### Blogs

```text
POST   /api/blogs
GET    /api/blogs
GET    /api/blogs/:slug
PUT    /api/blogs/:id
DELETE /api/blogs/:id
```

Public blog fetches return published blogs. Authenticated admins can fetch drafts through `GET /api/blogs`.
Blog images are stored in:

```text
p4-properties/blogs
```

### Dashboard

```text
GET /api/dashboard/analytics
```

Returns:

```text
totalProperties
featuredProperties
latestProperties
totalInquiries
testimonialsCount
blogsCount
pendingSiteVisits
completedSiteVisits
recentInquiries
recentSiteVisits
propertyDistributionByType
propertyDistributionByCity
```

## Security

- Helmet enabled
- CORS restricted to `CLIENT_URLS`
- Rate limiting enabled
- Mongo query/body sanitization enabled
- JWT admin protection through `requireAdmin`
- Passwords hashed with bcrypt
- Global error handler hides stack traces in production

## Run

```bash
npm install
npm run server
```

Development:

```bash
npm run server:dev
```

## Production Deployment

Use Render for this API and Vercel for the React frontend.

Render settings:

```text
Build Command: npm install
Start Command: npm run server
Health Check Path: /api/health
```

Production environment:

```text
NODE_ENV=production
CLIENT_URL=https://p4properties.in
CLIENT_URLS=https://p4properties.in,https://www.p4properties.in
```

See `../DEPLOYMENT.md` for the full Vercel, Render, MongoDB Atlas, Cloudinary, SEO, and verification checklist.
