# 🎂 BUTTER & BLISS — Bakery & Royal Mithai

> *"A Little Sweetness, A Lot of Happiness."*  
> Handcrafted European gourmet patisserie and authentic 100% Desi Cow Ghee Indian regional mithai.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/hanamantmantur006/butter-and-bliss)

---

## 🌟 Key Features

1. **Artisanal Catalog & Live Menus**
   - 47 Handcrafted Delicacies across Cakes, Pastries & Desserts, Authentic Royal Mithai (Kaju Katli, Mysore Pak, Dharwad Peda, Ghewar, Sandesh, Modak, Puran Poli, Gujiya, Rasmalai, Rasgulla, Jalebi, Shrikhand, Gajar Ka Halwa), Savory Snacks, and Traditional Beverages.
   - 100% Authentic, dedicated high-resolution photography for each delicacy matching its genuine culinary identity.
   - Automated client cache invalidation (`CATALOG_VERSION` guard) ensuring immediate display of menu updates without manual browser data purges.
   - Dynamic portion/weight selection (500g, 1 kg, 2 kg, pcs) with real-time price updates.
   - Vegetarian and eggless filter options.

2. **Online Ordering & Verified Checkout**
   - Delivery types: Express Home Delivery or Boutique Pickup (Indiranagar Flagship).
   - Authoritative subtotal calculation with dynamic free-delivery rules (>₹500).
   - Promo discount engine (e.g. `BLISS10`, `FESTIVE20`, `SWEET50`).
   - Integrated payment options: Instant UPI, Razorpay Gateway, and Cash on Delivery.

3. **Cryptographic Anti-Tamper Security**
   - SHA-256 digital integrity hash generated upon order staging.
   - High-entropy Customer Security Key issued to buyers for secure tracking and destination modifications.

4. **Live Order Tracking & Destination Editing**
   - Real-time 5-stage fulfillment tracker (Received → Confirmed → Preparing → Out for Delivery → Delivered).
   - Customer-authenticated delivery destination modifications using order security passkeys.

5. **Bespoke Cake & Festive Hamper Studio**
   - Custom celebration and multi-tier wedding cake inquiry system.
   - Image upload and dietary specifications (100% Eggless, Jain friendly, Sugar-Free).

6. **Owner Admin Operations Portal**
   - Secured behind managerial PIN authentication (`bliss2026`).
   - Live KPI dashboard (Gross Revenue, Total Orders, Pending Dispatches, Custom Inquiries).
   - Order management board with status updates.
   - Full catalog and price editor (add/edit products, stock status toggle).
   - Coupon voucher management (create custom codes with min order thresholds).
   - Custom wedding/corporate quote review system.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone or navigate to the repository
cd butter-and-bliss

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 🔐 Credentials & Defaults

- **Admin Portal Passcode**: `bliss2026`
- **Customer Support & Orders Email**: [hanamantmantur006@gmail.com](mailto:hanamantmantur006@gmail.com)
- **Customer Concierge WhatsApp**: `+91 95358 39261`
- **Official UPI Payment ID**: `9535839261@nyes` (Bank of Baroda - 7707)
- **Active Promo Codes**:
  - `BLISS10` (10% OFF on orders > ₹499)
  - `FESTIVE20` (20% OFF on orders > ₹1200)
  - `SWEET50` (15% OFF on sweets > ₹799)

---

## 📂 Project Structure

```text
butter-and-bliss/
├── src/
│   ├── App.jsx          # Complete single-page React application with all components & state
│   ├── main.jsx         # React DOM mount point
│   └── index.css        # Tailwind directives and typography styling
├── public/              # Static public assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS theme configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.js       # Vite configuration
└── README.md            # Documentation
```
