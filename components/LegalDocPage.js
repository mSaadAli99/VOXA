"use client";

import { useEffect, useState } from "react";
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
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.effective}>{effectiveDate}</p>
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
                <h2 className={styles.heading}>{section.title}</h2>
                {section.intro ? (
                  <p className={styles.copy}>{section.intro}</p>
                ) : null}
                {section.body?.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className={styles.copy}>
                    {paragraph}
                  </p>
                ))}
                {section.subsections?.map((sub) => (
                  <div key={sub.title} className={styles.subblock}>
                    <h3 className={styles.subheading}>{sub.title}</h3>
                    <p className={styles.copy}>{sub.body}</p>
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
