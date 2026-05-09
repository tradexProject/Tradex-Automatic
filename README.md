# TradeX | Automated Subscription & Digital Delivery Platform

**TradeX** is a high-end, luxury-themed full-stack web platform designed for seamless subscription management and automated digital product delivery. Built with a focus on premium user experience, the system combines sleek animations with a robust, cost-effective automation engine.

---

##  Technical Documentation (Proposal)
For a detailed explanation of all features, platform architecture, and project requirements, please refer to the official Technical Proposal:
 **[View Technical Reference Guide](https://docs.google.com/document/d/1ofkIb-poCpIuWxXc7Q056pTWNa1F67XENAul_YSva1M/edit?usp=sharing)**

*(Note: A public reference copy is also available in the `public` folder).* 
**File Path:** `public/TradeX platform proposal.pdf`

---

##  Key Features

###  Premium Frontend (User Side)
- **Luxury Aesthetic:** A sophisticated dark-themed interface with glowing elements and smooth scroll-animations.
- **Single-Page Architecture:** Fluid navigation between Home, About, and Plans.
- **Smart Plans Section:** Highlighted target plans with strike-through pricing to drive conversion.
- **Zero-Storage Verification:** A streamlined "Transaction ID" submission system that eliminates the need for heavy image uploads.

###  Admin Portal & Automation
- **Real-Time Notifications:** Instant alerts for new subscription requests.
- **Automated Fulfillment:** Upon approval, the system fetches an unused code and dispatches it via email automatically.
- **Inventory Management:** Categorized management of access codes (Available vs. Used).
- **Secure Authentication:** Multi-layered security protecting sensitive admin data.

---

##  Technical Stack

- **Framework:** [Next.js](https://nextjs.org/) (Frontend & Backend)
- **Database:** PostgreSQL (Relational Data Management)
- **Styling:** Tailwind CSS with Framer Motion for animations.
- **Email Service:** Automated SMTP integration for instant code delivery.
- **Security:** Rigorous server-side sanitization and SQL injection protection.

---

## Project Management Guide

### Editing Subscription Plans
If you need to update prices, features, descriptions, or temporarily disable a plan, you can do so directly in the configuration file.

**File Path:** `src/frontend/components/Plans/data.js`

**How to Disable a Plan:**
To mark a plan as "Sold Out" or "Currently Unavailable" (which grays out the button and prevents users from selecting it), simply set the `isDisabled` property to `true`. To reactivate it, change it back to `false`.

```javascript
isDisabled: true,  // Disables the plan
isDisabled: false, // Enables the plan
