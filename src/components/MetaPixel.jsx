import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pixelId = import.meta.env.VITE_META_PIXEL_ID;

export default function MetaPixel() {
  const location = useLocation();

  useEffect(() => {
    // Meta Pixel integration point: set VITE_META_PIXEL_ID in production when ads tracking is approved.
    if (!pixelId || window.fbq) return;

    window.fbq = function fbq() {
      window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
    };
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = '2.0';
    window.fbq.queue = [];

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);

    window.fbq('init', pixelId);
  }, []);

  useEffect(() => {
    if (!pixelId || !window.fbq) return;
    window.fbq('track', 'PageView');
  }, [location.pathname, location.search]);

  return null;
}
