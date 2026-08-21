"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import TalkToUsButton from "@/components/TalkToUsButton";
import { useTheme } from "@/components/ThemeProvider";
import styles from "./Navbar.module.css";

const links = [
  { href: "/", label: "Homepage" },
  { href: "/#what-voxa-does", label: "About" },
  { href: "/#our-solutions", label: "Solutions" },
  { href: "/#our-products", label: "Products" },
  { href: "/technology", label: "Technology" },
];

function isActiveLink(pathname, href) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [orbHidden, setOrbHidden] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (theme !== "orb") {
      setOrbHidden(false);
      return undefined;
    }

    const onScroll = () => {
      const y = window.scrollY;
      // Only show navbar at the top of the hero — never reappear on scroll-up
      // in lower sections once you've left the hero.
      if (y <= 24) {
        setOrbHidden(false);
      } else {
        setOrbHidden(true);
        setOpen(false);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [theme]);

  if (theme === "orb") {
    return (
      <header
        className={`${styles.steelHeader} ${orbHidden ? styles.steelHeaderHidden : ""}`}
      >
        <nav className={styles.steelNav} aria-label="Primary">
          <Link
            href="/"
            className={styles.steelLogo}
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/logo-white-nav.png?v=1"
              alt="VOXA"
              width={140}
              height={36}
              className={styles.steelLogoImage}
              priority
              unoptimized
            />
          </Link>

          <ul className={`${styles.steelLinks} ${open ? styles.steelLinksOpen : ""}`}>
            {links.map((link) => {
              const active = isActiveLink(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.steelLink} ${active ? styles.steelActive : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className={styles.steelMobileCta}>
              <TalkToUsButton
                href="/#talk"
                onClick={() => setOpen(false)}
                className={styles.steelCtaFull}
              />
            </li>
          </ul>

          <TalkToUsButton href="/#talk" className={styles.steelCtaDesktop} />

          <button
            type="button"
            className={styles.steelToggle}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </nav>
        <div className={styles.steelRule} aria-hidden="true" />
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary">
        <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="VOXA"
            width={206}
            height={32}
            className={styles.logoImage}
            priority
          />
        </Link>

        <div className={`${styles.menu} ${open ? styles.menuOpen : ""}`}>
          <ul className={styles.links}>
            {links.map((link) => {
              const active = isActiveLink(pathname, link.href);
              return (
                <li key={link.href}>
                  <ScrollReveal
                    as={Link}
                    href={link.href}
                    className={`${styles.link} ${active ? styles.active : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    baseOpacity={0.1}
                    enableBlur
                    baseRotation={3}
                    blurStrength={4}
                  >
                    {link.label}
                  </ScrollReveal>
                </li>
              );
            })}
          </ul>
          <TalkToUsButton
            href="/#talk"
            onClick={() => setOpen(false)}
          />
        </div>

        <button
          type="button"
          className={styles.toggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}
