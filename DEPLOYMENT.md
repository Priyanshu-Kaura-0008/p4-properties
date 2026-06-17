# P4 Properties Production Deployment

Production target:

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Images: Cloudinary
- Domain: `p4properties.in`

## Production Checklist

- MongoDB Atlas production cluster is active and has a dedicated database user.
- MongoDB Atlas Network Access allows Render outbound traffic, or `0.0.0.0/0` if Render static IPs are not configured.
- Cloudinary account is configured with production credentials.
- Render API service is deployed and `/api/health` returns success.
- Vercel frontend is deployed and connected to `p4properties.in`.
- DNS points `p4properties.in` and `www.p4properties.in` to Vercel.
- `VITE_API_URL` points to the Render API `/api` URL.
- Backend `CLIENT_URLS` includes both production frontend origins.
- Admin user exists and can log in.
- Property image upload works from admin.
- Inquiry and site visit forms submit successfully.
- SEO metadata, sitemap, robots, and canonical URLs use `https://p4properties.in`.
- Google Analytics ID is configured if tracking is required.

## Environment Variables

### Vercel Frontend

Set these in Vercel Project Settings > Environment Variables:

```text
VITE_API_URL=https://YOUR_RENDER_SERVICE.onrender.com/api
VITE_SITE_URL=https://p4properties.in
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

`VITE_GA_MEASUREMENT_ID` is optional. Leave it blank to disable Google Analytics.

### Render Backend

Set these in Render service Environment:

```text
NODE_ENV=production
PORT=10000
CLIENT_URL=https://p4properties.in
CLIENT_URLS=https://p4properties.in,https://www.p4properties.in
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/p4-properties?retryWrites=true&w=majority
JWT_SECRET=<long-random-secret>
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
```

Use a long random `JWT_SECRET`; do not reuse local development values.

## Vercel Deployment

1. Import the Git repository into Vercel.
2. Select the project root as the frontend root.
3. Use:

```text
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

4. Add the Vercel environment variables listed above.
5. Add domains:

```text
p4properties.in
www.p4properties.in
```

6. Configure DNS records using Vercel's domain instructions.

`vercel.json` handles SPA routing and cache headers for assets, `sitemap.xml`, and `robots.txt`.

## Render Deployment

1. Create a new Render Web Service from the same repository.
2. Use:

```text
Environment: Node
Build Command: npm install
Start Command: npm run server
Health Check Path: /api/health
```

3. Add all Render backend environment variables.
4. Deploy and verify:

```text
GET https://YOUR_RENDER_SERVICE.onrender.com/api/health
```

Expected response:

```json
{ "success": true, "message": "P4 Properties API is healthy" }
```

`render.yaml` is included for blueprint-style deployment.

## MongoDB Atlas

- Use a production cluster or production database.
- Create a least-privilege database user for the app.
- Confirm `MONGO_URI` points to the production database.
- Verify connection logs in Render show `MongoDB connected`.
- Enable backups in Atlas.

## Cloudinary

- Use production Cloudinary credentials in Render.
- Current upload folders:

```text
p4-properties/properties
p4-properties/blogs
p4-properties/testimonials
```

- Verify admin property image upload creates assets in the expected folder.
- Verify deleting a property removes associated Cloudinary assets.

## Verification Checklist

### Frontend

- Home page loads at `https://p4properties.in`.
- `/properties` loads and filters properties.
- `/properties/:slug` loads dynamic property SEO and details.
- `/about`, `/services`, `/contact`, and `/locations/:location` load directly after refresh.
- `https://p4properties.in/sitemap.xml` loads.
- `https://p4properties.in/robots.txt` loads.
- Canonical URLs use `https://p4properties.in`.
- Open Graph and Twitter card tags are present.
- Google Analytics appears in the browser network tab when `VITE_GA_MEASUREMENT_ID` is set.

### Backend

- `/api/health` returns success.
- Admin login returns a JWT.
- Admin protected routes reject unauthenticated requests.
- Property CRUD works for admin.
- Property images upload to Cloudinary.
- Public inquiry form posts to `/api/inquiries`.
- Site visit form posts to `/api/site-visits`.
- Dashboard analytics returns total, pending, and completed site visits.

### Security

- `NODE_ENV=production` on Render.
- CORS only includes production frontend origins and any intentional preview domains.
- `JWT_SECRET` is long and private.
- MongoDB credentials are not committed.
- Cloudinary API secret is not exposed to Vercel.
- Rate limiting, Helmet, mongo sanitize, and global error handling are enabled.

## Deployment Commands

Local production build check:

```bash
npm install
npm run build
```

Local backend check:

```bash
npm run server
```

Optional Render blueprint deployment uses `render.yaml`; otherwise configure the same values manually in the Render dashboard.
