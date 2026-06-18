import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../data/siteData';

const linkToPath = (label) => {
  if (label === 'Properties') return '/properties';
  if (label === 'About Us') return '/about';
  if (label === 'Services') return '/services';
  if (label === 'Blogs') return '/blogs';
  if (label === 'Contact Us') return '/contact';
  if (label === 'Home') return '/#home';
  return `/#${label.toLowerCase().replaceAll(' ', '-')}`;
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || isOpen ? 'bg-white shadow-soft' : 'bg-transparent'
      }`}
    >
      <nav className="container-p4 flex h-20 items-center justify-between" aria-label="Primary navigation">
        <Link to="/" className={`font-display text-2xl font-bold ${isScrolled || isOpen ? 'text-ink' : 'text-white'}`}>
          P4 <span className="text-gold">Properties</span>
        </Link>

        <div className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={isHome && link !== 'Properties' ? linkToPath(link).replace('/', '') : linkToPath(link)}
              className={`text-sm font-semibold transition-colors hover:text-gold ${
                isScrolled ? 'text-ink' : 'text-white'
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        <a
          href="/site-visit"
          className="hidden rounded-xl bg-night px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-gold hover:text-night lg:inline-flex"
        >
          Book Site Visit
        </a>

        <button
          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border lg:hidden ${
            isScrolled || isOpen ? 'border-ink/10 text-ink' : 'border-white/30 text-white'
          }`}
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 top-20 z-40 bg-night/55 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed right-4 top-24 z-50 w-[calc(100%-32px)] max-w-sm overflow-hidden rounded-2xl border border-ink/10 bg-white p-5 shadow-premium lg:hidden"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 28 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href={isHome && link !== 'Properties' ? linkToPath(link).replace('/', '') : linkToPath(link)}
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-4 py-4 text-base font-bold text-ink transition-colors hover:bg-ivory hover:text-gold"
                  >
                    {link}
                  </a>
                ))}
                <a
                  href="/site-visit"
                  onClick={() => setIsOpen(false)}
                  className="mt-3 inline-flex min-h-12 items-center justify-center rounded-xl bg-night px-5 py-3 text-center text-sm font-extrabold uppercase tracking-[0.14em] text-white transition-colors hover:bg-gold hover:text-night"
                >
                  Book Site Visit
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
