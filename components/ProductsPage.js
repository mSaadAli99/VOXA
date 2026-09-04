"use client";

import OrbHero from "@/components/OrbHero";
import ProductsProducts from "@/components/ProductsProducts";
import OrbFAQ from "@/components/OrbFAQ";
import styles from "./AboutPage.module.css";

const PRODUCTS_FAQS = [
  {
    q: "What's the difference between the two products?",
    a: "The Voice Agent is an AI that answers and makes calls for real estate and e-commerce. The Communications Suite is the full platform for contact centers and enterprises — calling, CRM, omni-channel, and AI in one place.",
  },
  {
    q: "Who is the Voice Agent for?",
    a: "Businesses that live on inbound and outbound calls: lead follow-up, order confirmation, callbacks, and turning every conversation into structured data.",
  },
  {
    q: "Who is the Communications Suite for?",
    a: "Contact centers and enterprises that need IP telephony, CRM, omni-channel inboxes, and AI automation together — not as five separate tools.",
  },
  {
    q: "Does VOXA replace our CRM?",
    a: "No. VOXA connects to the systems you already use. Calls, tickets, and history stay in one view, and your existing records stay the source of truth.",
  },
  {
    q: "Can we start with one product and add the rest later?",
    a: "Yes. Most teams start with the Voice Agent on a single workflow, then expand into the Communications Suite when they need the full stack.",
  },
];

export default function ProductsPage() {
  return (
    <main className={styles.page}>
      <OrbHero
        title="Products"
        description="VOXA has two products: a voice agent for real estate and e-commerce, and a full communications platform for contact centers and enterprises."
      />
      <ProductsProducts />
      <OrbFAQ items={PRODUCTS_FAQS} />
    </main>
  );
}
