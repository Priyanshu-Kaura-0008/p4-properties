# P4 Properties Business Automation System

## CRM Pipeline
Lead stages:
- New Lead
- Contacted
- Site Visit Scheduled
- Negotiation
- Booked
- Registered
- Lost

Backend fields:
- `status`
- `notes`
- `followUpDate`
- `assignedAgent`
- `leadSource`
- `budget`
- `preferredLocation`

Admin page:
- `/admin/crm`

## Auto Lead Assignment
Current assignment rules:
- Chandigarh -> Agent A
- Mohali -> Agent B
- Panchkula -> Agent C
- New Chandigarh -> Agent D
- Kharar -> Agent B
- Kurali -> Agent D
- Rajpura -> Agent E

Implementation:
- `server/src/services/assignmentService.js`
- Applies on inquiry and site visit creation.

## WhatsApp Cloud API
Environment variables:
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_ACCESS_TOKEN`

Automated messages:
- New inquiry acknowledgement
- New site visit acknowledgement
- Property alert match

Implementation:
- `server/src/services/notificationService.js`

## Email Automation
Provider:
- Resend API

Environment variables:
- `RESEND_API_KEY`
- `EMAIL_FROM`

Automated emails:
- Inquiry submitted
- Site visit booked
- Matching property alert
- Monthly report

## Property Alert System
Public endpoint:
- `POST /api/property-alerts`

Admin endpoints:
- `GET /api/property-alerts`
- `PUT /api/property-alerts/:id`
- `DELETE /api/property-alerts/:id`

Matching logic:
- Location
- Budget range
- Property type
- Purpose

When a property is created or updated, matching active alerts are notified by email and WhatsApp when credentials are configured.

## Investor Database
Admin endpoints:
- `POST /api/investors`
- `GET /api/investors`
- `PUT /api/investors/:id`
- `DELETE /api/investors/:id`

Fields:
- Preferred location
- Budget
- Property type
- ROI expectation
- Source
- Assigned agent
- Follow-up date

## Builder Panel Foundation
User roles now support:
- `admin`
- `builder`
- `agent`

The current protected admin routes remain admin-only. Builder-specific inventory routes can now be added without changing the user model.

## Document Management
Admin endpoints:
- `POST /api/documents`
- `GET /api/documents`
- `PUT /api/documents/:id`
- `DELETE /api/documents/:id`

Document types:
- CLU
- RERA
- Approval
- Floor Plan
- Brochure
- Registry
- NOC
- Other

Storage:
- Metadata is stored in MongoDB.
- Files should be uploaded to Cloudinary/S3, then saved as secure document URLs.

## Sales Analytics
Dashboard tracks:
- Total inquiries
- Total site visits
- Lead-to-visit conversion rate
- Leads by source
- Leads by stage
- Site visits by source

Monthly report endpoint:
- `POST /api/reports/monthly`
- `GET /api/reports/monthly`

Report metrics:
- Leads
- Site visits
- Closings
- Revenue
- Cost
- Conversion rate
- Cost per lead
- Source breakdown
- Agent performance

## Rollout Checklist
- Add WhatsApp Cloud API credentials on Render.
- Add Resend API credentials on Render.
- Replace placeholder agent names with real team members.
- Add public property alert form to the website.
- Add admin investor/document/report pages.
- Add builder-specific routes and frontend once builder onboarding starts.
