"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TalkToUsButton from "@/components/TalkToUsButton";
import styles from "./Navbar.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/solutions", label: "Solutions" },
  { href: "/products", label: "Products" },
  { href: "/technology", label: "Technology" },
];

const DARK_HERO_PAGES = new Set([
  "/",
  "/about",
  "/solutions",
  "/products",
  "/technology",
]);

function isActiveLink(pathname, href) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isOverCreamBackground() {
  /* Probe below the navbar, centered — avoid left hero copy (cream flip pill). */
  const probeY = Math.min(110, Math.floor(window.innerHeight * 0.14));
  const probeX = Math.floor(window.innerWidth / 2);
  const el = document.elementFromPoint(probeX, probeY);
  if (!el) return false;

  let node = el;
  while (node && node !== document.documentElement) {
    if (node instanceof HTMLElement) {
      if (node.matches("header") || node.closest("header")) {
        node = node.parentElement;
        continue;
      }

      const tone = node.getAttribute("data-nav-tone");
      if (tone === "dark") return false;
      if (tone === "light") return true;

      /* Page shells are cream under the dark hero — ignore them. */
      if (
        node === document.body ||
        node === document.documentElement ||
        node.classList.contains("site-root")
      ) {
        node = node.parentElement;
        continue;
      }

      const bg = window.getComputedStyle(node).backgroundColor;
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
      if (match) {
        const r = Number(match[1]);
        const g = Number(match[2]);
        const b = Number(match[3]);
        const alphaMatch = bg.match(/rgba\([^)]+,\s*([0-9.]+)\)/i);
        const alpha = alphaMatch ? Number(alphaMatch[1]) : 1;
        /* Only trust large section fills — ignore small cream pills/chips. */
        const coversViewport =
          node.clientHeight >= window.innerHeight * 0.35 ||
          node.matches("section, main, [data-snap-section]");
        if (alpha > 0.2 && coversViewport) {
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          return luminance > 0.72;
        }
      }
    }
    node = node.parentElement;
  }
  return false;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [onLight, setOnLight] = useState(!DARK_HERO_PAGES.has(pathname));

  useEffect(() => {
    links.forEach((link) => router.prefetch(link.href));
    router.prefetch("/contact");
  }, [router]);

  useEffect(() => {
    setOpen(false);

    if (!DARK_HERO_PAGES.has(pathname)) {
      setOnLight(true);
      return undefined;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const header = document.querySelector("header");
      const prev = header instanceof HTMLElement ? header.style.pointerEvents : "";
      if (header instanceof HTMLElement) header.style.pointerEvents = "none";
      const light = isOverCreamBackground();
      if (header instanceof HTMLElement) header.style.pointerEvents = prev;
      setOnLight(light);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    /* Re-check after layout/paint so hero video/poster is in place. */
    const boot = window.setTimeout(update, 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.clearTimeout(boot);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <header
      className={`${styles.steelHeader} ${onLight ? styles.steelHeaderLight : ""}`}
    >
      <nav className={styles.steelNav} aria-label="Primary">
        <Link
          href="/"
          className={styles.steelLogo}
          onClick={() => setOpen(false)}
        >
          <Image
            src={onLight ? "/images/logo-navy.webp" : "/images/logo-white-nav.webp"}
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
              onClick={() => setOpen(false)}
              className={styles.steelCtaFull}
            />
          </li>
        </ul>

        <TalkToUsButton className={styles.steelCtaDesktop} />

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
    </header>
  );
}
