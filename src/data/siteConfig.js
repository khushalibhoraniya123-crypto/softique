/**
 * Softique Website Configuration & Brand Truth Center
 * 
 * All business details, product specifications, contact information,
 * and asset paths are centralized here for easy editing by the business owner.
 */

export const siteConfig = {
  brand: {
    name: "Softique",
    legalEntity: "JM Enterprise", // As displayed on authentic packaging posters
    tagline: "Softness in Every Touch.",
    heroSubtitle: "Napkin tissue paper for everyday use, with a focus on thoughtful presentation and dependable business communication.",
    foundedLocation: "Rajkot, Gujarat, India",
    establishedYear: 2026,
    stage: "Newly Started Manufacturing Unit",
    summary: "Based in Rajkot, Gujarat, Softique is a growing tissue-paper business starting with napkin tissue paper. We aim to build lasting business relationships through thoughtful product presentation, clear communication, and attention to the details that matter to our customers.",
  },

  contact: {
    city: "Rajkot",
    state: "Gujarat",
    country: "India",
    // Detailed physical unit address - to be updated once owner approves exact public dispatch address
    address: "Rajkot, Gujarat, India",
    addressStatus: "pending_exact_address", // 'confirmed' | 'pending_exact_address'
    
    // Contact endpoints - editable placeholders
    phone: {
      display: "+91 98798 95764", // Configurable verified business line
      value: "+919879895764",
      status: "verified_owner_contact",
    },
    whatsapp: {
      number: "919879895764", // Direct international format without '+'
      display: "+91 98798 95764",
      defaultMessage: "Hello Softique team, I am interested in wholesale napkin tissue paper supply for my business. Please share details.",
      status: "verified_owner_contact",
    },
    email: {
      display: "supply@softique.in",
      value: "supply@softique.in",
      status: "configured_placeholder", // Owner can update to custom domain or gmail
    },
    businessHours: "Monday to Saturday, 9:00 AM – 7:00 PM IST",
  },

  product: {
    name: "Softique Napkin Tissue Paper",
    category: "Napkin Tissue Paper",
    packagingType: "Hygienic Plastic Packet",
    description: "Thoughtfully crafted paper napkins made from natural virgin fiber, embossed for gentle absorption and packed in clean plastic packets to preserve freshness for everyday hospitality, dining, and retail use.",
    
    // Confirmed specifications from official packaging
    specifications: [
      {
        label: "Ply / Layers",
        value: "1 Ply",
        confirmed: true,
        note: "Single ply soft virgin fiber layer",
      },
      {
        label: "Sheet Dimensions",
        value: "27 cm × 30 cm",
        confirmed: true,
        note: "Standard catering & dining napkin size",
      },
      {
        label: "Available Pack Options",
        value: "50 Sheets & 70 Sheets Packets",
        confirmed: true,
        note: "Compact retail & bulk hospitality packs",
      },
      {
        label: "Packaging Material",
        value: "Protective Poly Packet",
        confirmed: true,
        note: "Sealed against dust, humidity, and handling",
      },
      {
        label: "Minimum Order Quantity (MOQ)",
        value: "500 Packets",
        confirmed: true,
        note: "Wholesale carton fulfillment benchmark",
      },
      {
        label: "Indicative Wholesale Price",
        value: "50s: ₹12.50/pack | 70s: ₹16.50/pack",
        confirmed: true,
        note: "Ex-factory Rajkot; final quotes based on volume",
      },
      {
        label: "Packet Weight",
        value: "[Confirm with owner]",
        confirmed: false,
        note: "Exact net weight awaiting final packaging scale verification",
      },
      {
        label: "Carton Quantity",
        value: "[Confirm with owner]",
        confirmed: false,
        note: "Packs per corrugated shipper box",
      },
    ],

    features: [
      {
        title: "100% Natural Virgin Fiber",
        desc: "Derived from clean virgin pulp for reliable softness, skin safety, and zero chemical harshness.",
      },
      {
        title: "Embossed Absorbency",
        desc: "Distinctive border embossing increases tactile grip, structural integrity, and liquid absorption.",
      },
      {
        title: "Hygienic Plastic Packaging",
        desc: "Sealed tightly in moisture-resistant plastic packets for clean transport, storage, and shelf presentation.",
      },
      {
        title: "Dependable Daily Supply",
        desc: "Engineered specifically for cafes, restaurants, caterers, and retail shop owners who need consistency.",
      },
    ],
  },

  manufacturing: {
    headline: "Our Production Setup",
    subheadline: "Honest, focused manufacturing with dedicated napkin converting machinery in Rajkot.",
    unitSummary: "Softique currently operates one high-precision napkin converting machine. Rather than overextending across multiple lines, our single-line focus ensures hands-on attention to folding precision, clean embossing, and tight packet sealing on every run.",
    isMachinePhotoPlaceholder: true, // Set to false once the owner uploads actual workshop photo
    machinePhotoPath: "/images/softique-machine.jpg",
    machinePlaceholderNote: "Photo placeholder active. Owner can place the actual machine photo at public/images/softique-machine.jpg.",
    
    // Truthful, editable step-by-step workflow
    steps: [
      {
        number: "01",
        title: "Virgin Paper Roll Sourcing",
        desc: "We select responsibly sourced virgin tissue jumbo rolls with optimal softness, tensile strength, and brightness.",
        status: "Active Workflow",
      },
      {
        number: "02",
        title: "Embossing & Converting",
        desc: "Paper runs through our dedicated napkin machine where uniform perimeter embossing and crisp quarter-folding take place.",
        status: "In-House Machine Process",
      },
      {
        number: "03",
        title: "Visual Quality Checks",
        desc: "Continuous manual and visual monitoring checks sheet alignment, clean cuts, count accuracy, and paper cleanliness.",
        status: "Rigorous Batch Check",
      },
      {
        number: "04",
        title: "Plastic Packet Sealing",
        desc: "Folded napkins are neatly packed in protective 50 or 70 sheet plastic packets and sealed to preserve hygiene.",
        status: "Clean Packaging",
      },
      {
        number: "05",
        title: "Dispatch from Rajkot",
        desc: "Packed cartons are prepared for prompt dispatch to wholesale traders, distributors, and retail partners across Gujarat.",
        status: "Local Dispatch Hub",
      },
    ],
  },

  priorities: [
    {
      title: "Product Presentation",
      description: "Every packet is packed cleanly and consistently, so retailers and hospitality venues feel proud putting it on their shelves or tables.",
      accent: "Visual Integrity",
    },
    {
      title: "Everyday Usability",
      description: "Engineered to balance skin-friendly gentleness with practical liquid absorption for daily meal, snack, and hospitality use.",
      accent: "Balanced Texture",
    },
    {
      title: "Careful Manufacturing & Packing",
      description: "Direct supervision over our dedicated converting machine means every batch is inspected before leaving the facility.",
      accent: "Dedicated Line",
    },
    {
      title: "Direct Owner Communication",
      description: "Deal directly with the manufacturing unit for competitive quotes, transparent delivery timelines, and genuine partnership.",
      accent: "Clear Dialogue",
    },
  ],

  targetAudiences: [
    {
      type: "Wholesalers & Distributors",
      description: "Consistent case packaging, volume-based pricing, and reliable reorder turnaround from Rajkot.",
      cta: "Request Bulk Rates",
    },
    {
      type: "Retailers & Provision Stores",
      description: "Attractive retail-ready plastic packs of 50 and 70 sheets that move quickly off shelves.",
      cta: "Stock Softique",
    },
    {
      type: "Cafes & Dining Establishments",
      description: "Clean, hygienic presentation that elevates everyday dining without inflating disposable costs.",
      cta: "Order Cafe Supply",
    },
    {
      type: "Catering & Event Organizers",
      description: "Dependable sheet counts and soft touch for large gatherings, food stalls, and party orders.",
      cta: "Event Supply Enquiry",
    },
  ],

  media: {
    packageArtwork: "/images/softique-package.png",
    packetStudio43: "/images/softique-packet-studio-43.jpg",
    packetStudioWide: "/images/softique-packet-studio-wide.jpg",
    heroProduct: "/images/softique-packet-studio-43.jpg",
    heroDual: "/images/softique-packet-studio-wide.jpg",
    productDetail: "/images/softique-product-detail.jpg",
    productDark: "/images/softique-product-dark.png",
    productTable: "/images/softique-product-table.png",
    machinePhoto: "/images/softique-machine.jpg",
    logo: "/images/softique-logo.png",
  },
};

