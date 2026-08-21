import { DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothSnapScroll from "@/components/SmoothSnapScroll";
import VOXAPageLoader from "@/components/VOXAPageLoader";
import { ThemeProvider } from "@/components/ThemeProvider";
import NextThemeProvider from "@/components/NextThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import AudioPlayer from "@/components/AudioPlayer";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: "VOXA",
  description: "VOXA frontend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${dmSans.className}`}
        style={{ background: "#000", color: "#fff" }}
      >
        <ThemeProvider>
          <NextThemeProvider>
            <VOXAPageLoader />
            <ThemeToggle />
            <AudioPlayer />
            <div className="site-root">
              <Navbar />
              <SmoothSnapScroll />
              {children}
              <Footer />
            </div>
          </NextThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
