import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../data/siteData';

const linkToPath = (label) => {
  if (label === 'Properties') return '/properties';
  if (label === 'About Us') return '/about';
  if (label === 'Services') return '/services';
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
          href={isHome ? '#contact-us' : '/#contact-us'}
          className="hidden bg-night px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-gold hover:text-night lg:inline-flex"
        >
          Book Site Visit
        </a>

        <button
          className={`inline-flex h-11 w-11 items-center justify-center border lg:hidden ${
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
          <motion.div
            className="border-t border-ink/10 bg-white lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="container-p4 grid gap-1 py-5">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={isHome && link !== 'Properties' ? linkToPath(link).replace('/', '') : linkToPath(link)}
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-sm font-semibold text-ink"
                >
                  {link}
                </a>
              ))}
              <a
                href={isHome ? '#contact-us' : '/#contact-us'}
                onClick={() => setIsOpen(false)}
                className="mt-2 bg-night px-5 py-3 text-center text-sm font-bold text-white"
              >
                Book Site Visit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
