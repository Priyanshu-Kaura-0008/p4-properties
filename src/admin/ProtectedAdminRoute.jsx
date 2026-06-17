import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedAdminRoute() {
  const token = localStorage.getItem('p4_admin_token') || sessionStorage.getItem('p4_admin_token');
  return token ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
