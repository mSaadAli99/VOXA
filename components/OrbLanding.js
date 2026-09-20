"use client";

import OrbHero from "@/components/OrbHero";
import OrbWhatVoxaDoes from "@/components/OrbWhatVoxaDoes";
import OrbShowcaseRail from "@/components/OrbShowcaseRail";
import OrbCallPreview from "@/components/OrbCallPreview";
import OrbVoices from "@/components/OrbVoices";
import OrbFAQ from "@/components/OrbFAQ";
import ReadyToTalkSection from "@/components/ReadyToTalkSection";

export default function OrbLanding({ hero, products, solutions }) {
  return (
    <div className="text-foreground" style={{ background: "#f8f0e5" }}>
      <OrbHero
        title={hero?.title || undefined}
        description={hero?.description}
      />
      <OrbWhatVoxaDoes />
      <OrbShowcaseRail products={products} solutions={solutions} />
      <OrbCallPreview />
      <OrbVoices />
      <OrbFAQ />
      <ReadyToTalkSection />
    </div>
  );
}
