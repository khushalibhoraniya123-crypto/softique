import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import Button from './Button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Product', href: '#product' },
    { label: 'Our Process', href: '#process' },
    { label: 'Why Softique', href: '#why-us' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'luxury-glass py-3.5 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo / Wordmark */}
          <a
            href="#hero"
            className="group flex items-center gap-2.5 focus:outline-none"
            aria-label={`${siteConfig.brand.name} - Home`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#1C1E21] text-[#FAF8F5] flex items-center justify-center font-serif text-lg font-semibold tracking-wider transition-transform duration-300 group-hover:scale-105 shadow-xs">
              S
            </div>
            <div className="flex flex-col">
              <span className="editorial-title text-2xl font-semibold tracking-tight text-[#1C1E21] leading-none">
                {siteConfig.brand.name}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#8A8275] font-sans mt-0.5">
                Rajkot • Gujarat
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#484E59] hover:text-[#1C1E21] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C5A880] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp.number}?text=${encodeURIComponent(
                siteConfig.contact.whatsapp.defaultMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#525966] hover:text-[#128C7E] transition-colors font-medium"
              title="Chat with owner on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#128C7E]" />
              <span>WhatsApp Us</span>
            </a>

            <Button
              href="#enquiry"
              variant="primary"
              size="sm"
              icon={ArrowUpRight}
            >
              Wholesale Enquiry
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="#enquiry"
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#1C1E21] text-white"
            >
              Enquire
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#1C1E21] hover:bg-black/5 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[60px] bg-black/40 backdrop-blur-xs z-40 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute top-full left-0 right-0 bg-[#FBFBF9] border-b border-[#E8E2D6] px-6 py-6 shadow-xl z-50 md:hidden"
            >
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-serif text-[#1C1E21] hover:text-[#0E63B8] py-2 border-b border-[#F0ECE1] flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#A89F91]" />
                  </a>
                ))}
                
                <div className="pt-4 flex flex-col gap-3">
                  <Button
                    href="#enquiry"
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Wholesale & Retail Enquiry
                  </Button>
                  
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp.number}?text=${encodeURIComponent(
                      siteConfig.contact.whatsapp.defaultMessage
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-full text-center text-sm font-medium text-white bg-[#128C7E] flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>

                  <p className="text-center text-xs text-[#8A8275] pt-2">
                    {siteConfig.brand.foundedLocation}
                  </p>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

