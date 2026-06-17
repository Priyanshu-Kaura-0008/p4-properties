import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import GoogleAnalytics from './components/GoogleAnalytics.jsx';
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const PropertiesPage = lazy(() => import('./pages/PropertiesPage.jsx'));
const PropertyDetailsPage = lazy(() => import('./pages/PropertyDetailsPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const LocationPage = lazy(() => import('./pages/LocationPage.jsx'));
const AdminLayout = lazy(() => import('./admin/AdminLayout.jsx'));
const ProtectedAdminRoute = lazy(() => import('./admin/ProtectedAdminRoute.jsx'));
const AdminDashboard = lazy(() => import('./admin/pages/AdminDashboard.jsx'));
const AdminLogin = lazy(() => import('./admin/pages/AdminLogin.jsx'));
const BlogsAdmin = lazy(() => import('./admin/pages/BlogsAdmin.jsx'));
const BlogFormAdmin = lazy(() => import('./admin/pages/BlogFormAdmin.jsx'));
const InquiriesAdmin = lazy(() => import('./admin/pages/InquiriesAdmin.jsx'));
const PropertiesAdmin = lazy(() => import('./admin/pages/PropertiesAdmin.jsx'));
const PropertyFormAdmin = lazy(() => import('./admin/pages/PropertyFormAdmin.jsx'));
const SettingsAdmin = lazy(() => import('./admin/pages/SettingsAdmin.jsx'));
const SiteVisitsAdmin = lazy(() => import('./admin/pages/SiteVisitsAdmin.jsx'));
const TestimonialsAdmin = lazy(() => import('./admin/pages/TestimonialsAdmin.jsx'));

export default function App() {
  return (
    <>
      <GoogleAnalytics />
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#1A1A1A', color: '#fff', border: '1px solid rgba(212,175,55,.35)' },
          success: { iconTheme: { primary: '#D4AF37', secondary: '#111111' } },
        }}
      />
      <Suspense fallback={<div className="min-h-screen bg-night" aria-label="Loading page" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:slug" element={<PropertyDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/locations/:location" element={<LocationPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="properties" element={<PropertiesAdmin />} />
              <Route path="properties/add" element={<PropertyFormAdmin />} />
              <Route path="properties/edit/:id" element={<PropertyFormAdmin />} />
              <Route path="inquiries" element={<InquiriesAdmin />} />
              <Route path="site-visits" element={<SiteVisitsAdmin />} />
              <Route path="testimonials" element={<TestimonialsAdmin />} />
              <Route path="blogs" element={<BlogsAdmin />} />
              <Route path="blogs/add" element={<BlogFormAdmin />} />
              <Route path="blogs/edit/:id" element={<BlogFormAdmin />} />
              <Route path="settings" element={<SettingsAdmin />} />
            </Route>
          </Route>
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
}
