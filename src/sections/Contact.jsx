import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Mail, MapPin, Send, CheckCircle2, AlertCircle, Clock, ShieldAlert } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    contact: '',
    enquiryType: 'Wholesale Supply',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submittedState, setSubmittedState] = useState(null); // 'success' | 'client-only-notice' | null

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.contact.trim()) {
      errs.contact = 'Please enter your phone number or email address.';
    } else {
      // Basic check for either digits or email format
      const isEmail = formData.contact.includes('@');
      const isPhone = /^[0-9+\s\-()]{7,15}$/.test(formData.contact.trim());
      if (!isEmail && !isPhone) {
        errs.contact = 'Please enter a valid phone number or email address.';
      }
    }
    if (!formData.message.trim()) errs.message = 'Please provide details about your requirement.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmittedState('error');
      return;
    }

    setErrors({});
    // Honest submission state: no backend fake success
    setSubmittedState('validated');
  };

  const getDirectWhatsAppUrl = () => {
    const text = `Softique Web Enquiry:
Name: ${formData.name || 'Business Contact'}
Business: ${formData.businessName || 'N/A'}
Type: ${formData.enquiryType}
Contact: ${formData.contact || 'N/A'}
Message: ${formData.message || 'I am interested in napkin tissue paper supply.'}`;
    return `https://wa.me/${siteConfig.contact.whatsapp.number}?text=${encodeURIComponent(text)}`;
  };

  const getDirectMailtoUrl = () => {
    const subject = encodeURIComponent(`Supply Enquiry: ${formData.enquiryType} - ${formData.businessName || formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nBusiness: ${formData.businessName}\nContact: ${formData.contact}\nType: ${formData.enquiryType}\n\nMessage:\n${formData.message}`
    );
    return `mailto:${siteConfig.contact.email.value}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-[#FBFBF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Direct Contact"
          title="Connect with Softique"
          subtitle="Direct dialogue with our manufacturing team in Rajkot. Wholesalers, retailers, and commercial buyers are welcome to reach out."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8">
          
          {/* Left Column: Verified Contact Information & Facility Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="p-8 rounded-3xl bg-[#F6F4EE] border border-[#E8E2D6] shadow-sm">
              <h3 className="editorial-title text-2xl font-semibold text-[#1C1E21] mb-6">
                Direct Communication Channels
              </h3>

              <div className="space-y-6">
                
                {/* Manufacturer & Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E3DCCE] flex items-center justify-center text-[#1C1E21] shrink-0">
                    <MapPin className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#8A8275]">
                      Manufactured by
                    </div>
                    <div className="text-base font-semibold text-[#1C1E21] mt-0.5">
                      {siteConfig.brand.legalEntity}
                    </div>
                    <div className="text-sm text-[#484E59] mt-0.5 font-medium">
                      {siteConfig.contact.address}
                    </div>
                    <div className="text-xs text-[#7A7366] mt-1 leading-relaxed">
                      Napkin converting facility & ex-factory dispatch center in Rajkot, Gujarat.
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E6F5EE] border border-[#BCE4D0] flex items-center justify-center text-[#128C7E] shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#8A8275]">
                      Instant WhatsApp Channel
                    </div>
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsapp.number}?text=${encodeURIComponent(
                        siteConfig.contact.whatsapp.defaultMessage
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-[#128C7E] hover:underline mt-0.5 inline-block"
                    >
                      {siteConfig.contact.phone.display}
                    </a>
                    <div className="text-xs text-[#7A7366] mt-0.5">
                      Fastest response for pricing & sample discussions.
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E3DCCE] flex items-center justify-center text-[#1C1E21] shrink-0">
                    <Phone className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#8A8275]">
                      Phone Inquiries
                    </div>
                    <a
                      href={`tel:${siteConfig.contact.phone.value}`}
                      className="text-base font-semibold text-[#1C1E21] hover:text-[#0E63B8] mt-0.5 inline-block"
                    >
                      {siteConfig.contact.phone.display}
                    </a>
                    <div className="text-xs text-[#7A7366] mt-0.5">
                      {siteConfig.contact.businessHours}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E3DCCE] flex items-center justify-center text-[#1C1E21] shrink-0">
                    <Mail className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#8A8275]">
                      Email Enquiries
                    </div>
                    <a
                      href={`mailto:${siteConfig.contact.email.value}`}
                      className="text-base font-semibold text-[#1C1E21] hover:text-[#0E63B8] mt-0.5 inline-block"
                    >
                      {siteConfig.contact.email.display}
                    </a>
                    <div className="text-xs text-[#7A7366] mt-0.5">
                      Formal RFQs, vendor registration, and purchase orders.
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Verified Manufacturer Badge */}
            <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#166534] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#14532D]">Verified Manufacturing Unit:</span> Manufactured by <strong>JM ENTERPRISE</strong>, Kothariya Chokdi, Rajkot - 360022, Gujarat. Direct unit supply with genuine pricing and transparent fulfillment.
              </div>
            </div>

          </div>

          {/* Right Column: Transparent Contact & Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E8E2D6] shadow-xl">
              
              <h3 className="editorial-title text-2xl sm:text-3xl font-semibold text-[#1C1E21] mb-2">
                Send an Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-[#6C7380] mb-8">
                Fill in your details below. You can also send this inquiry directly via WhatsApp or email for instant turnaround.
              </p>

              {submittedState === 'validated' ? (
                <div className="p-6 rounded-2xl bg-[#F0FAF3] border border-[#BCE8CB] text-left">
                  <div className="flex items-center gap-3 mb-3 text-[#18794E]">
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <h4 className="font-serif text-xl font-semibold">
                      Your Details Have Been Validated!
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#275338] leading-relaxed mb-6">
                    Because this frontend runs securely without an external database or tracking backend, your enquiry is ready to send through your preferred direct channel:
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={getDirectWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-5 rounded-xl bg-[#128C7E] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#075E54] shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Forward Directly to Softique WhatsApp
                    </a>

                    <a
                      href={getDirectMailtoUrl()}
                      className="py-3 px-5 rounded-xl bg-[#1C1E21] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#2F343B] shadow-sm"
                    >
                      <Mail className="w-4 h-4" />
                      Send via Email Client
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmittedState(null)}
                    className="mt-4 text-xs text-[#527863] underline cursor-pointer"
                  >
                    Edit your message details
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#484E59] mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Patel"
                        className={`w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] text-sm text-[#1C1E21] focus:bg-white transition-all ${
                          errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-[#DDD7CB] focus:border-[#1C1E21]'
                        }`}
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    {/* Business Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#484E59] mb-1.5">
                        Business / Firm Name <span className="text-[#8C8476] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Saurashtra Traders"
                        className="w-full px-4 py-3 rounded-xl border border-[#DDD7CB] bg-[#FAF8F5] text-sm text-[#1C1E21] focus:bg-white focus:border-[#1C1E21] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Contact (Phone or Email) */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#484E59] mb-1.5">
                        Phone or Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="Phone or business email"
                        className={`w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] text-sm text-[#1C1E21] focus:bg-white transition-all ${
                          errors.contact ? 'border-red-500 ring-1 ring-red-500' : 'border-[#DDD7CB] focus:border-[#1C1E21]'
                        }`}
                      />
                      {errors.contact && <p className="text-xs text-red-500 mt-1">{errors.contact}</p>}
                    </div>

                    {/* Enquiry Type */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#484E59] mb-1.5">
                        Enquiry Type
                      </label>
                      <select
                        value={formData.enquiryType}
                        onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#DDD7CB] bg-[#FAF8F5] text-sm text-[#1C1E21] focus:bg-white focus:border-[#1C1E21] transition-all cursor-pointer"
                      >
                        <option value="Wholesale Supply">Wholesale Supply (500+ Packs)</option>
                        <option value="Retail Stocking">Retail Store Stocking</option>
                        <option value="Cafe / Restaurant Supply">Cafe / Restaurant Supply</option>
                        <option value="Distribution Partnership">Regional Distribution</option>
                        <option value="Other">Other Query</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#484E59] mb-1.5">
                      Your Requirements or Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please mention desired pack counts, expected order frequency, or questions..."
                      className={`w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] text-sm text-[#1C1E21] focus:bg-white transition-all ${
                        errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-[#DDD7CB] focus:border-[#1C1E21]'
                      }`}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl font-medium text-sm text-white bg-[#1C1E21] hover:bg-[#2F343B] flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      Validate & Prepare Enquiry
                    </button>
                    
                    <p className="text-center text-[11px] text-[#8C8476] mt-3">
                      Transparent communication guarantee: No spam or automated solicitation.
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

