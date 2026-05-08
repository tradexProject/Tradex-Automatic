
import React from 'react';
import LegalPage from '../../frontend/components/legalPage.js';
import Navbar from '../../frontend/components/Navbar';
import Footer from '../../frontend/components/Footer';

export const metadata = {
  title: {
    default: "TradeX | Policy & Terms",
    template: "%s | TradeX",
  },
  description: "The ultimate TradeX experience for maximum performance. Advanced automation, Real & OTC markets support, and full risk management.",
  keywords: ["TradeX", "Crypto Trading", "Trading Bot", "OTC Markets", "Trading Automation", "Risk Management"],

};

const Legal = () => {
  return (
    <div >
      <Navbar />
       <LegalPage />
       <Footer />
    </div>
  );
};

export default Legal;
       