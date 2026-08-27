"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { MEETING_URL } from "@/lib/meeting";
import styles from "./ContactModal.module.css";

const ContactModalContext = createContext({
  open: () => {},
  close: () => {},
  isOpen: false,
});

export function useContactModal() {
  return useContext(ContactModalContext);
}

export function ContactModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <ContactModalContext.Provider value={{ open, close, isOpen }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={close} />
    </ContactModalContext.Provider>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.5 3.8h2.2l1.1 3.2-1.6 1.1a12.4 12.4 0 0 0 5.7 5.7l1.1-1.6 3.2 1.1v2.2c0 .7-.6 1.4-1.3 1.5-7.2.9-13.2-5.1-12.3-12.3.1-.7.8-1.3 1.5-1.3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s6.5-5.2 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10.8" r="2.1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7.5 12 13l8-5.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10 14a5 5 0 0 0 7.07 0l1.42-1.41a5 5 0 0 0-7.07-7.08L10.2 6.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M14 10a5 5 0 0 0-7.07 0L5.5 11.42a5 5 0 0 0 7.07 7.07L13.8 17.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const INFO = [
  {
    label: "Phone",
    value: "Book a call with the team",
    href: MEETING_URL,
    Icon: PhoneIcon,
    tone: "purple",
  },
  {
    label: "Address",
    value: "B-11, 1st Floor, KDA Scheme 1-A Ext., Opp. National Stadium, Karachi",
    Icon: PinIcon,
    tone: "blue",
  },
  {
    label: "Email",
    value: "info@ai-voxa.com",
    href: "mailto:info@ai-voxa.com",
    Icon: MailIcon,
    tone: "green",
  },
  {
    label: "Visit us",
    value: "ai-voxa.com",
    href: "https://ai-voxa.com",
    Icon: LinkIcon,
    tone: "gold",
  },
];

function ContactModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) setSent(false);
  }, [isOpen]);

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`VOXA inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`,
    );
    window.location.href = `mailto:info@ai-voxa.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
      onClick={onClose}
    >
      <div
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className={styles.company}>
          <h2 id="contact-title" className={styles.heading}>
            Company information
          </h2>
          <div className={styles.cards}>
            {INFO.map((item) => {
              const inner = (
                <>
                  <span className={`${styles.icon} ${styles[item.tone]}`}>
                    <item.Icon />
                  </span>
                  <span className={styles.cardLabel}>{item.label}</span>
                  <span className={styles.cardValue}>{item.value}</span>
                </>
              );
              return item.href ? (
                <a key={item.label} href={item.href} className={styles.card} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                  {inner}
                </a>
              ) : (
                <div key={item.label} className={styles.card}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.formCol}>
          <h2 className={styles.heading}>Personal information</h2>
          {sent ? (
            <p className={styles.thanks}>Thanks — your email client should open with the message ready to send.</p>
          ) : (
            <form className={styles.form} onSubmit={onSubmit}>
              <label className={styles.field}>
                <span>Enter your full name</span>
                <input name="name" type="text" placeholder="Your name" required />
              </label>
              <label className={styles.field}>
                <span>Enter your email address</span>
                <input name="email" type="email" placeholder="you@company.com" required />
              </label>
              <label className={styles.field}>
                <span>Company Name</span>
                <input name="company" type="text" placeholder="Company" />
              </label>
              <label className={styles.field}>
                <span>Message</span>
                <textarea name="message" rows={4} placeholder="Type here" required />
              </label>
              <button type="submit" className={styles.submit}>
                <span>Submit request</span>
                <span className={styles.submitArrow} aria-hidden="true">
                  ↗
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function ContactUsButton({ className, children = "Contact us" }) {
  const { open } = useContactModal();
  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}
