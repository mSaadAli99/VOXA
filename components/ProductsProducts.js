"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scheduleSectionHashScroll } from "@/lib/scrollToSection";
import TalkToUsButton from "@/components/TalkToUsButton";
import ScrollReveal from "@/components/ScrollReveal";
import rail from "./OrbShowcaseRail.module.css";
import copy from "./AboutPromise.module.css";
import stack from "./SolutionsIndustries.module.css";
import styles from "./ProductsProducts.module.css";

const VOICE_AGENT = {
  id: "voice-agent",
  title: "VOXA Voice Agent Platform",
  intro:
    "An AI voice agent that answers and makes calls for your business. It handles the conversation, captures the details, and updates your systems automatically.",
  points: [
    "Inbound calls — answered instantly, every time",
    "Outbound calls — leads and orders called automatically",
    "Callbacks — scheduled and handled with full context",
    "Data capture — every call turned into structured, usable data",
    "CRM & notifications — data and alerts sent where your team works",
    "Dashboards — a live view of your calls and captured data",
  ],
  compact: true,
  showCta: true,
  photos: {
    front: "/images/products/voice-agent-platform.webp",
    back: "/images/products/voice-agent-front.webp",
    frontAlt: "VOXA Voice Agent Platform",
    backAlt: "Voice agent conversation interface",
  },
};

const COMMS_SUITE = {
  id: "communications-suite",
  title: "VOXA Communications Suite",
  intro:
    "One platform for every conversation your business runs — calling, CRM, customer engagement, and AI automation. Built for contact centers and enterprises that need it all in one place.",
  fullWidth: true,
};

const FEATURE_SECTIONS = [
  {
    id: "ip-telephony",
    title: "IP Telephony",
    intro: "Calling infrastructure for inbound and outbound conversations.",
    points: [
      "Inbound & outbound calling",
      "Smart call routing & IVR",
      "Call recording & live monitoring",
    ],
    image: "/images/products/ip-telephony.webp",
    imageAlt: "Cloud PBX calling infrastructure",
    contentSide: "left",
  },
  {
    id: "crm",
    title: "CRM",
    intro: "Every customer, call, and ticket, in one place.",
    points: [
      "360° customer view",
      "Unified interaction history",
      "Connects to your existing systems",
    ],
    image: "/images/products/crm.webp",
    imageAlt: "CRM over a connected cityscape",
    contentSide: "right",
  },
  {
    id: "omni-channel",
    title: "Omni-Channel",
    intro: "Voice and digital channels, managed from one screen.",
    points: [
      "One inbox for every channel",
      "Smart routing & reporting",
    ],
    image: "/images/products/omni-channel.webp",
    imageAlt: "Omni-channel voice and digital connections",
    contentSide: "left",
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    intro: "Intelligence built into every conversation.",
    points: [
      "Speech-to-text & sentiment analysis",
      "Voice bots & AI chatbots",
      "Automatic call summaries & insights",
    ],
    image: "/images/products/ai-automation.webp",
    imageAlt: "AI automation on the factory floor",
    contentSide: "right",
    showCta: true,
  },
];

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

function FeatureRow({ section }) {
  return (
    <div
      className={`${styles.featureRow} ${
        section.contentSide === "right" ? styles.featureRowFlip : ""
      }`}
    >
      <div className={styles.featureCopy}>
        <ScrollReveal
          as="h2"
          className={styles.featureTitle}
          once
          baseOpacity={0.12}
          enableBlur
          baseRotation={0}
          blurStrength={4}
        >
          {section.title}
        </ScrollReveal>
        {section.intro ? (
          <ScrollReveal
            as="p"
            className={styles.featureIntro}
            once
            baseOpacity={0.15}
            enableBlur
            baseRotation={0}
            blurStrength={3}
          >
            {section.intro}
          </ScrollReveal>
        ) : null}
          {section.points?.length ? (
          <ol className={`${copy.list} ${copy.listPlain} ${copy.listBullets}`}>
            {section.points.map((line) => (
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
        ) : null}
        {section.showCta ? (
          <div className={`${copy.cta} ${styles.cta}`}>
            <TalkToUsButton />
          </div>
        ) : null}
      </div>
      {section.image ? (
        <div className={styles.featureMedia}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.featureImage}
            src={section.image}
            alt={section.imageAlt || ""}
            loading="lazy"
            decoding="async"
            data-photo
          />
        </div>
      ) : null}
    </div>
  );
}

function ProductPanel({ data }) {
  return (
    <div
      id={data.id}
      className={`${stack.panelInner} ${data.compact ? styles.tight : ""} ${
        data.fullWidth ? styles.wide : ""
      }`}
    >
      <div
        className={
          data.fullWidth
            ? styles.wideCopy
            : `${stack.copyCol} ${data.compact ? styles.tightCopy : ""}`
        }
      >
        <ScrollReveal
          as="h2"
          className={`${copy.title} ${stack.heading} ${
            data.fullWidth ? styles.wideTitle : ""
          }`}
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
          className={`${copy.intro} ${stack.lede} ${
            data.fullWidth ? styles.wideIntro : ""
          }`}
          once
          baseOpacity={0.15}
          enableBlur
          baseRotation={0}
          blurStrength={3}
        >
          {data.intro}
        </ScrollReveal>
        {data.points?.length ? (
        <ol
          className={`${copy.list} ${copy.listPlain} ${copy.listBullets} ${
            data.compact ? copy.listCompact : ""
          }`}
        >
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
        ) : null}
        {data.showCta ? (
          <div className={`${copy.cta} ${styles.cta}`}>
            <TalkToUsButton />
          </div>
        ) : null}
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

export default function ProductsProducts() {
  const rootRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const slider = sliderRef.current;
    if (!root || !slider) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash === "communications-suite") {
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
          id: "products-rail",
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
    <>
      <section
        ref={rootRef}
        className={rail.track}
        aria-label="VOXA products"
        data-snap-section
        data-snap-protect
      >
        <div className={rail.pin}>
          <div ref={sliderRef} className={rail.slider}>
            <div className={rail.panel} data-panel>
              <ProductPanel data={VOICE_AGENT} />
            </div>
            <div className={rail.panel} data-panel>
              <ProductPanel data={COMMS_SUITE} />
            </div>
          </div>
        </div>
      </section>
      {FEATURE_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={styles.featureSection}
          aria-label={section.title}
          data-snap-section
        >
          <FeatureRow section={section} />
        </section>
      ))}
    </>
  );
}
