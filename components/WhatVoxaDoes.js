import styles from "./WhatVoxaDoes.module.css";

export default function WhatVoxaDoes() {
  return (
    <section
      className={styles.section}
      id="what-voxa-does"
      data-snap-section
    >
      <div className={styles.inner}>
        <h2 className={styles.heading}>What VOXA does</h2>
        <div className={styles.copy}>
          <p>
            VOXA answers and makes phone calls on behalf of your business. It
            qualifies leads, confirms orders, collects feedback, and books
            callbacks — every time, the same way, at any volume.
          </p>
          <p>
            Every call is automatically saved as clean, structured data in your
            CRM or dashboard, so your team never has to enter it by hand.
          </p>
        </div>
      </div>
    </section>
  );
}
