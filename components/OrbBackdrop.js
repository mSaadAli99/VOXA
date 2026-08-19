"use client";

import Orb from "@/components/Orb";
import { useTheme } from "@/components/ThemeProvider";
import styles from "./OrbBackdrop.module.css";

export default function OrbBackdrop() {
  const { theme } = useTheme();
  if (theme !== "orb") return null;

  return (
    <div className={styles.backdrop} aria-hidden="true">
      <Orb
        hoverIntensity={0.82}
        rotateOnHover
        hue={0}
        forceHoverState={false}
        backgroundColor="#020a3a"
      />
    </div>
  );
}
