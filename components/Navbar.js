"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Navbar.module.css";

const links = [
  { href: "/", label: "Homepage" },
  { href: "/#what-voxa-does", label: "About" },
  { href: "/#our-solutions", label: "Solutions" },
  { href: "/#our-products", label: "Products" },
  { href: "/technology", label: "Technology" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.link} ${pathname === link.href ? styles.active : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#talk" className={styles.cta} onClick={() => setOpen(false)}>
            Talk to us
          </Link>
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
