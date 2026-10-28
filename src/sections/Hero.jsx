import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, MapPin, Eye, Box } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import Button from '../components/Button';

export default function Hero() {
  const [activeTab, setActiveTab] = useState('package'); // 'package' | 'packet' | 'dual'

  const heroMedia = {
    package: {
      src: siteConfig.media.packageArtwork,
      alt: "Softique Paper Napkin official front face packaging design - Soft. Clean. Reliable.",
      title: "Official Packaging Design",
      tag: "Exact Packaging Artwork",
      note: "100% Virgin Fiber • Soft & Absorbent • 100% Skin Friendly",
    },
    packet: {
      src: siteConfig.media.heroProduct,
      alt: "Softique Paper Napkin 3D plastic sealed packet on dining table",
      title: "Sealed 3D Plastic Packet",
      tag: "Actual Product Photo",
      note: "Hygienic Protective Poly Packet",
    },
    dual: {
      src: siteConfig.media.heroDual,
      alt: "Softique Napkin Tissue Paper - 50 and 70 sheets packets with embossed napkins",
      title: "Pack & Napkin Presentation",
      tag: "Hospitality Display",
      note: "50 & 70 Sheets Packets with embossed napkins",
    },
  };

  const currentMedia = heroMedia[activeTab];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden bg-radial from-[#FFFFFF] via-[#FAF8F5] to-[#F3EFE7]"
    >
      {/* Background ambient luxury elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EAE2D2]/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#E2EBE0]/30 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute inset-0 paper-texture opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Origin & Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFECE4] border border-[#DCD5C8] text-[#5C5343] text-xs font-medium tracking-wider uppercase mb-6 shadow-2xs"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Rajkot, Gujarat</span>
              <span className="text-[#C8BFB0]">•</span>
              <span>Napkin Tissue Paper Manufacturing</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="editorial-title text-4xl sm:text-6xl lg:text-7xl font-semibold text-[#1C1E21] tracking-tight leading-[1.08] mb-6"
            >
              Softness in <br className="hidden sm:block" />
              <span className="italic font-normal text-[#2A313C] relative inline-block">
                Every Touch.
                <svg className="absolute left-0 -bottom-2 w-full h-2.5 text-[#C5A880]/60" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#525763] max-w-xl leading-relaxed mb-8 font-light"
            >
              {siteConfig.brand.heroSubtitle}
            </motion.p>

            {/* Key Authentic Value Props */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-10 pt-2 border-t border-[#EAE3D5]"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-[#484E59]">
                <CheckCircle2 className="w-4 h-4 text-[#0E63B8] shrink-0" />
                <span>100% Virgin Fiber Paper</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#484E59]">
                <CheckCircle2 className="w-4 h-4 text-[#0E63B8] shrink-0" />
                <span>Hygienic Plastic Packets</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#484E59]">
                <CheckCircle2 className="w-4 h-4 text-[#0E63B8] shrink-0" />
                <span>Direct Rajkot Dispatch</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <Button
                href="#product"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-md"
              >
                Explore Packaging & Product
              </Button>
              <Button
                href="#enquiry"
                variant="secondary"
                size="lg"
                icon={ArrowUpRight}
                className="w-full sm:w-auto"
              >
                Wholesale Enquiry
              </Button>
            </motion.div>

          </div>

          {/* Right Column: Authentic Packaging & Photography Showcase */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Luxury Frame Container */}
              <div className="relative rounded-3xl p-3 bg-gradient-to-b from-[#FFFFFF] via-[#FBF9F5] to-[#EDE7DB] border border-[#E3DCCE] shadow-2xl overflow-hidden group">
                
                {/* View Switcher Tabs */}
                <div className="flex items-center justify-between gap-1 p-1 mb-2 bg-[#F1EDE5] rounded-xl text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setActiveTab('package')}
                    className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center cursor-pointer ${
                      activeTab === 'package'
                        ? 'bg-white text-[#1C1E21] shadow-2xs font-semibold'
                        : 'text-[#686256] hover:text-[#1C1E21]'
                    }`}
                  >
                    Packaging Design
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('packet')}
                    className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center cursor-pointer ${
                      activeTab === 'packet'
                        ? 'bg-white text-[#1C1E21] shadow-2xs font-semibold'
                        : 'text-[#686256] hover:text-[#1C1E21]'
                    }`}
                  >
                    3D Packet
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('dual')}
                    className={`flex-1 py-1.5 px-2 rounded-lg transition-all text-center cursor-pointer ${
                      activeTab === 'dual'
                        ? 'bg-white text-[#1C1E21] shadow-2xs font-semibold'
                        : 'text-[#686256] hover:text-[#1C1E21]'
                    }`}
                  >
                    Table Display
                  </button>
                </div>

                {/* Main Image Display */}
                <div className="relative rounded-2xl overflow-hidden bg-white aspect-[4/3] flex items-center justify-center p-2">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeTab}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.3 }}
                      src={currentMedia.src}
                      alt={currentMedia.alt}
                      className="w-full h-full object-contain"
                      loading="eager"
                    />
                  </AnimatePresence>
                  
                  {/* Subtle authentic product overlay tags */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#E6E0D5] text-[11px] font-medium text-[#1C1E21] shadow-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0E63B8]"></span>
                    {currentMedia.tag}
                  </div>

                  <div className="absolute bottom-4 right-4 bg-[#1C1E21]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-medium shadow-md">
                    India's NO.1 Tissue Brand
                  </div>
                </div>

                {/* Micro caption under photo */}
                <div className="mt-3 px-2 py-1 flex items-center justify-between text-xs text-[#6F695D]">
                  <span className="font-serif italic text-sm text-[#1C1E21]">{currentMedia.title}</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#9E9585]">100% Virgin Fiber</span>
                </div>
              </div>

              {/* Decorative Luxury Accent Pill Floating */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#E8E2D6] shadow-xl max-w-xs hidden sm:block"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#F4F0E6] text-[#0E63B8]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#1C1E21]">Original Packaging Artwork</div>
                    <div className="text-[11px] text-[#636873] leading-snug mt-0.5">
                      Soft. Clean. Reliable. 100% Natural Virgin Fiber & Skin Friendly.
                    </div>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-[11px] uppercase tracking-widest text-[#9A9182]">
        <a href="#product" className="flex flex-col items-center gap-1 hover:text-[#1C1E21] transition-colors">
          <span>Explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}

