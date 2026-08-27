import Link from "next/link";
import styles from "./NotFoundPage.module.css";

function FingerprintIcon() {
  return (
    <svg
      className={styles.mark}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 14c-4.4 0-8 3.2-8 8.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M32 22.2c0-5-3.6-8.2-8-8.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M16.8 26.5c.4 6.2 3.4 10.6 7.2 10.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M31.2 24.8c-.2 7.4-3.6 13.4-7.2 13.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M20.2 21.6c.6 5.8 2.2 9.6 3.8 9.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M27.6 20.8c-.4 6.8-1.8 12.2-3.6 12.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <ellipse
        cx="24"
        cy="24"
        rx="13.5"
        ry="16"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export default function NotFoundPage() {
  return (
    <section className={styles.page} data-page="not-found" aria-label="Page not found">
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.horizon} aria-hidden="true" />

      <div className={styles.copy}>
        <p className={styles.code}>404</p>
        <p className={styles.message}>It seems you got a little bit lost</p>
      </div>

      <div className={styles.action}>
        <FingerprintIcon />
        <Link href="/" className={styles.home}>
          Go back to homepage
        </Link>
      </div>
    </section>
  );
}
