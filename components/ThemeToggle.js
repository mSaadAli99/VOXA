"use client";

import { useTheme } from "@/components/ThemeProvider";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.wrap} role="group" aria-label="Site theme">
      <button
        type="button"
        className={`${styles.btn} ${theme === "studio" ? styles.active : ""}`}
        onClick={() => setTheme("studio")}
        aria-pressed={theme === "studio"}
      >
        Studio
      </button>
      <button
        type="button"
        className={`${styles.btn} ${theme === "orb" ? styles.active : ""}`}
        onClick={() => setTheme("orb")}
        aria-pressed={theme === "orb"}
      >
        Orb
      </button>
      <button
        type="button"
        className={`${styles.btn} ${theme === "vesper" ? styles.active : ""}`}
        onClick={() => setTheme("vesper")}
        aria-pressed={theme === "vesper"}
      >
        Vesper
      </button>
    </div>
  );
}
