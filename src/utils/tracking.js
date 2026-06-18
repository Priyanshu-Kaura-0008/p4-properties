export const trackEvent = (eventName, params = {}) => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', eventName, params);
  }

  if (window.fbq) {
    const metaEvent = {
      inquiry_submit: 'Lead',
      site_visit_submit: 'Schedule',
      whatsapp_click: 'Contact',
      phone_click: 'Contact',
      property_view: 'ViewContent',
    }[eventName];

    if (metaEvent) window.fbq('track', metaEvent, params);
  }
};

export const trackPropertyView = (property) => {
  trackEvent('property_view', {
    content_type: 'property',
    content_ids: [property?._id || property?.slug].filter(Boolean),
    content_name: property?.title,
    city: property?.city,
    property_type: property?.propertyType,
    value: property?.price,
    currency: 'INR',
  });
};
