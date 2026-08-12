//-------------------------------------------------------------
// ⚠️ IMPORTANT: You can edit prices, descriptions, and features.
// ⛔ DO NOT change the "id" or "name" properties as they are linked to the system logic.
//-------------------------------------------------------------
export const plansData = {
  starter: { 
    id: 'starter',
    name: 'Starter Plan', 
    duration: '1 Month',
    priceMonthly: '45', 
    priceAnnual: '45', 
    oldPrice: '50',
    description: 'Perfect entry into automation.',
    isDisabled: true,
   features: [
  '1 Device Access',
  '2 Advanced Scan Modes',
  'Automatic Trading',
  'Real & OTC Markets Supported',
  'Stocks & Supported Assets',
  'All Trading Pairs Included',
  'Martingale & Compounding',
  'Pocket Option Support',
  'Lightweight & Easy Setup'
]
  },
  pro: { 
    id: 'pro',
    name: 'Professional Plan', 
    duration: '1 Month',
    priceMonthly: '99', 
    priceAnnual: '99',
    oldPrice: '130',
    highlight: 'Limited Offer',
    description: 'Built for traders ready to scale.',
    isDisabled: false,
    features: [
  '1 Device Access',
  '3 Advanced Scan Modes',
  'Automatic Trading',
  'Real & OTC Markets Supported',
  'Stocks & Supported Assets',
  'All Trading Pairs Included',
  'Hands-Free AutoScanning',
  'Custom Martingale & Compounding',
  'Custom AutoScan Settings',
  'Total, Success, Delay & Trade Controls',
  'Pocket Option Support',
  'Priority Support'
]
  },
  institution: { 
    id: 'institution',
    name: 'Ultimate Plan', 
    duration: '3 Months',
    priceMonthly: '199', 
    priceAnnual: '199', 
    oldPrice: '350',
    highlight: 'Limited Offer',
    description: 'Maximum power. Full control.',
    isDisabled: false,
    features: [
  'Mutli Device Access',
  '3 Advanced Scan Modes',
  'Full Automatic Trading',
  'Real & OTC Markets Supported',
  'Stocks & Supported Assets',
  'All Trading Pairs Included',
  'Hands-Free AutoScanning',
  'Double Scan Confirmation',
  'Payout Checks',
  'Advanced Trading Logs',
  'Stop Loss & Take Profit',
  'Custom Martingale & Compounding',
  'Custom AutoScan Settings',
  'Custom Profit, Loss & Trade Controls',
  'Advanced Risk Management',
  'Full Feature Unlock',
  'Private Setup & Premium Support'
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
