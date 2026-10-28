import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cog, CheckCircle2, AlertCircle, FileText, Upload, Sparkles, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';

export default function Manufacturing() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-20 lg:py-32 bg-[#12151A] text-[#FAF8F5] relative overflow-hidden">
      {/* Background dark cinematic gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#1E2838]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#2A2318]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Dark Heading */}
        <SectionHeading
          badge="Production Setup & Process"
          title="Focused Manufacturing. Controlled Quality."
          subtitle={siteConfig.manufacturing.subheadline}
          dark={true}
        />

        {/* 1-Machine Dedicated Facility Context Banner */}
        <div className="max-w-3xl mx-auto mb-16 p-5 rounded-2xl bg-[#1A1F27] border border-[#2B3442] shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-[#252E3B] text-[#D8C7A5] shrink-0">
              <Cog className="w-5 h-5 animate-[spin_10s_linear_infinite]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-white">Single-Machine Dedicated Operation</span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#2E3B4E] text-[#86A8D6] font-medium">
                  Verified Facility Context
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#A0AAB8] leading-relaxed">
                {siteConfig.manufacturing.unitSummary}
              </p>
            </div>
          </div>
        </div>

        {/* Machine Visual & Process Timeline Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Machine Visual & Owner Photo Status */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative rounded-3xl overflow-hidden bg-[#181D24] border border-[#2F3746] shadow-2xl p-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0F1216] flex items-center justify-center">
                <img
                  src={siteConfig.manufacturing.machinePhotoPath}
                  alt="Softique Napkin Converting Machine Setup in Rajkot"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to placeholder if file path ever misses
                    e.currentTarget.src = '/images/softique-machine.webp';
                  }}
                />

                {/* Status tag */}
                <div className="absolute top-4 left-4 bg-[#12151A]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#303847] text-xs text-[#D8C7A5] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span>Converting Machine 01 • Rajkot Unit</span>
                </div>
              </div>

              {/* Caption & Owner Instructions */}
              <div className="mt-3 p-3 rounded-xl bg-[#1D232C] border border-[#2B3341] text-xs text-[#8A95A6]">
                <div className="flex items-center justify-between font-medium text-white mb-1">
                  <span>Authentic Machine Showcase</span>
                  <span className="text-[#C5A880] text-[11px]">Rajkot Facility</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#A4B0C2]">
                  {siteConfig.manufacturing.isMachinePhotoPlaceholder
                    ? 'Owner note: The schematic above serves as an honest asset placeholder. Replace public/images/softique-machine.webp with your machine workshop photo.'
                    : 'Actual photograph of Softique converting machinery in active operation.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Step-by-Step Interactive Workflow */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Step-by-Step Production Sequence</span>
            </div>

            <div className="flex flex-col gap-3">
              {siteConfig.manufacturing.steps.map((step, idx) => (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                    activeStep === idx
                      ? 'bg-[#1E2530] border-[#C5A880] shadow-lg'
                      : 'bg-[#161A21] border-[#262E3B] hover:border-[#384355] opacity-80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-mono font-semibold px-2 py-0.5 rounded-md ${
                        activeStep === idx
                          ? 'bg-[#C5A880] text-[#12151A]'
                          : 'bg-[#252C38] text-[#8C98AA]'
                      }`}>
                        {step.number}
                      </span>
                      <h4 className="text-base sm:text-lg font-medium text-white">
                        {step.title}
                      </h4>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#252D3A] text-[#9FB0C8] whitespace-nowrap">
                      {step.status}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#9BA8BA] mt-2.5 leading-relaxed pl-10">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#252C38] flex items-center justify-between">
              <span className="text-xs text-[#7B8798]">
                Every step is overseen directly by the Softique operating team.
              </span>
              <Button
                href="#enquiry"
                variant="dark"
                size="sm"
                icon={ArrowRight}
              >
                Discuss Supply
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

