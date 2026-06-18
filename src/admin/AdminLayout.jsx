import { useState } from 'react';
import { FaBars, FaBell, FaChevronDown, FaSignOutAlt, FaTimes, FaUserCircle } from 'react-icons/fa';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { adminNavItems } from './adminNav';

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { logout: clearAuth, currentUser } = useAuth();

  const logout = () => {
    clearAuth();
    toast.success('Signed out');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#111111] shadow-[0_24px_80px_rgba(0,0,0,.45)] transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <NavLink to="/admin" className="font-display text-2xl font-bold">
            P4 <span className="text-gold">Properties</span>
          </NavLink>
          <button className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 lg:hidden" type="button" onClick={() => setOpen(false)} aria-label="Close admin menu">
            <FaTimes />
          </button>
        </div>
        <nav className="grid gap-2 p-4" aria-label="Admin navigation">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                  isActive ? 'bg-gold text-night shadow-[0_0_28px_rgba(212,175,55,.25)]' : 'text-white/68 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <item.icon aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {open && <button className="fixed inset-0 z-40 bg-night/70 lg:hidden" type="button" onClick={() => setOpen(false)} aria-label="Close sidebar" />}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#111111]/90 px-4 shadow-[0_12px_40px_rgba(0,0,0,.28)] backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-4">
            <button type="button" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 lg:hidden" onClick={() => setOpen(true)} aria-label="Open admin menu">
              <FaBars />
            </button>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold">Luxury Admin</p>
              <h1 className="font-display text-xl font-bold sm:text-2xl">Command Center</h1>
            </div>
          </div>

          <div className="relative flex items-center gap-3">
            <button className="hidden h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-white/60 md:flex" type="button" aria-label="Notifications">
              <FaBell />
            </button>
            <button
              type="button"
              className="flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-[#1A1A1A] px-3 py-2"
              onClick={() => setProfileOpen((value) => !value)}
              aria-expanded={profileOpen}
            >
              <FaUserCircle className="text-2xl text-gold" />
              <span className="hidden text-sm font-bold md:inline">{currentUser?.name || 'Admin'}</span>
              <FaChevronDown className="text-xs" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-14 w-48 rounded-xl border border-white/10 bg-[#1A1A1A] p-2 shadow-premium">
                <button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold text-white/80 hover:bg-white/10">
                  <FaSignOutAlt className="text-gold" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
