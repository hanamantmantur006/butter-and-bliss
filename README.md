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
   - Authoritative serverless subtotal calculation with dynamic free-delivery rules (>₹500).
   - Promo discount engine (e.g. `BLISS10`, `FESTIVE20`, `SWEET50`).
   - Integrated payment options: Instant UPI, Razorpay Gateway, and Cash on Delivery.

3. **Enterprise Security & Cryptographic Protection**
   - **Salted SHA-256 Hashing**: Admin passcodes are verified via salted cryptographic hashes. Plaintext passcodes are never checked or exposed in client bundles.
   - **Signed Session Tokens**: Managerial sessions issue cryptographically signed, expiring JWT/HMAC tokens with auto-logout after 30 minutes of inactivity.
   - **Anti-Brute-Force Rate Limiting**: Max 5 attempts with 15-minute lockout timer on admin authentication.
   - **API Rate Limiting**: Backend order creation and contact form endpoints enforce rate-limiting per client IP.
   - **Strict Input Sanitization & Anti-XSS**: Strip HTML tags and dangerous characters across all customer inputs.
   - **Authoritative Server Pricing**: Prices recalculated on the serverless backend to prevent client tampering.
   - **Digital Integrity Signatures**: Immutable SHA-256 checksums attached to all orders.
   - **Production Security Headers**: Configured with Content Security Policy (CSP), HSTS (`max-age=31536000`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and strict referrer policy.
   - **Debug Mode & Sourcemaps Disabled**: Production builds strip console debuggers and emit no sourcemaps.

4. **Live Order Tracking & Destination Editing**
   - Real-time 5-stage fulfillment tracker (Received → Confirmed → Preparing → Out for Delivery → Delivered).
   - Role-Based Access Control (RBAC): Customers must present their secret 128-bit passkey to modify active orders.

5. **Bespoke Cake & Festive Hamper Studio**
   - Custom celebration and multi-tier wedding cake inquiry system.
   - Dietary specifications (100% Eggless, Jain friendly, Sugar-Free).

6. **Owner Admin Operations Portal**
   - Secured behind salted cryptographic authentication and rate-limited access controls.
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

# Copy environment variable template
cp .env.example .env

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

## 🛡️ Security Configuration & Environment Variables

Copy `.env.example` to `.env` in local development or configure these environment variables in your **Netlify Site Settings > Build & deploy > Environment variables**:

| Variable | Description | Default / Production Guidance |
| :--- | :--- | :--- |
| `NODE_ENV` | Application environment | `production` |
| `SESSION_SECRET` | HMAC signing secret for session tokens | Generate a 64+ char random string |
| `ADMIN_PASSWORD_HASH` | Salted SHA-256 hash for admin passcode | Default corresponds to `bliss2026` with salt |
| `ADMIN_PASSWORD_SALT` | Salt prepended before hashing passcode | `bnb_salt_sec_2026_` |
| `CORS_ALLOWED_ORIGINS`| Permitted origins for API requests | Netlify site domain |

> [!TIP]
> The default initial managerial passcode is `bliss2026`. To change the passcode in production, compute `SHA-256(ADMIN_PASSWORD_SALT + YOUR_NEW_PASSWORD)` and update `ADMIN_PASSWORD_HASH` in Netlify environment variables without changing source code.

---

## 📞 Store & Concierge Details

- **Customer Support Email**: [hanamantmantur006@gmail.com](mailto:hanamantmantur006@gmail.com)
- **Customer Concierge Phone**: `+91 95358 39261`
- **Official UPI Payment ID**: `9535839261@nyes` (Bank of Baroda - 7707)
- **Active Promo Codes**:
  - `BLISS10` (10% OFF on orders > ₹499)
  - `FESTIVE20` (20% OFF on orders > ₹1200)
  - `SWEET50` (15% OFF on sweets > ₹799)

---

## 📂 Project Structure

```text
butter-and-bliss/
├── netlify/
│   └── functions/
│       ├── admin-auth.js        # Serverless admin auth, rate-limiting, JWT tokens
│       ├── orders.js            # Serverless authoritative order validation & checksums
│       ├── contact.js           # Serverless sanitized contact message processing
│       └── security-status.js   # Security health and configuration endpoint
├── src/
│   ├── App.jsx                  # Hardened React application with XSS sanitization & RBAC
│   ├── main.jsx                 # React DOM mount point
│   └── index.css                # Tailwind directives and typography styling
├── public/                      # Static public assets
├── .env.example                 # Environment variables security template
├── netlify.toml                 # Netlify routing, redirects, and HTTP security headers
├── vite.config.js               # Hardened Vite bundler (no sourcemaps, minified)
├── tailwind.config.js           # Tailwind CSS configuration
└── README.md                    # Project documentation
```
