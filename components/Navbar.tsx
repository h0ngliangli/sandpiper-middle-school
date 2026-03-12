'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at the top
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down -> Hide
        setIsVisible(false);
        setIsOpen(false); // Close mobile menu if open
      } else {
        // Scrolling up -> Show
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Design Thinking', href: '#design-thinking' },
    { name: 'News', href: '#news' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#parent-ambassadors' },
    { name: 'Quick Links', href: '#links' },
  ];

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b border-slate-700 bg-sandpiper-blue text-white shadow-lg transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="rounded-full p-2">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to top"
              >
                <img
                  src="/favicon.svg"
                  className="h-10 w-10"
                  alt="Sandpiper Middle School logo"
                />
              </button>
            </div>
            <span className="whitespace-nowrap text-sm tracking-wider text-white sm:text-base md:text-xl">
              SANDPIPER MIDDLE SCHOOL
            </span>
          </div>

          <div className="hidden lg:block">
            <div className="flex items-baseline">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-2 py-2 text-xs tracking-wide transition-all duration-300 hover:scale-110 hover:text-sandpiper-gold sm:text-sm sm:font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="border-t border-slate-700 bg-midnight lg:hidden"
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
