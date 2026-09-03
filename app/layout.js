import { DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothSnapScroll from "@/components/SmoothSnapScroll";
import VOXAPageLoader from "@/components/VOXAPageLoader";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "VOXA",
  description:
    "VOXA is a voice agent platform that handles business phone calls and turns conversations into structured action.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="orb" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${dmSans.className}`}
        suppressHydrationWarning
      >
        <VOXAPageLoader />
        <div className="site-root">
          <Navbar />
          <SmoothSnapScroll />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
