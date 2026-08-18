"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import "lenis/dist/lenis.css";

const SNAP_THRESHOLD = 0.45;

export default function SmoothSnapScroll() {
  useEffect(() => {
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
        const top = el.getBoundingClientRect().top + window.scrollY;
        points.push(gsap.utils.clamp(0, 1, top / max));
      });
      points.push(1);

      return [...new Set(points.map((value) => Number(value.toFixed(4))))].sort(
        (a, b) => a - b,
      );
    };

    const isProtected = (scrollY) => {
      const vh = window.innerHeight;

      return [...document.querySelectorAll("[data-snap-protect]")].some((el) => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        const bottom = top + el.offsetHeight;
        return scrollY > top + vh * 0.12 && scrollY < bottom - vh * 0.12;
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
        lerp: 0.09,
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
          duration: { min: 0.6, max: 0.8 },
          delay: 0.08,
          ease: "power3.inOut",
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

    return () => {
      window.removeEventListener("load", setup);
      mobileMq.removeEventListener("change", setup);
      motionMq.removeEventListener("change", setup);
      document.documentElement.style.scrollBehavior = "";
      teardown();
    };
  }, []);

  return null;
}
