# Softique — Napkin Tissue Paper Manufacturing Website

> **“Softness in Every Touch.”**  
> Luxury Cinematic Website for Softique, a newly started napkin tissue paper manufacturing business based in **Rajkot, Gujarat, India**.

---

## 1. Business Context & Verified Facts

Softique is a focused tissue-paper manufacturing enterprise founded in Rajkot, Gujarat. The business is presented honestly without exaggeration:

* **Production Capability:** Currently operates **one high-precision converting machine** dedicated to napkin tissue paper.
* **Confirmed Product Offering:** **Napkin Tissue Paper** packed in sealed, hygienic plastic packets.
* **Available Packet Formats:** **50 Sheets Pack** and **70 Sheets Pack** (Size: 27 cm × 30 cm, 1-Ply virgin pulp).
* **Target Clientele:** Wholesalers, FMCG stockists, provision retailers, cafes, caterers, and restaurant buyers.
* **Packaging:** High-clarity poly/plastic packets preserving hygiene, moisture resistance, and shelf presentation.
* **Integrity Commitment:** No invented machinery lines, certifications, client testimonials, export markets, or fabricated factory addresses.

---

## 2. Visual Direction & Design System

* **Luxury Cinematic Aesthetic:** Warm white (`#FBFBF9`), ivory (`#F6F4EE`), champagne beige (`#EDE8DC`), soft taupe (`#B8AD9E`), and subtle sage accents balanced with deep obsidian/charcoal panels (`#12151A`) for contrast.
* **Editorial Typography:** Paired with **Cormorant Garamond** for classical editorial headings and **Plus Jakarta Sans** for crisp legibility.
* **Authentic Product Visuals:** Features the owner's actual photographs of the Softique napkin packets, visible fold layers, and embossed texture.
* **Motion & Accessibility:** Smooth reveals powered by **Framer Motion**, with native support for `prefers-reduced-motion` via `<MotionConfig reducedMotion="user">`.

---

## 3. Project Structure

```text
softique/
├── public/
│   ├── favicon.svg                   # Custom Softique brand favicon
│   └── images/
│       ├── softique-product.jpg       # Authentic Softique packet & embossed napkin stack
│       ├── softique-product-dual.png  # Authentic 50 & 70 Sheets plastic packets
│       ├── softique-product-detail.jpg# Macro embossed virgin fiber paper texture
│       ├── softique-product-dark.png  # Luxury dark contrast pack shot
│       ├── softique-machine.jpg       # Blueprint placeholder for actual converting machine
│       └── softique-logo.png          # Extracted Softique brand emblem
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                 # Responsive sticky navigation & mobile drawer
│   │   ├── Footer.jsx                 # Wordmark, Rajkot origin, verified channels, copyright
│   │   ├── Button.jsx                 # Accessible luxury button system
│   │   └── SectionHeading.jsx         # Editorial section headings with badges
│   ├── sections/
│   │   ├── Hero.jsx                   # Cinematic hero with real product visual & reveals
│   │   ├── ProductShowcase.jsx        # Napkin tissue paper showcase with spec reviewer
│   │   ├── WhySoftique.jsx            # Company operating priorities & quality standards
│   │   ├── Manufacturing.jsx          # Dedicated machine setup & 5-step process workflow
│   │   ├── About.jsx                  # Truthful founding narrative grounded in Rajkot
│   │   ├── WholesaleEnquiry.jsx       # Volume planner & 1-click WhatsApp quote generator
│   │   └── Contact.jsx                # Form with client validation & direct contact links
│   ├── data/
│   │   └── siteConfig.js              # Centralized, easily editable business configuration
│   ├── App.jsx                        # Master layout with MotionConfig
│   ├── main.jsx                       # Application entry point
│   └── index.css                      # Tailwind CSS v4 & luxury glass styling
├── .env.example                       # Environment template
├── package.json                       # Project scripts and dependencies
├── vite.config.js                     # Vite 8 + Tailwind configuration
└── README.md                          # Project documentation
```

---

## 4. Setup & Running Locally

### Prerequisites
* **Node.js**: v18.0.0 or higher (Tested with Node v24.18.0)
* **npm**: v9.0.0 or higher

### Installation
```bash
# Clone or navigate to the project directory
cd D:\Softique

# Install dependencies
npm install
```

### Development Server
```bash
# Start the local Vite server
npm run dev

# The site is accessible at:
# http://localhost:5173
```

### Production Build
```bash
# Build the optimized production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## 5. Asset Management & Owner Replacement Guide

| Asset Path | Description | Current Status | Action Needed by Owner |
| :--- | :--- | :--- | :--- |
| `public/images/softique-product.jpg` | Primary product packet & napkin stack | **Authentic Photograph** | None required (or update if new shoot is done) |
| `public/images/softique-product-dual.png` | 50s & 70s plastic packets | **Authentic Photograph** | None required |
| `public/images/softique-product-detail.jpg`| Close-up embossed napkin texture | **Authentic Photograph** | None required |
| `public/images/softique-machine.jpg` | Single napkin converting machine | **Blueprint Placeholder** | **Replace with actual machine workshop photo** |

> **Note on Machine Photo:**  
> When the owner takes a photo of the Rajkot converting machine, simply save it as `softique-machine.jpg` and overwrite the file in `public/images/softique-machine.jpg`. In `src/data/siteConfig.js`, set `isMachinePhotoPlaceholder: false`.

---

## 6. Central Configuration (`src/data/siteConfig.js`)

All owner-specific details can be updated in a single file without modifying JSX templates:

* **Brand Details:** Name, tagline, supporting messages, legal entity name (`JM Enterprise`).
* **Contact Endpoints:** Phone number (`+91 98798 95764`), WhatsApp number (`919879895764`), business email (`supply@softique.in`), operating hours.
* **Product Specifications:** Toggle confirmed versus unconfirmed specifications, MOQ (500 packets), and base wholesale rates (₹12.50 / ₹16.50).
* **Manufacturing Steps:** Customize or remove any step in the converting and dispatch sequence.

---

## 7. Quality & Verification Checklist

- [x] **Brand & Location:** Clearly identifies Softique in Rajkot, Gujarat, India.
- [x] **Real Product Photography:** Uses actual photographs of Softique napkin packets and embossed napkins.
- [x] **Plastic Packet Packaging:** Accurately highlights clear, hygienic plastic packets.
- [x] **Honest Facility Scope:** Accurately represents a 1-machine dedicated converting line.
- [x] **Wholesale & Retail Focus:** Dedicated volume calculator and WhatsApp quote generator.
- [x] **Reduced Motion Support:** Respects user accessibility settings via Framer Motion's `reducedMotion="user"`.
- [x] **Form Validation:** Validates required fields and reports submission state honestly without claiming fake server transmission.
- [x] **SEO & Social Metadata:** Meta tags, Open Graph tags, canonical headers, and semantic HTML5 included.
- [x] **Zero Build Errors:** Clean build passing `vite build` with 0 console errors or horizontal overflow.
