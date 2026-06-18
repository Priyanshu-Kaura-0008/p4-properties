# P4 Properties Launch Checklist

## Content
- [ ] Deploy backend changes that allow launch-content image URLs.
- [ ] Run `P4_ADMIN_EMAIL="..." P4_ADMIN_PASSWORD="..." npm run seed:launch`.
- [ ] Confirm `GET /properties/featured?limit=8` returns 8 premium listings.
- [ ] Confirm `GET /blogs` returns 10 published SEO blogs.
- [ ] Confirm `GET /testimonials` returns approved testimonials.
- [ ] Run `npm run sitemap:generate` after seeding content.

## SEO
- [ ] Verify title, description, and canonical tags on `/`, `/properties`, city pages, property detail pages, and blog detail pages.
- [ ] Submit `https://p4properties.in/sitemap.xml` in Google Search Console.
- [ ] Request indexing for homepage, property listing page, city pages, and blog index.
- [ ] Confirm `robots.txt` allows crawling and references the sitemap.

## Google Business Profile
- [ ] Create or claim the `P4 Properties` profile.
- [ ] Add website: `https://p4properties.in`.
- [ ] Add phone and WhatsApp number.
- [ ] Add business category, service areas, services, opening hours, logo, office photos, and property photos.
- [ ] Verify the profile using the method provided by Google.

## Analytics And Ads
- [ ] Create a GA4 property and set `VITE_GA_MEASUREMENT_ID`.
- [ ] Create Meta Pixel and set `VITE_META_PIXEL_ID`.
- [ ] Verify page views in GA4 Realtime.
- [ ] Verify Meta Pixel events in Events Manager.
- [ ] Confirm events fire for property views, inquiry submissions, site visit bookings, WhatsApp clicks, and phone clicks.

## Domain And Email
- [ ] Point `p4properties.in` DNS to the frontend hosting provider.
- [ ] Add frontend custom domain and SSL certificate.
- [ ] Create `info@p4properties.in`.
- [ ] Create `sales@p4properties.in`.
- [ ] Update website contact references if the final phone, WhatsApp, or email differs.

## Performance
- [ ] Run Lighthouse on mobile and desktop.
- [ ] Confirm Performance > 90.
- [ ] Confirm SEO > 95.
- [ ] Confirm Accessibility > 90.
- [ ] Check image lazy loading and hero LCP behavior.
- [ ] Confirm production assets are cached by hosting/CDN.

## Final QA
- [ ] Home page.
- [ ] Featured properties.
- [ ] Property search.
- [ ] Property listing filters and pagination.
- [ ] Property details.
- [ ] Inquiry form.
- [ ] Site visit form.
- [ ] Blogs and blog details.
- [ ] Testimonials.
- [ ] WhatsApp buttons.
- [ ] Call buttons.
- [ ] Admin login.
- [ ] Admin dashboard.
- [ ] Add, edit, and delete property.
- [ ] Inquiries admin table.
- [ ] Site visits admin table.
- [ ] Blog admin table.
- [ ] Testimonial admin table.
