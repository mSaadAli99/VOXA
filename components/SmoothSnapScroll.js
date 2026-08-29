"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scheduleSectionHashScroll } from "@/lib/scrollToSection";
import "lenis/dist/lenis.css";

const SNAP_THRESHOLD = 0.28;
/* Tall scrub sections (gate / rail) only disable snap in their middle.
   A larger edge keeps Lenis from overshooting into "protect" before snap fires. */
const PROTECT_EDGE = 0.9;

export default function SmoothSnapScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const clearHashScroll = scheduleSectionHashScroll(hash, [200, 500, 900]);
      return clearHashScroll;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const snapPages = new Set(["/", "/about", "/solutions", "/products", "/technology"]);
    if (!snapPages.has(pathname)) {
      document.documentElement.style.scrollBehavior = "smooth";
      return undefined;
    }

    const mobileMq = window.matchMedia("(max-width: 767px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    let lenis;
    let tickerFn;
    let snapTrigger;

    const teardown = () => {
      snapTrigger?.kill();
      snapTrigger = undefined;
      if (tickerFn) {
        gsap.ticker.remove(tickerFn);
        tickerFn = undefined;
      }
      gsap.ticker.lagSmoothing(500, 33);
      lenis?.destroy();
      lenis = undefined;
    };

    const getSnapPoints = () => {
      const max = ScrollTrigger.maxScroll(window);
      if (!max) return [0];

      const points = [0];
      document.querySelectorAll("[data-snap-section]").forEach((el) => {
        if (!(el instanceof HTMLElement)) return;
        if (el.offsetParent === null && el.offsetHeight === 0) return;
        const top = el.getBoundingClientRect().top + window.scrollY;
        points.push(gsap.utils.clamp(0, 1, top / max));
      });

      return [...new Set(points.map((value) => Number(value.toFixed(4))))].sort(
        (a, b) => a - b,
      );
    };

    const isProtected = (scrollY) => {
      const vh = window.innerHeight;
      const edge = vh * PROTECT_EDGE;

      return [...document.querySelectorAll("[data-snap-protect]")].some((el) => {
        if (!(el instanceof HTMLElement)) return false;
        if (el.offsetHeight < vh * 1.35) return false;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const bottom = top + el.offsetHeight;
        return scrollY > top + edge && scrollY < bottom - edge;
      });
    };

    const setup = () => {
      teardown();
      document.documentElement.style.scrollBehavior = "auto";

      if (mobileMq.matches || motionMq.matches) {
        document.documentElement.style.scrollBehavior = "smooth";
        ScrollTrigger.refresh();
        return;
      }

      lenis = new Lenis({
        lerp: 0.14,
        wheelMultiplier: 0.85,
        smoothWheel: true,
        autoRaf: false,
      });

      lenis.on("scroll", ScrollTrigger.update);
      tickerFn = (time) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      snapTrigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        snap: {
          snapTo: (progress, self) => {
            if (isProtected(self.scroll())) return progress;

            const points = getSnapPoints();
            const last = points[points.length - 1];
            /* Footer sits after the last snap section — don't yank the page */
            if (progress > last + 0.002) return progress;

            let index = 0;
            while (
              index < points.length - 1 &&
              progress >= points[index + 1] - 1e-6
            ) {
              index += 1;
            }

            const previous = points[index];
            const next = points[Math.min(index + 1, points.length - 1)];
            if (Math.abs(next - previous) < 1e-4) return previous;

            const local = (progress - previous) / (next - previous);
            if (self.direction >= 0) {
              return local >= SNAP_THRESHOLD ? next : previous;
            }
            return local <= 1 - SNAP_THRESHOLD ? previous : next;
          },
          duration: { min: 0.12, max: 0.22 },
          delay: 0,
          ease: "power4.out",
          directional: true,
          inertia: false,
        },
      });

      ScrollTrigger.refresh();
    };

    setup();
    mobileMq.addEventListener("change", setup);
    motionMq.addEventListener("change", setup);
    window.addEventListener("load", setup);

    /* Theme swap remounts Orb/Studio — rebuild snap so Orb markers are live */
    const onTheme = () => {
      window.setTimeout(() => {
        setup();
        lenis?.resize?.();
      }, 60);
    };
    const themeWatch = new MutationObserver(onTheme);
    themeWatch.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      themeWatch.disconnect();
      window.removeEventListener("load", setup);
      mobileMq.removeEventListener("change", setup);
      motionMq.removeEventListener("change", setup);
      document.documentElement.style.scrollBehavior = "";
      teardown();
    };
  }, [pathname]);

  return null;
}
