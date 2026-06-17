import { FaBlog, FaCalendarCheck, FaCog, FaComments, FaHome, FaQuoteRight, FaTachometerAlt } from 'react-icons/fa';

export const adminNavItems = [
  { label: 'Dashboard', to: '/admin', icon: FaTachometerAlt, end: true },
  { label: 'Properties', to: '/admin/properties', icon: FaHome },
  { label: 'Inquiries', to: '/admin/inquiries', icon: FaComments },
  { label: 'Site Visits', to: '/admin/site-visits', icon: FaCalendarCheck },
  { label: 'Testimonials', to: '/admin/testimonials', icon: FaQuoteRight },
  { label: 'Blogs', to: '/admin/blogs', icon: FaBlog },
  { label: 'Settings', to: '/admin/settings', icon: FaCog },
];
