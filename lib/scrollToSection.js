"use client";

import { ScrollTrigger } from "@/lib/gsap";

const PINNED_TARGETS = {
  "voice-agent": { triggerId: "products-rail", progress: 0.05 },
  "communications-suite": { triggerId: "products-rail", progress: 0.6 },
  "real-estate": { triggerId: "solutions-rail", progress: 0.05 },
  "e-commerce": { triggerId: "solutions-rail", progress: 0.6 },
};

export function scrollToSectionHash(hash, { behavior = "auto" } = {}) {
  const id = (hash || "").replace(/^#/, "");
  if (!id) return false;

  const pinned = PINNED_TARGETS[id];
  if (pinned) {
    const st = ScrollTrigger.getById(pinned.triggerId);
    if (!st) return false;
    const y = st.start + (st.end - st.start) * pinned.progress;
    window.scrollTo({ top: y, behavior });
    return true;
  }

  const el = document.getElementById(id);
  if (!el) return false;

  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior });
  return true;
}

export function scheduleSectionHashScroll(hash, delays = [120, 350, 700]) {
  const run = () => scrollToSectionHash(hash);
  const timers = delays.map((delay) => window.setTimeout(run, delay));
  return () => timers.forEach((timer) => window.clearTimeout(timer));
}
