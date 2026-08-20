"use client";

import { motion } from "motion/react";
import { HeroSection } from "@/components/blocks/hero-section";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

export function HeroSectionDemo() {
  return (
    <HeroSection
      centered
      title={
        <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-3 text-center sm:mx-0 sm:mb-0">
          <LayoutTextFlip
            text="Turns conversations into"
            words={["Execution", "Action"]}
            duration={3000}
            className="flex-col gap-3"
            textClassName="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
            wordClassName="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          />
        </motion.div>
      }
      description="VOXA is a voice agent platform. It handles your business's phone calls — qualifying leads, confirming orders, following up with customers — automatically, and turns every call into structured data your team can use."
      actions={[
        {
          text: "Talk to us",
          href: "/#talk",
          variant: "default",
        },
      ]}
    />
  );
}
