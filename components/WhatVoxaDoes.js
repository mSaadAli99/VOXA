import ScrollReveal from "@/components/ScrollReveal";
import styles from "./WhatVoxaDoes.module.css";

export default function WhatVoxaDoes() {
  return (
    <section
      className={styles.section}
      id="what-voxa-does"
      data-snap-section
    >
      <div className={styles.inner}>
        <ScrollReveal
          as="h2"
          className={styles.heading}
          baseOpacity={0.1}
          enableBlur
          baseRotation={3}
          blurStrength={4}
        >
          What VOXA does
        </ScrollReveal>
        <div className={styles.copy}>
          <ScrollReveal
            as="p"
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
          >
            VOXA answers and makes phone calls on behalf of your business. It qualifies leads, confirms orders, collects feedback, and books callbacks — every time, the same way, at any volume.
          </ScrollReveal>
          <ScrollReveal
            as="p"
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
          >
            Every call is automatically saved as clean, structured data in your CRM or dashboard, so your team never has to enter it by hand.
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
