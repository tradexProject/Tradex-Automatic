import { Sora } from "next/font/google";
import "./globals.css";
import AdvancedCursor from '../frontend/components/AdvancedCursor';
import BackgroundEngine from '../frontend/components/BackgroundEngine';

const sora = Sora({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sora", 
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${sora.variable}`}>
      <body className={`${sora.className} bg-[#020202] text-white antialiased`}>
           <AdvancedCursor />
           <BackgroundEngine />
            
        <main>{children}</main>
      </body>
    </html>
  );
}