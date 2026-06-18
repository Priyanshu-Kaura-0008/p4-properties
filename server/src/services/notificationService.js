import env from '../config/env.js';

const sendWhatsAppText = async ({ to, message }) => {
  if (!env.WHATSAPP_PHONE_NUMBER_ID || !env.WHATSAPP_ACCESS_TOKEN || !to) {
    return { skipped: true, reason: 'WhatsApp Cloud API is not configured' };
  }

  const response = await fetch(`https://graph.facebook.com/v20.0/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { preview_url: false, body: message },
    }),
  });

  if (!response.ok) throw new Error(`WhatsApp send failed: ${response.status}`);
  return response.json();
};

const sendEmail = async ({ to, subject, html }) => {
  if (!env.RESEND_API_KEY || !to) {
    return { skipped: true, reason: 'Email provider is not configured' };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: env.EMAIL_FROM, to, subject, html }),
  });

  if (!response.ok) throw new Error(`Email send failed: ${response.status}`);
  return response.json();
};

export const notifyInquirySubmitted = (inquiry) =>
  Promise.allSettled([
    sendWhatsAppText({
      to: inquiry.phone,
      message: `Welcome to P4 Properties. We received your inquiry and ${inquiry.assignedAgent || 'our advisor'} will contact you shortly.`,
    }),
    sendEmail({
      to: inquiry.email,
      subject: 'P4 Properties received your inquiry',
      html: `<p>Hi ${inquiry.name},</p><p>We received your inquiry. Our team will contact you shortly.</p>`,
    }),
  ]);

export const notifySiteVisitBooked = (visit) =>
  Promise.allSettled([
    sendWhatsAppText({
      to: visit.phone,
      message: `Your P4 Properties site visit request for ${visit.preferredLocation || 'your selected location'} has been received.`,
    }),
    sendEmail({
      to: visit.email,
      subject: 'P4 Properties site visit request received',
      html: `<p>Hi ${visit.name},</p><p>Your site visit request has been received. Our team will confirm the schedule.</p>`,
    }),
  ]);

export const notifyPropertyMatch = ({ alert, property }) =>
  Promise.allSettled([
    sendWhatsAppText({
      to: alert.phone,
      message: `New matching property: ${property.title} in ${property.location || property.city}. View: https://p4properties.in/properties/${property.slug}`,
    }),
    sendEmail({
      to: alert.email,
      subject: `New property match: ${property.title}`,
      html: `<p>Hi ${alert.name},</p><p>A matching property is available: <strong>${property.title}</strong>.</p><p><a href="https://p4properties.in/properties/${property.slug}">View property</a></p>`,
    }),
  ]);

export const sendMonthlyReportEmail = ({ to, report }) =>
  sendEmail({
    to,
    subject: `P4 Properties Monthly Report - ${report.month}`,
    html: `<p>Leads: ${report.leads}</p><p>Site visits: ${report.siteVisits}</p><p>Closings: ${report.closings}</p><p>Revenue: ${report.revenue}</p>`,
  });

export default {
  notifyInquirySubmitted,
  notifySiteVisitBooked,
  notifyPropertyMatch,
  sendMonthlyReportEmail,
};
