//-------------------------------------------------------------
// ⚠️ IMPORTANT: You can edit prices, descriptions, and features.
// ⛔ DO NOT change the "id" or "name" properties as they are linked to the system logic.
//-------------------------------------------------------------
export const plansData = {
  starter: { 
    id: 'starter',
    name: 'Starter Plan', 
    duration: '1 Month',
    priceMonthly: '49', 
    priceAnnual: '49', 
    description: 'Perfect for getting started with TradeX.',
    features: [
      'Access on 1 device',
      'Supports Real & OTC markets',
      'Works on all trading pairs',
      'Smooth and easy setup',
      'Core automation features included'
    ]
  },
  pro: { 
    id: 'pro',
    name: 'Professional Plan', 
    duration: '3 Months',
    priceMonthly: '99', 
    priceAnnual: '99',
    oldPrice: '124',
    highlight: 'Limited Offer',
    description: 'Designed for serious traders ready to scale.',
    features: [
      'Access on 2 devices',
      'Supports Real & OTC markets',
      'Works on all trading pairs',
      'Priority support',
      'Remote full setup service',
      'Advanced Risk Management system',
      'Detailed Performance Analytics'
    ]
  },
  institution: { 
    id: 'institution',
    name: 'Ultimate Plan', 
    duration: '1 Year',
    priceMonthly: '199', 
    priceAnnual: '199', 
    oldPrice: '300',
    highlight: 'Limited Offer',
    description: 'The complete TradeX experience for maximum performance.',
    features: [
      'Access on multiple devices (2+)',
      'Supports Real & OTC markets',
      'Works on all trading pairs',
      'Private premium support',
      'Works on multiple accounts',
      'Remote full setup + VPS setup',
      'Windows-ready optimized setup',
      'Full Risk Management system',
      'Advanced Performance Analytics'
    ]
  }
};
//-------------------------------------------------------------

// Animation variants for framer-motion
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};