import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Store, Coffee, Truck, MessageSquare, ArrowRight, Check, Calculator, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';

export default function WholesaleEnquiry() {
  const [selectedAudience, setSelectedAudience] = useState('Wholesalers & Stockists');
  const [packType, setPackType] = useState('50-sheets'); // '50-sheets' | '70-sheets' | 'both'
  const [packetQty, setPacketQty] = useState(500); // MOQ is 500

  const audiences = [
    {
      id: 'wholesale',
      title: 'Wholesalers & Stockists',
      icon: Building2,
      desc: 'Bulk carton quantities, volume tiers, and steady delivery schedules from Rajkot.',
      moq: '500+ Packs',
    },
    {
      id: 'retail',
      title: 'Retailers & Supermarkets',
      icon: Store,
      desc: 'Consumer-ready 50 & 70 sheet plastic packets that present cleanly on grocery shelves.',
      moq: 'Carton batches',
    },
    {
      id: 'hospitality',
      title: 'Cafes & Dining Venues',
      icon: Coffee,
      desc: 'Soft, hygienic embossed paper napkins for daily restaurant and catering service.',
      moq: 'Regular supply',
    },
    {
      id: 'distribution',
      title: 'Regional Distributors',
      icon: Truck,
      desc: 'Partnership opportunities for dedicated distribution across Gujarat and nearby districts.',
      moq: 'Scheduled runs',
    },
  ];

  // Calculate indicative estimate based on confirmed base pricing
  const unitRate = packType === '50-sheets' ? 12.50 : packType === '70-sheets' ? 16.50 : 14.50;
  const estimatedTotal = Math.round(packetQty * unitRate);

  const getWhatsAppEnquiryUrl = () => {
    const text = `Hello Softique Team,
I am contacting you from ${selectedAudience}.
I would like to discuss supply for:
- Product: Softique Napkin Tissue Paper
- Pack Variant: ${packType === '50-sheets' ? '50 Sheets Pack' : packType === '70-sheets' ? '70 Sheets Pack' : 'Mixed Packets'}
- Estimated Quantity: ${packetQty} packets
Please provide ex-factory Rajkot quotation and dispatch availability.`;
    return `https://wa.me/${siteConfig.contact.whatsapp.number}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="enquiry" className="py-20 lg:py-32 bg-[#F6F4EE] border-t border-[#EAE3D5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Supply Partnerships"
          title="Let’s Build a Better Supply Partnership."
          subtitle="Whether you manage wholesale FMCG distribution, a retail chain, or high-volume dining, we welcome direct discussions on napkin tissue supply."
        />

        {/* Intended Customer Segment Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {audiences.map((aud) => {
            const Icon = aud.icon;
            const isSelected = selectedAudience === aud.title;
            return (
              <div
                key={aud.title}
                onClick={() => setSelectedAudience(aud.title)}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#1C1E21] shadow-md ring-1 ring-[#1C1E21]'
                    : 'bg-[#FAF8F3] border-[#E3DC CE] hover:bg-white hover:border-[#C5A880]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#1C1E21] text-white' : 'bg-[#EAE4D7] text-[#1C1E21]'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8275] bg-[#EFECE4] px-2 py-0.5 rounded">
                    {aud.moq}
                  </span>
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#1C1E21] mb-1">
                  {aud.title}
                </h4>
                <p className="text-xs text-[#5C616B] leading-relaxed">
                  {aud.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Volume & WhatsApp Supply Planner Card */}
        <div className="rounded-3xl bg-white border border-[#E3DC CE] p-6 sm:p-10 shadow-xl max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#F0ECE1]">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8E7A5A] uppercase tracking-wider">
                <Calculator className="w-4 h-4" />
                <span>Direct Supply Planner</span>
              </span>
              <h3 className="editorial-title text-2xl sm:text-3xl font-semibold text-[#1C1E21] mt-1">
                Configure Your Supply Requirement
              </h3>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-[#EAF2FC] text-[#0E63B8] text-xs font-medium border border-[#CDE1F8]">
              Target: {selectedAudience}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Left Config Controls */}
            <div className="flex flex-col gap-6">
              
              {/* Pack Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#525763] mb-2">
                  Select Pack Variant
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '50-sheets', label: '50 Sheets', rate: '₹12.50/pk' },
                    { id: '70-sheets', label: '70 Sheets', rate: '₹16.50/pk' },
                    { id: 'both', label: 'Combined', rate: 'Custom' },
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setPackType(v.id)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        packType === v.id
                          ? 'bg-[#1C1E21] text-white border-[#1C1E21] shadow-xs'
                          : 'bg-[#FAF8F5] text-[#1C1E21] border-[#E5DFD4] hover:border-[#C5A880]'
                      }`}
                    >
                      <div className="font-semibold">{v.label}</div>
                      <div className={`text-[10px] ${packType === v.id ? 'text-[#C5A880]' : 'text-[#8A8275]'}`}>
                        {v.rate}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Preset Buttons */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#525763]">
                    Order Quantity (Packets)
                  </label>
                  <span className="text-xs font-semibold text-[#0E63B8]">
                    MOQ: 500 Packets
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[500, 1000, 2500, 5000].map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setPacketQty(qty)}
                      className={`py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        packetQty === qty
                          ? 'bg-[#0E63B8] text-white border-[#0E63B8]'
                          : 'bg-[#FAF8F5] text-[#1C1E21] border-[#E5DFD4] hover:bg-[#F2EFE8]'
                      }`}
                    >
                      {qty.toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Custom Quantity Slider */}
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="250"
                  value={packetQty}
                  onChange={(e) => setPacketQty(Number(e.target.value))}
                  className="w-full accent-[#0E63B8] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#8C8476] mt-1 font-mono">
                  <span>500 (Minimum)</span>
                  <span className="font-semibold text-[#1C1E21]">{packetQty.toLocaleString()} Packets Selected</span>
                  <span>10,000+</span>
                </div>
              </div>

              {/* Verified Details Notice */}
              <div className="text-[11px] text-[#7A7366] bg-[#FAF8F5] p-3 rounded-xl border border-[#EBE4D7] leading-relaxed">
                * Indicative base rate ex-factory Rajkot. Transportation, taxes, and custom volume discounts are calculated directly upon discussion.
              </div>

            </div>

            {/* Right Summary & Immediate Action */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E8E2D6] flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#8A8275]">
                  Summary Preview
                </span>

                <div className="mt-4 space-y-2.5 text-xs text-[#525763]">
                  <div className="flex justify-between py-1 border-b border-[#EAE4D7]">
                    <span>Product:</span>
                    <span className="font-semibold text-[#1C1E21]">Softique Napkin Tissue</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EAE4D7]">
                    <span>Packaging:</span>
                    <span className="font-semibold text-[#1C1E21]">Hygienic Plastic Packet</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EAE4D7]">
                    <span>Variant:</span>
                    <span className="font-semibold text-[#1C1E21]">
                      {packType === '50-sheets' ? '50 Sheets (₹12.50)' : packType === '70-sheets' ? '70 Sheets (₹16.50)' : 'Custom Mix'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EAE4D7]">
                    <span>Volume:</span>
                    <span className="font-semibold text-[#1C1E21]">{packetQty.toLocaleString()} Packets</span>
                  </div>
                  <div className="flex justify-between py-1.5 text-sm font-semibold text-[#1C1E21]">
                    <span>Est. Ex-Factory Total:</span>
                    <span className="text-base font-serif text-[#0E63B8]">
                      ₹{estimatedTotal.toLocaleString('en-IN')}*
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={getWhatsAppEnquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl text-center text-sm font-medium text-white bg-[#128C7E] hover:bg-[#075E54] flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4" />
                  Discuss via WhatsApp Now
                </a>

                <Button
                  href="#contact"
                  variant="outline"
                  size="md"
                  className="w-full justify-center text-xs"
                >
                  Submit Enquiry via Email (SMTP)
                </Button>

                <p className="text-[11px] text-center text-[#8C8476]">
                  Direct communication with Softique's operating unit in Rajkot.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

