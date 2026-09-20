"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scheduleSectionHashScroll } from "@/lib/scrollToSection";
import ScrollReveal from "@/components/ScrollReveal";
import rail from "./OrbShowcaseRail.module.css";
import copy from "./AboutPromise.module.css";
import stack from "./SolutionsIndustries.module.css";

const REAL_ESTATE = {
  id: "real-estate",
  title: "Real Estate",
  intro:
    "Leads come in all day, but your team can only call back so many, so fast. VOXA answers every lead within seconds, asks the right qualifying questions, and sends only the interested, ready-to-buy leads to your sales team.",
  points: [
    "Every lead contacted within seconds — day or night",
    "Every lead qualified the same way, every time",
    "Qualified leads sent straight to your CRM",
    "Your team only speaks to leads worth their time",
  ],
  photos: {
    front: "/images/solutions/real-estate-front.webp",
    back: "/images/solutions/real-estate-back.webp",
    frontAlt: "Modern home for real estate",
    backAlt: "City skyline for real estate",
  },
};

const ECOMMERCE = {
  id: "e-commerce",
  title: "E-Commerce",
  intro:
    "Orders that go unconfirmed lead to returns, and feedback that goes uncollected leads to lost customers. VOXA calls every order before it ships, confirms the details, and follows up after delivery.",
  points: [
    "Every order confirmed before it reaches dispatch",
    "Address and delivery changes captured automatically",
    "Structured feedback collected after every delivery",
    "Customers ready to reorder flagged for follow-up",
  ],
  photos: {
    front: "/images/solutions/e-commerce-front.webp",
    back: "/images/solutions/e-commerce-back.webp",
    frontAlt: "Online shopping on a laptop",
    backAlt: "Digital checkout and payments",
  },
};

function Arrow() {
  return (
    <span className={copy.pointArrow} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12h12M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function IndustryPanel({ data }) {
  return (
    <div id={data.id} className={stack.panelInner}>
      <div className={stack.copyCol}>
        <ScrollReveal
          as="h2"
          className={`${copy.title} ${stack.heading}`}
          once
          baseOpacity={0.12}
          enableBlur
          baseRotation={0}
          blurStrength={4}
        >
          {data.title}
        </ScrollReveal>
        <ScrollReveal
          as="p"
          className={`${copy.intro} ${stack.lede}`}
          once
          baseOpacity={0.15}
          enableBlur
          baseRotation={0}
          blurStrength={3}
        >
          {data.intro}
        </ScrollReveal>
        <ol className={`${copy.list} ${copy.listPlain} ${copy.listBullets}`}>
          {data.points.map((line) => (
            <li key={line} className={copy.item}>
              <Arrow />
              <ScrollReveal
                as="p"
                className={copy.point}
                once
                baseOpacity={0.15}
                enableBlur
                baseRotation={0}
                blurStrength={3}
              >
                {line}
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
      {data.photos ? (
        <div className={stack.stack}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={stack.back}
            src={data.photos.back}
            alt={data.photos.backAlt}
            loading="lazy"
            decoding="async"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={stack.front}
            src={data.photos.front}
            alt={data.photos.frontAlt}
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}
    </div>
  );
}

export default function SolutionsIndustries() {
  const rootRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const slider = sliderRef.current;
    if (!root || !slider) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash === "e-commerce") {
        gsap.set(slider, { xPercent: -50 });
      }
      const clearHashScroll = scheduleSectionHashScroll(window.location.hash);
      let clearHashChange = () => {};
      const onHashChange = () => {
        clearHashChange();
        clearHashChange = scheduleSectionHashScroll(window.location.hash);
      };
      window.addEventListener("hashchange", onHashChange);
      return () => {
        clearHashScroll();
        clearHashChange();
        window.removeEventListener("hashchange", onHashChange);
      };
    }

    const ctx = gsap.context(() => {
      gsap.set(slider, { xPercent: 0 });

      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "solutions-rail",
          trigger: root,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
        .to({}, { duration: 0.25 })
        .to(slider, { xPercent: -50, duration: 1, ease: "power2.inOut" })
        .to({}, { duration: 0.25 });
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    const refreshAgain = window.setTimeout(() => ScrollTrigger.refresh(), 280);
    let clearHashScroll = scheduleSectionHashScroll(window.location.hash);
    const onHashChange = () => {
      clearHashScroll();
      clearHashScroll = scheduleSectionHashScroll(window.location.hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.clearTimeout(refresh);
      window.clearTimeout(refreshAgain);
      clearHashScroll();
      window.removeEventListener("hashchange", onHashChange);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={rail.track}
      aria-label="Solutions by industry"
      data-snap-section
      data-snap-protect
    >
      <div className={rail.pin}>
        <div ref={sliderRef} className={rail.slider}>
          <div className={rail.panel} data-panel>
            <IndustryPanel data={REAL_ESTATE} />
          </div>
          <div className={rail.panel} data-panel>
            <IndustryPanel data={ECOMMERCE} />
          </div>
        </div>
      </div>
    </section>
  );
}
