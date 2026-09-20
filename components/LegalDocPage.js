"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./LegalDocPage.module.css";

export default function LegalDocPage({
  title,
  effectiveDate,
  sections,
  navLabel = "Sections",
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.35, 0.6],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-label={title} data-nav-tone="dark">
        <div className={styles.heroInner}>
          <ScrollReveal
            as="h1"
            className={styles.title}
            once
            baseOpacity={0.12}
            enableBlur
            baseRotation={0}
            blurStrength={4}
          >
            {title}
          </ScrollReveal>
          <ScrollReveal
            as="p"
            className={styles.effective}
            once
            baseOpacity={0.15}
            enableBlur
            baseRotation={0}
            blurStrength={3}
          >
            {effectiveDate}
          </ScrollReveal>
        </div>
        <svg
          className={styles.heroCurve}
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,120 L0,78 Q720,-8 1440,78 L1440,120 Z"
            fill="#f8f0e5"
          />
        </svg>
      </section>

      <section className={styles.body}>
        <div className={styles.layout}>
          <nav className={styles.nav} aria-label={navLabel}>
            <ul className={styles.navList}>
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    className={`${styles.navItem} ${
                      activeId === section.id ? styles.navItemActive : ""
                    }`}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.content}>
            {sections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className={styles.section}
              >
                <ScrollReveal
                  as="h2"
                  className={styles.heading}
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
                    className={styles.copy}
                    once
                    baseOpacity={0.15}
                    enableBlur
                    baseRotation={0}
                    blurStrength={3}
                  >
                    {section.intro}
                  </ScrollReveal>
                ) : null}
                {section.body?.map((paragraph) => (
                  <ScrollReveal
                    key={paragraph.slice(0, 48)}
                    as="p"
                    className={styles.copy}
                    once
                    baseOpacity={0.15}
                    enableBlur
                    baseRotation={0}
                    blurStrength={3}
                  >
                    {paragraph}
                  </ScrollReveal>
                ))}
                {section.subsections?.map((sub) => (
                  <div key={sub.title} className={styles.subblock}>
                    <ScrollReveal
                      as="h3"
                      className={styles.subheading}
                      once
                      baseOpacity={0.12}
                      enableBlur
                      baseRotation={0}
                      blurStrength={4}
                    >
                      {sub.title}
                    </ScrollReveal>
                    <ScrollReveal
                      as="p"
                      className={styles.copy}
                      once
                      baseOpacity={0.15}
                      enableBlur
                      baseRotation={0}
                      blurStrength={3}
                    >
                      {sub.body}
                    </ScrollReveal>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
