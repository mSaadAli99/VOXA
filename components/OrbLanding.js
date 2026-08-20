"use client";

import { useTheme } from "@/components/ThemeProvider";
import { HeroSectionDemo } from "@/components/blocks/hero-section-demo";
import OrbWhatVoxaDoes from "@/components/OrbWhatVoxaDoes";
import OrbShowcaseRail from "@/components/OrbShowcaseRail";
import OrbFAQ from "@/components/OrbFAQ";

export default function OrbLanding() {
  const { theme } = useTheme();
  if (theme !== "orb") return null;

  return (
    <div className="bg-background text-foreground" data-snap-protect>
      <HeroSectionDemo />
      <OrbWhatVoxaDoes />
      <OrbShowcaseRail />
      <OrbFAQ />
    </div>
  );
}
