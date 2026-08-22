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
];

function Icon({ children, className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function LinkedInIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M4.98 3.5A2.48 2.48 0 1 1 2.5 6a2.48 2.48 0 0 1 2.48-2.5ZM5 8.5H2.5V21h2.5V8.5ZM12.5 8.5H10v12.5h2.48v-6.6c0-1.74.33-3.43 2.49-3.43 2.13 0 2.16 1.99 2.16 3.54V21H20v-7.23c0-3.55-.76-6.27-4.41-6.27-1.79 0-2.99.98-3.48 1.91h-.05V8.5Z" />
    </Icon>
  );
}

function InstagramIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.5A3 3 0 0 0 4.5 7.5v9A3 3 0 0 0 7.5 19.5h9a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3h-9ZM12 7.75A4.25 4.25 0 1 1 7.75 12 4.25 4.25 0 0 1 12 7.75Zm0 1.5A2.75 2.75 0 1 0 14.75 12 2.75 2.75 0 0 0 12 9.25ZM17.35 6.4a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z" />
    </Icon>
  );
}

function XIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.56l-5.14-6.7L5.1 22H1.83l8.02-8.57L1.5 2h6.72l4.65 6.14L18.244 2Zm-1.15 18h1.8L7.01 3.91H5.08L17.094 20Z" />
    </Icon>
  );
}

function FacebookIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M14.5 8.25V6.1c0-.72.48-1.1 1.22-1.1H17V2h-2.4C11.9 2 10.5 3.7 10.5 6.3v1.95H8.25V11h2.25v11h3V11h2.4l.35-2.75H14.5Z" />
    </Icon>
  );
}

const socials = [
  { href: "#", label: "Facebook", Icon: FacebookIcon },
  { href: "#", label: "Instagram", Icon: InstagramIcon },
  { href: "#", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "#", label: "X", Icon: XIcon },
];

const AI_PROMPT =
  "What is VOXA? VOXA (https://ai-voxa.com) is a voice agent platform that answers and places business phone calls, qualifies leads, confirms orders, follows up with customers, and writes structured data back to the CRM.";

const AI_QUERY = encodeURIComponent(AI_PROMPT);

const aiLinks = [
  {
    href: `https://chatgpt.com/?q=${AI_QUERY}`,
    label: "Ask ChatGPT about VOXA",
    src: "/icons/ai/openai.svg",
  },
  {
    href: `https://claude.ai/new?q=${AI_QUERY}`,
    label: "Ask Claude about VOXA",
    src: "/icons/ai/claude.svg",
  },
  {
    href: `https://www.perplexity.ai/search?q=${AI_QUERY}`,
    label: "Ask Perplexity about VOXA",
    src: "/icons/ai/perplexity.svg",
  },
  {
    href: `https://www.google.com/search?udm=50&q=${AI_QUERY}`,
    label: "Ask Gemini about VOXA",
    src: "/icons/ai/gemini.svg",
  },
  {
    href: `https://www.meta.ai/?q=${AI_QUERY}`,
    label: "Ask Meta AI about VOXA",
    src: "/icons/ai/meta.svg",
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

        <div className={styles.columns}>
          <div className={styles.contact}>
            <p className={styles.heading}>Contact</p>
            <address className={styles.address}>
              B-11, 1st Floor, KDA Scheme,
              <br />
              1-A, Ext. Opp. National Stadium, Karachi.
            </address>
            <a href="mailto:info@ai-voxa.com" className={styles.email}>
              info@ai-voxa.com
            </a>
          </div>

          <nav className={styles.linkGrid} aria-label="Footer">
            {columns.map((column) => (
              <div key={column.title} className={styles.column}>
                <p className={styles.heading}>{column.title}</p>
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

            <div className={styles.column}>
              <p className={styles.heading}>Socials</p>
              <ul className={styles.list}>
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className={styles.socialLink}
                      aria-label={label}
                    >
                      <Icon className={styles.socialIcon} />
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className={styles.askAi}>
          <p className={styles.askAiTitle}>Ask AI about VOXA</p>
          <div className={styles.askAiRow}>
            {aiLinks.map(({ href, label, src }) => (
              <a
                key={label}
                href={href}
                className={styles.askAiLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className={styles.askAiIcon}
                  width={24}
                  height={24}
                />
              </a>
            ))}
          </div>
        </div>

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
