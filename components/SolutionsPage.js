"use client";

import dynamic from "next/dynamic";
import OrbHero from "@/components/OrbHero";
import styles from "./AboutPage.module.css";

const SolutionsIndustries = dynamic(
  () => import("@/components/SolutionsIndustries"),
);
const OrbFAQ = dynamic(() => import("@/components/OrbFAQ"));

const SOLUTIONS_FAQS = [
  {
    q: "Which industries does VOXA serve?",
    a: "VOXA is built for two industries first: real estate and e-commerce — where leads, orders, and follow-ups arrive faster than a team can call back.",
  },
  {
    q: "How does VOXA help real estate teams?",
    a: "Every lead is contacted within seconds, qualified the same way every time, and sent to your CRM. Your team only speaks to people who are actually ready to talk.",
  },
  {
    q: "How does VOXA help e-commerce teams?",
    a: "VOXA confirms orders before they ship, captures address and delivery changes, and collects structured feedback after delivery so returns drop and repeat buyers surface.",
  },
  {
    q: "Will this replace our sales or support team?",
    a: "No. VOXA handles the first conversation and the follow-up grind. Your people stay on the conversations that close deals and keep customers.",
  },
  {
    q: "How quickly can we go live?",
    a: "A focused playbook — lead qualification or order confirmation — can be in a pilot fast. We expand to more workflows once the first one is running cleanly.",
  },
];

export default function SolutionsPage() {
  return (
    <main className={styles.page}>
      <OrbHero
        title="Solutions"
        description="VOXA is built for two industries: real estate and e-commerce."
      />
      <SolutionsIndustries />
      <OrbFAQ items={SOLUTIONS_FAQS} />
    </main>
  );
}
