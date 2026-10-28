import React from 'react';
import { motion } from 'framer-motion';
import { Package, HeartHandshake, Eye, MessageSquareText, Shield, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import SectionHeading from '../components/SectionHeading';

export default function WhySoftique() {
  const icons = [Eye, HeartHandshake, Package, MessageSquareText];

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-[#F5F2EA] relative border-y border-[#EAE3D5]">
      {/* Subtle organic background lines */}
      <div className="absolute inset-0 paper-texture opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          badge="Our Commitments"
          title="Care in Every Packet. Honesty in Every Deal."
          subtitle="As a growing manufacturing business in Rajkot, we believe in clarity, consistent daily utility, and personal accountability."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {siteConfig.priorities.map((item, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-luxury p-6 sm:p-8 rounded-2xl flex flex-col justify-between h-full bg-white relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E2D6] flex items-center justify-center text-[#1C1E21] group-hover:bg-[#1C1E21] group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E9585]">
                      0{index + 1}
                    </span>
                  </div>

                  <span className="inline-block text-xs font-semibold text-[#8E7A5A] uppercase tracking-wider mb-2">
                    {item.accent}
                  </span>

                  <h3 className="editorial-title text-2xl font-semibold text-[#1C1E21] mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#5C616B] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F2ECE1] flex items-center text-xs font-medium text-[#1C1E21]">
                  <span>Softique Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Brand Truth Disclaimer Footnote */}
        <div className="mt-12 text-center">
          <p className="inline-flex items-center gap-2 text-xs text-[#7A7366] bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-[#E3DC CE]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#18794E]"></span>
            <span>These principles reflect our active operating standards and verified business priorities.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
