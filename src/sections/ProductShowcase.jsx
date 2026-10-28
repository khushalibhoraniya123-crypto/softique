import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Eye, Sparkles, Layers, Box, Tag, ArrowUpRight, HelpCircle, Info } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';

export default function ProductShowcase() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showPendingSpecs, setShowPendingSpecs] = useState(false);

  const productImages = [
    {
      title: 'Dual Packet Display',
      subtitle: '50 & 70 Sheets Packets with embossed napkin stack',
      src: siteConfig.media.heroDual,
      badge: 'Actual Product Shot',
    },
    {
      title: 'Dining Table Setting',
      subtitle: 'Real Softique packet in everyday hospitality presentation',
      src: siteConfig.media.heroProduct,
      badge: 'Hospitality Context',
    },
    {
      title: 'Embossed Paper Texture',
      subtitle: 'Close-up detail of virgin fiber texture & border embossing',
      src: siteConfig.media.productDetail,
      badge: 'Macro Detail',
    },
  ];

  const confirmedSpecs = siteConfig.product.specifications.filter((s) => s.confirmed);
  const pendingSpecs = siteConfig.product.specifications.filter((s) => !s.confirmed);

  return (
    <section id="product" className="py-20 lg:py-32 bg-[#FBFBF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          badge="Featured Offering"
          title="Softique Napkin Tissue Paper"
          subtitle="Our dedicated flagship product: 1-ply virgin paper napkins packed in protective plastic packets for everyday retail and wholesale dining supply."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8">
          
          {/* Left Column: Interactive Authentic Photography Showcase */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Main Stage Image Viewer */}
            <div className="relative rounded-3xl bg-white border border-[#E8E2D6] p-4 shadow-xl overflow-hidden aspect-[4/3] flex items-center justify-center">
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={productImages[activeImageIndex].src}
                alt={productImages[activeImageIndex].title}
                className="w-full h-full object-contain"
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#E2DBD0] text-xs font-medium text-[#1C1E21] shadow-2xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0E63B8]" />
                {productImages[activeImageIndex].badge}
              </div>

              {/* Caption pill */}
              <div className="absolute bottom-4 inset-x-4 bg-[#1C1E21]/80 backdrop-blur-md text-white text-xs px-4 py-2 rounded-xl text-center shadow-md">
                {productImages[activeImageIndex].subtitle}
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-3 gap-3">
              {productImages.map((img, idx) => (
                <button
                  key={img.title}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative rounded-xl p-2 bg-white border text-left transition-all duration-200 cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#0E63B8] ring-2 ring-[#0E63B8]/20 shadow-sm'
                      : 'border-[#E5DFD4] hover:border-[#C5A880] opacity-80'
                  }`}
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#FAF8F5] mb-1.5 flex items-center justify-center">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="block text-[11px] font-semibold text-[#1C1E21] truncate">
                    {img.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Packaging Guarantee Note */}
            <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-[#EAE3D5] text-xs text-[#525763] flex items-start gap-3 mt-2">
              <ShieldCheck className="w-5 h-5 text-[#0E63B8] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#1C1E21]">Authentic Packaging Guarantee:</span> We display actual photographs of our manufactured plastic packets. No fake labels or fictional 3D renders.
              </div>
            </div>

          </div>

          {/* Right Column: Product Narrative, Confirmed Specifications & Actions */}
          <div className="lg:col-span-6 flex flex-col">
            
            {/* Product Meta Header */}
            <div className="border-b border-[#EAE3D5] pb-6 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#8C8271]">
                  Single Dedicated Product Line
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF2FC] text-[#0E63B8] border border-[#CDE1F8]">
                  Packaging: Plastic Packet
                </span>
              </div>
              <h3 className="editorial-title text-3xl sm:text-4xl font-semibold text-[#1C1E21] mb-3">
                {siteConfig.product.name}
              </h3>
              <p className="text-base text-[#525763] leading-relaxed">
                {siteConfig.product.description}
              </p>
            </div>

            {/* Specifications Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#1C1E21] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#C5A880]" />
                  Product Specifications
                </h4>

                {/* Owner review toggle */}
                <button
                  type="button"
                  onClick={() => setShowPendingSpecs(!showPendingSpecs)}
                  className="text-xs text-[#8A8275] hover:text-[#1C1E21] underline flex items-center gap-1 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>{showPendingSpecs ? 'Hide Unconfirmed Fields' : 'Owner Spec Review Mode'}</span>
                </button>
              </div>

              {/* Confirmed Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {confirmedSpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-3.5 rounded-xl bg-white border border-[#EAE3D5] shadow-2xs hover:border-[#D6CEBE] transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs text-[#7A7366] mb-1">
                      <span>{spec.label}</span>
                      <span className="inline-flex items-center text-[10px] font-semibold text-[#18794E] bg-[#E6F4EA] px-1.5 py-0.5 rounded">
                        Verified
                      </span>
                    </div>
                    <div className="text-base font-semibold text-[#1C1E21] font-sans">
                      {spec.value}
                    </div>
                    <div className="text-[11px] text-[#8C8476] mt-0.5">
                      {spec.note}
                    </div>
                  </div>
                ))}

                {/* Pending Confirmation Specifications (Shown only if toggled or in review mode) */}
                {showPendingSpecs &&
                  pendingSpecs.map((spec) => (
                    <div
                      key={spec.label}
                      className="p-3.5 rounded-xl bg-[#FFFBF0] border border-[#F3DEB0] border-dashed"
                    >
                      <div className="flex items-center justify-between text-xs text-[#9E6A1B] mb-1">
                        <span>{spec.label}</span>
                        <span className="inline-flex items-center text-[10px] font-semibold text-[#9E6A1B] bg-[#FEF3D6] px-1.5 py-0.5 rounded">
                          Owner to Confirm
                        </span>
                      </div>
                      <div className="text-sm font-medium text-[#7C5314] italic">
                        {spec.value}
                      </div>
                      <div className="text-[11px] text-[#A67527] mt-0.5">
                        {spec.note}
                      </div>
                    </div>
                  ))}
              </div>

              {!showPendingSpecs && pendingSpecs.length > 0 && (
                <p className="text-[11px] text-[#9A9182] italic mt-2.5">
                  * All published specifications are verified against packaging. Unconfirmed secondary metrics (such as carton weight) are awaiting final scale verification.
                </p>
              )}
            </div>

            {/* Key Quality Pillars */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {siteConfig.product.features.slice(0, 4).map((f) => (
                <div key={f.title} className="p-3 rounded-xl bg-[#FAF8F3] border border-[#EBE4D7]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1E21] mb-1">
                    <Check className="w-3.5 h-3.5 text-[#0E63B8]" />
                    <span>{f.title}</span>
                  </div>
                  <p className="text-[11px] text-[#636873] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#EAE3D5]">
              <Button
                href="#enquiry"
                variant="primary"
                size="md"
                icon={ArrowUpRight}
                className="flex-1 min-w-[200px]"
              >
                Wholesale Enquiry
              </Button>
              <Button
                href="#contact"
                variant="outline"
                size="md"
                className="flex-1 min-w-[180px]"
              >
                Request Product Details
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
