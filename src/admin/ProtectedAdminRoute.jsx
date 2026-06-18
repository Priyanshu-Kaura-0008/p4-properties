import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../components/common/Loading';
import { useAuth } from '../context/AuthContext';

export default function ProtectedAdminRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <Loading label="Checking access..." />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
