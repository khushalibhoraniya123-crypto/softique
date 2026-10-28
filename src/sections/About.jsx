import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Target, Sparkles, Handshake, ShieldCheck, Heart } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-[#FBFBF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Composition with authentic product details */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-3 bg-[#F2EDE2] border border-[#DFD8CB] shadow-xl">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white flex items-center justify-center p-2">
                <img
                  src={siteConfig.media.heroProduct}
                  alt="Softique Napkin Tissue Paper - Rajkot Gujarat"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              {/* Floating city pill */}
              <div className="mt-3 px-3 py-2 bg-white rounded-xl border border-[#E5DFD3] flex items-center justify-between text-xs text-[#5C5547]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C5A880]" />
                  <span className="font-semibold text-[#1C1E21]">Kothariya Chokdi, Rajkot</span>
                </div>
                <span className="text-[11px] text-[#8C8476] uppercase tracking-wider">
                  JM ENTERPRISE
                </span>
              </div>
            </div>

            {/* Ethos Quote Card */}
            <div className="mt-6 p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8E2D6] shadow-sm">
              <p className="editorial-title text-xl text-[#1C1E21] italic leading-snug">
                “We start with one machine and one core product because we choose to do one thing exceptionally well.”
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E9585]">
                <span className="w-2 h-[1px] bg-[#C5A880]" />
                <span>Softique Founding Ethos</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase mb-4 bg-[#EFECE4] text-[#6E6350] border border-[#E3DCCE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
              About Our Company
            </div>

            <h2 className="editorial-title text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1C1E21] leading-[1.15] mb-6">
              A Thoughtful Start. <br />
              <span className="italic font-normal">A Softer Everyday.</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#525763] leading-relaxed font-light mb-8">
              <p>
                {siteConfig.brand.summary}
              </p>
              <p className="text-sm sm:text-base text-[#686F7C]">
                Operating out of the bustling industrial epicenter of Rajkot, we understand that wholesale buyers and retail businesses prize two things above all: dependable supply schedules and consistent product quality that protects their own reputation.
              </p>
              <p className="text-sm sm:text-base text-[#686F7C]">
                By concentrating our production strictly on high-demand napkin tissue paper packed in hygienic plastic packets, we keep our operations lean, responsive, and personally accountable to every trading partner.
              </p>
            </div>

            {/* Core Values Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8 pt-4 border-t border-[#EAE3D5]">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#EAE3D5]">
                <ShieldCheck className="w-5 h-5 text-[#0E63B8] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1C1E21]">Honest Specifications</h4>
                  <p className="text-xs text-[#636873] mt-0.5">We share verified counts, real ply layers, and clear pricing upfront.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#EAE3D5]">
                <Handshake className="w-5 h-5 text-[#0E63B8] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1C1E21]">Direct Factory Access</h4>
                  <p className="text-xs text-[#636873] mt-0.5">Communicate directly with our Rajkot unit without intermediaries.</p>
                </div>
              </div>
            </div>

            <Button
              href="#enquiry"
              variant="primary"
              size="md"
            >
              Start a Conversation
            </Button>

          </div>

        </div>

      </div>
    </section>
  );
}

