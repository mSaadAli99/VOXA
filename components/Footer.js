import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const columns = [
  {
    title: "Products",
    links: [
      { href: "/products#voice-agent", label: "Voice Agent" },
      { href: "/products#communications-suite", label: "Communications Suite" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/solutions#real-estate", label: "Real Estate" },
      { href: "/solutions#e-commerce", label: "E-Commerce" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#what-voxa-does", label: "About" },
      { href: "/technology", label: "Technology" },
      { href: "/#talk", label: "Contact" },
    ],
  },
  {
    title: " ",
    links: [
      { href: "#", label: "LinkedIn" },
      { href: "#", label: "Instagram" },
    ],
  },
  {
    title: " ",
    links: [
      { href: "#", label: "X" },
      { href: "#", label: "YouTube" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.ctaBlock}>
          <h2 className={styles.headline}>Ready to talk.</h2>
          <Link href="/#talk" className={styles.solid}>
            Contact us
          </Link>
        </div>

        <nav className={styles.columns} aria-label="Footer">
          {columns.map((column, index) => (
            <div key={`${column.title}-${index}`} className={styles.column}>
              {column.title.trim() ? (
                <p className={styles.heading}>{column.title}</p>
              ) : (
                <p className={styles.headingHidden} aria-hidden="true">
                  Social
                </p>
              )}
              <ul className={styles.list}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className={styles.legal}>
          <p className={styles.copy}>{`\u00A9 ${year} VOXA. All rights reserved.`}</p>
          <div className={styles.policies}>
            <Link href="#" className={styles.policy}>
              Terms & Conditions
            </Link>
            <Link href="#" className={styles.policy}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.markWrap}>
        <Image
          src="/images/logo-beige.png"
          alt="VOXA"
          width={1600}
          height={248}
          className={styles.mark}
          unoptimized
        />
      </div>
    </footer>
  );
}
