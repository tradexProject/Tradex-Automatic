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
    description: 'Perfect entry into automation.',
    isDisabled: true,
    features: [
      '1 Device Access',
      'Real & OTC Markets Supported',
      'All Trading Pairs Included',
      'Smooth & Beginner-Friendly Setup',
      'Essential Automation Features'
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
    description: 'Built for traders ready to scale.',
    isDisabled: false,
    features: [
      '2 Devices Access',
      'Real & OTC Markets Supported',
      'All Trading Pairs Included',
      'Priority Support',
      'Remote Full Setup Service',
      'Advanced Risk Management',
      'Performance Analytics'
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
    description: 'Maximum power. Full control.',
    isDisabled: false,
    features: [
      'Multi-Device Access (2+)',
      'Real & OTC Markets Supported',
      'All Trading Pairs Included',
      'Private Premium Support',
      'Multi-Account Trading',
      'Full Remote + VPS Setup',
      'Optimized Windows Environment',
      'Full Risk Management System SL/TP',
      'Advanced Analytics'
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
