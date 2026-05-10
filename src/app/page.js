import Plans from '../frontend/components/Plans';
import About from '../frontend/components/About';
import Contact from '../frontend/components/Contact';
import Hero from '../frontend/components/Hero';
import Navbar from '../frontend/components/Navbar';
import Footer from '../frontend/components/Footer';
import FloatingWidgets from './FloatingWidgets';

export const metadata = {
  title: {
    default: "TradeX | Advanced Trading Automation",
    template: "%s | TradeX",
  },
  description: "The ultimate TradeX experience for maximum performance. Advanced automation, Real & OTC markets support, and full risk management.",
  keywords: ["TradeX", "Crypto Trading", "Trading Bot", "OTC Markets", "Trading Automation", "Risk Management"],
};

export default function App() {
  return (
    <div className="min-h-screen bg-transparent text-white font-sans selection:bg-blue-500 selection:text-white overflow-hidden relative">
      <Navbar />
      <Hero />
      <Plans />
      <About />
      <Contact />
      <Footer />

      <FloatingWidgets />

      <style dangerouslySetInnerHTML={{__html: `
        * { cursor: none !important; }
        @keyframes cinematic-reveal {
          0% { opacity: 0; filter: blur(20px); transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; filter: blur(0px); transform: translateY(0) scale(1); }
        }
        @keyframes scanner {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(400px); opacity: 0; }
        }
        @keyframes grid-flow {
          0% { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
        @keyframes float-up {
          0% { transform: translateY(0px) translateZ(50px); }
          100% { transform: translateY(-20px) translateZ(50px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes gradient-xy {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes spin-slow {
          from { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          to { transform: rotateX(360deg) rotateY(360deg) rotateZ(180deg); }
        }
        .perspective-\\[1000px\\] { perspective: 1000px; }
        .perspective-\\[1500px\\] { perspective: 1500px; }
        .perspective-\\[2000px\\] { perspective: 2000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .translate-z-30 { transform: translateZ(30px); }
        .translate-z-40 { transform: translateZ(40px); }
        .translate-z-50 { transform: translateZ(50px); }
        .translate-z-\\[50px\\] { transform: translateZ(50px); }
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px #0a0a0a inset !important;
            -webkit-text-fill-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
        }
      `}} />
    </div>
  );
}
