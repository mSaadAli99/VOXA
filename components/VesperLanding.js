"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import TalkToUsButton from "@/components/TalkToUsButton";
import styles from "./VesperLanding.module.css";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4";

const links = [
  { href: "/", label: "Homepage", appear: "appear--scale", delay: "0.16s" },
  { href: "/#what-voxa-does", label: "About", appear: "appear--soft", delay: "0.28s" },
  { href: "/#our-solutions", label: "Solutions", appear: "appear--scale", delay: "0.40s" },
  { href: "/#our-products", label: "Products", appear: "appear--soft", delay: "0.52s" },
  { href: "/technology", label: "Technology", appear: "appear--scale", delay: "0.64s" },
];

export default function VesperLanding() {
  const { theme } = useTheme();
  const rootRef = useRef(null);

  useEffect(() => {
    if (theme !== "vesper") return undefined;
    const root = rootRef.current;
    if (!root) return undefined;

    const body = document.body;
    const burger = root.querySelector("[data-vesper-burger]");
    const nav = root.querySelector("#site-nav");
    const desktopMq = window.matchMedia("(min-width: 901px)");

    const setOpen = (open) => {
      body.classList.toggle("menu-open", open);
      if (burger) {
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      }
    };

    const close = () => setOpen(false);
    const onBurger = () => setOpen(!body.classList.contains("menu-open"));
    const onKey = (event) => {
      if (event.key === "Escape") close();
    };
    const onNavClick = (event) => {
      if (event.target.closest("a")) close();
    };
    const onResize = () => {
      if (desktopMq.matches) close();
    };

    burger?.addEventListener("click", onBurger);
    nav?.addEventListener("click", onNavClick);
    window.addEventListener("keydown", onKey);
    desktopMq.addEventListener("change", onResize);

    const appears = [...root.querySelectorAll(".appear, .hero-photo")];
    const onEnd = (event) => {
      event.currentTarget.classList.add("is-in");
    };
    appears.forEach((el) => {
      el.addEventListener("animationend", onEnd, { once: true });
    });

    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const stalled = appears.every((el) => {
          const running = el.getAnimations?.() ?? [];
          return !running.some(
            (anim) => anim.playState === "running" || anim.playState === "finished",
          );
        });
        if (stalled) appears.forEach((el) => el.classList.add("is-in"));
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      burger?.removeEventListener("click", onBurger);
      nav?.removeEventListener("click", onNavClick);
      window.removeEventListener("keydown", onKey);
      desktopMq.removeEventListener("change", onResize);
      appears.forEach((el) => el.removeEventListener("animationend", onEnd));
      body.classList.remove("menu-open");
    };
  }, [theme]);

  if (theme !== "vesper") return null;

  return (
    <div className={styles.track} data-snap-protect>
    <div
      ref={rootRef}
      className={styles.wrap}
      id="hero"
      data-snap-section
    >
      <div className={`${styles.heroPhoto} hero-photo`}>
        <video autoPlay muted loop playsInline src={HERO_VIDEO} />
      </div>

      <div className={styles.page}>
        <div className={styles.backdrop} />

        <header className={styles.header}>
          <Link
            href="/"
            className={`${styles.logo} appear appear--scale`}
            style={{ "--d": "0.08s" }}
            aria-label="VOXA"
          >
            <Image
              src="/logo.png"
              alt="VOXA"
              width={206}
              height={32}
              className={styles.logoImage}
              priority
            />
          </Link>

          <nav id="site-nav" className={styles.nav} aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} appear ${link.appear}`}
                style={{ "--d": link.delay }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <TalkToUsButton
            href="#talk"
            className={`${styles.headerCta} appear appear--scale`}
            style={{ "--d": "0.34s" }}
          />

          <button
            type="button"
            className={`${styles.burger} appear appear--scale`}
            style={{ "--d": "0.34s" }}
            data-vesper-burger
            aria-controls="site-nav"
            aria-expanded="false"
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
        </header>

        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={`${styles.markWrap} appear appear--pop`} style={{ "--d": "0.22s" }}>
              <Image
                src="/logomark.png"
                alt=""
                width={160}
                height={91}
                className={styles.heroMark}
                priority
              />
            </div>

            <h1 className={styles.headline}>
              <span
                className={`${styles.headlineLine} appear appear--mask`}
                style={{ "--d": "0.42s" }}
              >
                Turns conversations into execution.
              </span>
            </h1>

            <p
              className={`${styles.lede} appear appear--soft`}
              style={{ "--d": "0.82s" }}
            >
              VOXA is a voice agent platform. It handles your business&apos;s
              phone calls — qualifying leads, confirming orders, following up —
              automatically, and turns every call into structured data your team
              can use.
            </p>

            <div className={styles.heroActions}>
              <TalkToUsButton
                href="#talk"
                id="talk"
                className={`${styles.heroBtn} appear appear--btn`}
                style={{ "--d": "0.96s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
