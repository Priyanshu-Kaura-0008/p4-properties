# P4 Properties API Documentation

Base URL:

```text
https://p4-properties.onrender.com
```

Admin routes require:

```text
Authorization: Bearer <jwt>
```

## Auth

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "admin@p4properties.in",
  "password": "password"
}
```

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "66f000000000000000000001",
      "name": "Admin",
      "email": "admin@p4properties.in",
      "role": "admin"
    },
    "token": "<jwt>"
  }
}
```

## Properties

### Create Property

```http
POST /api/properties
Authorization: Bearer <jwt>
Content-Type: multipart/form-data
```

Fields:

```text
title=Palm Residency
description=Premium 3 BHK apartment in Mohali.
price=8500000
city=Mohali
location=Sector 82
propertyType=Apartment
category=Residential
purpose=buy
status=Available
area=1850
bedrooms=3
bathrooms=3
amenities=["Club House","Parking","Security"]
featured=true
googleMapLink=https://maps.google.com/?q=Sector+82+Mohali
mainImage=<file>
galleryImages=<file[]>
```

```json
{
  "success": true,
  "data": {
    "_id": "66f000000000000000000101",
    "title": "Palm Residency",
    "slug": "palm-residency-000101",
    "city": "Mohali",
    "location": "Sector 82",
    "area": 1850,
    "mainImage": {
      "url": "https://res.cloudinary.com/.../main.jpg",
      "publicId": "p4-properties/properties/main",
      "width": 1254,
      "height": 1254
    },
    "galleryImages": [],
    "images": [
      {
        "url": "https://res.cloudinary.com/.../image.jpg",
        "publicId": "p4-properties/properties/image",
        "width": 1254,
        "height": 1254
      }
    ]
  }
}
```

### List Properties

```http
GET /api/properties?city=Mohali&category=Residential&propertyType=Apartment&minPrice=5000000&maxPrice=10000000&featured=true&search=palm&page=1&limit=12&sort=latest
```

Dedicated search route:

```http
GET /api/properties/search?location=Sector%2082&city=Mohali&propertyType=Apartment&category=Residential&purpose=buy&minPrice=5000000&maxPrice=10000000&search=palm
```

```json
{
  "success": true,
  "count": 1,
  "total": 1,
  "page": 1,
  "pages": 1,
  "data": []
}
```

Supported filters:

```text
location, city, propertyType, category, purpose, minPrice, maxPrice, budget,
featured, search, minArea, maxArea, page, limit, sort
```

### Get Property

```http
GET /api/properties/:slug
```

Use the property slug returned by create/list APIs.

### Update Property

```http
PUT /api/properties/:id
Authorization: Bearer <jwt>
Content-Type: multipart/form-data
```

Use any create fields. Replace the main image with `mainImage`. Add gallery files with `galleryImages`.
The legacy `images` field is still accepted. Remove existing images with:

```text
removeImagePublicIds=["p4-properties/properties/old-image"]
```

### Delete Property

```http
DELETE /api/properties/:id
Authorization: Bearer <jwt>
```

```json
{
  "success": true,
  "message": "Property deleted successfully"
}
```

## Inquiries

### Create Inquiry

```http
POST /api/inquiries
Content-Type: application/json
```

```json
{
  "name": "Aman Sharma",
  "phone": "9876543210",
  "email": "aman@example.com",
  "property": "66f000000000000000000101",
  "message": "Please call me about this property."
}
```

Admin routes:

```http
GET /api/inquiries?page=1&limit=12&status=pending&search=aman
GET /api/inquiries/:id
PUT /api/inquiries/:id
DELETE /api/inquiries/:id
```

## Site Visits

### Create Site Visit

```http
POST /api/site-visits
Content-Type: application/json
```

```json
{
  "name": "Aman Sharma",
  "phone": "9876543210",
  "email": "aman@example.com",
  "address": "Mohali",
  "preferredLocation": "Sector 82",
  "budget": "Rs. 50 Lakhs - Rs. 1 Crore",
  "propertyType": "Apartment",
  "preferredDate": "2026-06-20",
  "preferredTime": "11:00 AM",
  "remarks": "Interested in ready-to-move options."
}
```

Admin routes:

```http
GET /api/site-visits?page=1&limit=12&status=pending&search=aman
GET /api/site-visits/:id
PUT /api/site-visits/:id
DELETE /api/site-visits/:id
```

## Testimonials

Public:

```http
GET /api/testimonials?featured=true&page=1&limit=12
```

Admin routes:

```http
POST /api/testimonials
GET /api/testimonials/admin
GET /api/testimonials/:id
PATCH /api/testimonials/:id/approve
PUT /api/testimonials/:id
DELETE /api/testimonials/:id
```

Create and update support `multipart/form-data` with a single `image` file.

```text
name=Neha Verma
location=Chandigarh
rating=5
review=Excellent service and transparent guidance.
featured=true
approved=true
image=<file>
```

## Dashboard

```http
GET /api/dashboard/analytics
Authorization: Bearer <jwt>
```

```json
{
  "success": true,
  "data": {
    "totalProperties": 42,
    "featuredProperties": 8,
    "latestProperties": [],
    "totalInquiries": 120,
    "totalSiteVisits": 35,
    "pendingSiteVisits": 9,
    "completedSiteVisits": 20,
    "testimonialsCount": 14,
    "blogsCount": 6,
    "recentInquiries": [],
    "recentSiteVisits": [],
    "propertyDistributionByType": [],
    "propertyDistributionByCity": []
  }
}
```

## Error Shape

```json
{
  "success": false,
  "message": "Validation failed"
}
```
