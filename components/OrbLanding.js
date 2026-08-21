"use client";

import { useTheme } from "@/components/ThemeProvider";
import OrbHero from "@/components/OrbHero";
import OrbWhatVoxaDoes from "@/components/OrbWhatVoxaDoes";
import OrbShowcaseRail from "@/components/OrbShowcaseRail";
import OrbFAQ from "@/components/OrbFAQ";

export default function OrbLanding() {
  const { theme } = useTheme();
  if (theme !== "orb") return null;

  return (
    <div className="text-foreground" style={{ background: "#f8f0e5" }} data-snap-protect>
      <OrbHero />
      <OrbWhatVoxaDoes />
      <OrbShowcaseRail />
      <OrbFAQ />
    </div>
  );
}
