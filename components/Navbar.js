"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

function isActiveLink(pathname, href) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const onLight = !["/", "/about", "/solutions", "/products", "/technology"].includes(
    pathname,
  );

  useEffect(() => {
    if (onLight) {
      setHidden(false);
      return undefined;
    }

    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 24) {
        setHidden(false);
      } else {
        setHidden(true);
        setOpen(false);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onLight]);

  return (
    <header
      className={`${styles.steelHeader} ${hidden ? styles.steelHeaderHidden : ""} ${onLight ? styles.steelHeaderLight : ""}`}
    >
      <nav className={styles.steelNav} aria-label="Primary">
        <Link
          href="/"
          className={styles.steelLogo}
          onClick={() => setOpen(false)}
        >
          <Image
            src={onLight ? "/images/logo-navy.png?v=1" : "/images/logo-white-nav.png?v=1"}
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
      <div className={styles.steelRule} aria-hidden="true" />
    </header>
  );
}
