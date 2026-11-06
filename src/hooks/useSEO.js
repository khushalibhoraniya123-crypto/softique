import { useEffect } from 'react';

/**
 * useSEO Hook
 * Automatically manages page titles, meta descriptions, and canonical URL hashes
 * based on the active in-view section (Home, Products, Process, About Us, Enquiry, Contact).
 */
export function useSEO() {
  useEffect(() => {
    const sectionMetadata = {
      hero: {
        title: "Softique — Premium Paper Napkins & Tissue Paper Manufacturer | Rajkot",
        description: "Softique is a premium paper napkin and tissue paper brand manufactured by JM ENTERPRISE at Kothariya Chokdi, Rajkot, Gujarat. Supplying soft, clean, embossed 1-ply disposable paper napkins in hygienic plastic packets.",
      },
      product: {
        title: "Softique Paper Napkins — 1-Ply Virgin Fiber Disposable Tissue Paper | Products",
        description: "Explore Softique 1-ply premium disposable paper napkins made with 100% natural virgin fiber, perimeter embossing, and hygienic plastic packets for wholesale and dining.",
      },
      process: {
        title: "Napkin Converting Machine & Factory Process — Softique Rajkot Facility",
        description: "Watch our authentic single-machine napkin converting operation in Rajkot, Gujarat: precision paper feeding, border embossing, and automated quarter-fold converting.",
      },
      'why-us': {
        title: "Why Softique — Verified Specifications & Direct Factory Supply | Rajkot",
        description: "Discover our verified manufacturing commitments: honest sheet specifications, responsive local dispatch from Rajkot, and hygienic plastic packet sealing.",
      },
      about: {
        title: "About Softique & JM Enterprise — Paper Napkin Manufacturing Ethos | Rajkot",
        description: "Softique is manufactured by JM ENTERPRISE at Kothariya Chokdi, Rajkot. Learn our founding ethos: focused manufacturing, controlled quality, and dependable partnerships.",
      },
      enquiry: {
        title: "Wholesale & Bulk Paper Napkin Supply Enquiry — Softique Rajkot",
        description: "Request wholesale and bulk supply pricing for Softique paper napkins directly from our Rajkot factory unit. Reliable dispatch for stockists, retailers, and caterers.",
      },
      contact: {
        title: "Contact JM Enterprise — Softique Paper Napkin Factory, Rajkot Gujarat",
        description: "Get in touch with JM ENTERPRISE at Kothariya Chokdi, Rajkot - 360022, Gujarat. Call +91 93136 02929 or email jmenterprise.softique@gmail.com for inquiries.",
      },
    };

    const sectionIds = Object.keys(sectionMetadata);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    let currentSectionId = 'hero';

    const updateMeta = (id) => {
      if (id === currentSectionId && document.title === sectionMetadata[id]?.title) return;
      currentSectionId = id;
      const data = sectionMetadata[id];
      if (!data) return;

      document.title = data.title;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', data.description);
      }

      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', data.title);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', data.description);

      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute(
          'href',
          id === 'hero' ? 'https://softique.co.in/' : `https://softique.co.in/#${id}`
        );
      }
    };

    // Also listen to hash changes directly
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (sectionMetadata[hash]) {
        updateMeta(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash) {
      handleHashChange();
    }

    // IntersectionObserver to observe which section is currently in view
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the intersecting section with highest visible ratio
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          updateMeta(visibleEntries[0].target.id);
        }
      },
      {
        threshold: [0.1, 0.25, 0.5],
        rootMargin: '-10% 0px -20% 0px',
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
}
