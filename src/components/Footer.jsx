import React from 'react';
import { ArrowUp, MapPin, Phone, Mail, MessageSquare } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#12151A] text-[#FAF8F5] pt-16 pb-12 border-t border-[#252C38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#222935]">
          
          {/* Col 1: Brand & Wordmark */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white text-[#12151A] flex items-center justify-center font-serif text-lg font-bold">
                S
              </div>
              <span className="editorial-title text-3xl font-semibold text-white tracking-tight">
                {siteConfig.brand.name}
              </span>
            </div>

            <p className="text-sm text-[#A0AAB8] max-w-sm leading-relaxed mb-6">
              {siteConfig.brand.tagline} {siteConfig.brand.summary}
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-[#C5A880] bg-[#1C222C] px-3 py-1.5 rounded-full border border-[#2D3646]">
              <MapPin className="w-3.5 h-3.5" />
              <span>Manufactured in Rajkot, Gujarat, India</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D8C7A5] font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A0AAB8]">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#product" className="hover:text-white transition-colors">Softique Napkin Tissue</a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">Manufacturing Setup</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">Brand Priorities</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Softique</a>
              </li>
              <li>
                <a href="#enquiry" className="hover:text-white transition-colors">Wholesale Enquiry</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact Details</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Verified Facility & Supply Information */}
          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase tracking-widest text-[#D8C7A5] font-semibold mb-4">
              Supply Office & Dispatch
            </h4>
            
            <div className="space-y-3 text-sm text-[#A0AAB8]">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>Rajkot, Gujarat, India (Ex-Factory Dispatch)</span>
              </p>

              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`tel:${siteConfig.contact.phone.value}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.phone.display}
                </a>
              </p>

              <p className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#128C7E] shrink-0" />
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp.number}?text=${encodeURIComponent(
                    siteConfig.contact.whatsapp.defaultMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {siteConfig.contact.whatsapp.display}
                </a>
              </p>

              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`mailto:${siteConfig.contact.email.value}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email.display}
                </a>
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#222935] text-[11px] text-[#717E91]">
              Legal Entity: {siteConfig.brand.legalEntity} • Operating Entity in Rajkot
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#717E91]">
          <p>
            © {currentYear} {siteConfig.brand.name} ({siteConfig.brand.legalEntity}). All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span>Rajkot, Gujarat</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#D8C7A5] hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
