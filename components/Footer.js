import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const links = [
  { href: "/", label: "Homepage" },
  { href: "/#what-voxa-does", label: "About" },
  { href: "/#our-products", label: "Products" },
  { href: "/#our-solutions", label: "Solutions" },
  { href: "/technology", label: "Technology" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo.png"
              alt="VOXA"
              width={206}
              height={32}
              className={styles.logoImage}
            />
          </Link>

          <nav aria-label="Footer">
            <ul className={styles.links}>
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link href="/#talk" className={styles.cta}>
            Talk to us
          </Link>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>{`\u00A9 ${year} VOXA. All rights reserved.`}</p>
          <p className={styles.tag}>Turns conversations into execution.</p>
        </div>
      </div>
    </footer>
  );
}
