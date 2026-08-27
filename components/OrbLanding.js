"use client";

import OrbHero from "@/components/OrbHero";
import OrbWhatVoxaDoes from "@/components/OrbWhatVoxaDoes";
import OrbShowcaseRail from "@/components/OrbShowcaseRail";
import OrbCallPreview from "@/components/OrbCallPreview";
import OrbFAQ from "@/components/OrbFAQ";

export default function OrbLanding() {
  return (
    <div className="text-foreground" style={{ background: "#f8f0e5" }}>
      <OrbHero />
      <OrbWhatVoxaDoes />
      <OrbShowcaseRail />
      <OrbCallPreview />
      <OrbFAQ />
    </div>
  );
}
