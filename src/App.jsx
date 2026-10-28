import React from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import ProductShowcase from './sections/ProductShowcase';
import WhySoftique from './sections/WhySoftique';
import Manufacturing from './sections/Manufacturing';
import About from './sections/About';
import WholesaleEnquiry from './sections/WholesaleEnquiry';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#1C1E21] selection:bg-[#EAE2D2] selection:text-[#1C1E21] overflow-x-hidden">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-grow">
          {/* A & B. Cinematic Hero Section */}
          <Hero />

          {/* C. Featured Product: Napkin Tissue Paper */}
          <ProductShowcase />

          {/* D. Why Softique / Brand Priorities */}
          <WhySoftique />

          {/* E. Manufacturing & Packing Process (Cinematic Dark Panel) */}
          <Manufacturing />

          {/* F. About Softique */}
          <About />

          {/* G. Wholesale and Retail Enquiry */}
          <WholesaleEnquiry />

          {/* H. Contact Section */}
          <Contact />
        </main>

        {/* I. Footer */}
        <Footer />
      </div>
    </MotionConfig>
  );
}
