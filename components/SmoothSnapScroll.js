"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scheduleSectionHashScroll } from "@/lib/scrollToSection";
import "lenis/dist/lenis.css";

const SNAP_THRESHOLD = 0.28;
const STEP_SNAP_THRESHOLD = 0.12;
/* Tall scrub sections (gate / rail) only disable snap in their middle. */
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
    let settledStepIndex = 0;

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

    const getStepPoints = () => {
      const max = ScrollTrigger.maxScroll(window);
      if (!max) return [];

      return [...document.querySelectorAll("[data-snap-step]")]
        .filter((el) => el instanceof HTMLElement)
        .map((el) => {
          const top = el.getBoundingClientRect().top + window.scrollY;
          return {
            top,
            progress: gsap.utils.clamp(0, 1, top / max),
          };
        })
        .sort((a, b) => a.top - b.top);
    };

    const nearestStepIndex = (scrollY, steps) => {
      if (!steps.length) return 0;
      let best = 0;
      let bestDist = Infinity;
      steps.forEach((step, index) => {
        const dist = Math.abs(step.top - scrollY);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      });
      return best;
    };

    const syncSettledStep = (scrollY) => {
      const steps = getStepPoints();
      if (!steps.length) return;
      settledStepIndex = nearestStepIndex(scrollY, steps);
    };

    const isInStepRegion = (scrollY) => {
      const steps = getStepPoints();
      if (!steps.length) return false;
      const first = steps[0].top;
      const last = steps[steps.length - 1];
      const lastEl = document.querySelectorAll("[data-snap-step]")[steps.length - 1];
      const lastBottom =
        lastEl instanceof HTMLElement
          ? last.top + lastEl.offsetHeight
          : last.top + window.innerHeight;
      return scrollY >= first - window.innerHeight * 0.15 && scrollY < lastBottom;
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

    const isSnapFree = (scrollY) =>
      [...document.querySelectorAll("[data-snap-free]")].some((el) => {
        if (!(el instanceof HTMLElement)) return false;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const bottom = top + el.offsetHeight;
        return scrollY >= top && scrollY < bottom;
      });

    const snapOneStep = (progress, direction) => {
      const steps = getStepPoints();
      if (!steps.length) return progress;

      settledStepIndex = gsap.utils.clamp(0, steps.length - 1, settledStepIndex);

      if (direction >= 0) {
        const from = settledStepIndex;
        const to = Math.min(from + 1, steps.length - 1);
        if (from === to) return steps[from].progress;

        const prev = steps[from].progress;
        const next = steps[to].progress;
        const local = (progress - prev) / Math.max(next - prev, 1e-6);
        return local >= STEP_SNAP_THRESHOLD ? next : prev;
      }

      const from = settledStepIndex;
      const to = Math.max(from - 1, 0);
      if (from === to) return steps[from].progress;

      const prev = steps[to].progress;
      const next = steps[from].progress;
      const local = (progress - prev) / Math.max(next - prev, 1e-6);
      return local <= 1 - STEP_SNAP_THRESHOLD ? prev : next;
    };

    const setup = () => {
      teardown();
      document.documentElement.style.scrollBehavior = "auto";
      settledStepIndex = 0;

      if (mobileMq.matches || motionMq.matches) {
        document.documentElement.style.scrollBehavior = "smooth";
        ScrollTrigger.refresh();
        syncSettledStep(window.scrollY);
        return;
      }

      lenis = new Lenis({
        lerp: 0.12,
        wheelMultiplier: 0.55,
        touchMultiplier: 0.75,
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
            if (isProtected(self.scroll()) || isSnapFree(self.scroll())) {
              return progress;
            }

            /* Call → Voices → FAQ: one wheel = one section max */
            if (pathname === "/" && isInStepRegion(self.scroll())) {
              syncSettledStep(self.scroll());
              return snapOneStep(progress, self.direction);
            }

            const points = getSnapPoints();
            const last = points[points.length - 1];
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
          duration: { min: 0.14, max: 0.26 },
          delay: 0,
          ease: "power3.out",
          directional: true,
          inertia: false,
          onComplete: (self) => {
            if (pathname === "/" && isInStepRegion(self.scroll())) {
              syncSettledStep(self.scroll());
            }
          },
        },
      });

      ScrollTrigger.refresh();
      syncSettledStep(window.scrollY);
    };

    setup();
    mobileMq.addEventListener("change", setup);
    motionMq.addEventListener("change", setup);
    window.addEventListener("load", setup);

    return () => {
      window.removeEventListener("load", setup);
      mobileMq.removeEventListener("change", setup);
      motionMq.removeEventListener("change", setup);
      document.documentElement.style.scrollBehavior = "";
      teardown();
    };
  }, [pathname]);

  return null;
}
