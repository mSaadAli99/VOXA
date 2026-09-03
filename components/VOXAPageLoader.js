"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./VOXAPageLoader.module.css";

const LOAD_DELAY = 450;
const ANIMATION_TIME = 900;
const TIME_VARIANCE = 320;
const PARTICLE_COUNT = 22;
const PARTICLE_DISTANCES = [220, 36];
const PARTICLE_R = 140;
const COLORS = [1, 2, 3, 4, 5];
const LOADER_FADE_MS = 800;
const REDUCED_HOLD_MS = 900;

function noise(n = 1) {
  return n / 2 - Math.random() * n;
}

function getXY(distance, pointIndex, totalPoints) {
  const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
  return [distance * Math.cos(angle), distance * Math.sin(angle)];
}

function createParticle(i, t, d, r) {
  const rotate = noise(r / 10);
  return {
    start: getXY(d[1], PARTICLE_COUNT - i, PARTICLE_COUNT),
    end: getXY(d[0] + noise(7), PARTICLE_COUNT - i, PARTICLE_COUNT),
    time: t,
    scale: 1 + noise(0.2),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
  };
}

export default function VOXAPageLoader() {
  const filterRef = useRef(null);
  const timersRef = useRef([]);
  const finishedRef = useRef(false);
  const [phase, setPhase] = useState("idle");

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const queue = useCallback((fn, ms) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    clearTimers();
    document.body.style.removeProperty("overflow");
    setPhase("leaving");
    queue(() => setPhase("gone"), LOADER_FADE_MS);
  }, [clearTimers, queue]);

  useEffect(() => {
    if (phase === "gone") {
      delete document.documentElement.dataset.intro;
      return;
    }
    document.documentElement.dataset.intro = phase;
  }, [phase]);

  const makeParticles = useCallback((element) => {
    const d = PARTICLE_DISTANCES;
    const r = PARTICLE_R;
    const bubbleTime = ANIMATION_TIME * 2 + TIME_VARIANCE;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const t = ANIMATION_TIME * 2 + noise(TIME_VARIANCE * 2);
      const p = createParticle(i, t, d, r);

      queue(() => {
        if (!filterRef.current || finishedRef.current) return;

        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.className = "particle";
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--color-${p.color}, #f8f0e5)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);
        point.className = "point";
        particle.appendChild(point);
        element.appendChild(particle);

        requestAnimationFrame(() => {
          element.classList.add("active");
        });

        queue(() => {
          particle.remove();
        }, t);
      }, 30);
    }

    return ANIMATION_TIME * 2 + TIME_VARIANCE * 2;
  }, [queue]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) {
      setPhase("reduced");
      queue(finish, REDUCED_HOLD_MS);
      return () => {
        clearTimers();
        document.body.style.removeProperty("overflow");
      };
    }

    queue(() => {
      const host = filterRef.current;
      if (!host) {
        finish();
        return;
      }
      setPhase("bursting");
      const duration = makeParticles(host);
      queue(finish, duration + 400);
    }, LOAD_DELAY);

    return () => {
      clearTimers();
      filterRef.current?.replaceChildren();
      document.body.style.removeProperty("overflow");
    };
  }, [clearTimers, finish, makeParticles, queue]);

  if (phase === "gone") return null;

  return (
    <div
      className={`${styles.overlay} ${phase === "bursting" ? styles.bursting : ""} ${
        phase === "leaving" ? styles.leaving : ""
      } ${phase === "reduced" ? styles.reduced : ""}`}
      role="status"
      aria-live="polite"
      aria-label={phase === "leaving" || phase === "gone" ? "Welcome to VOXA" : "Loading VOXA"}
    >
      <svg className={styles.gooSvg} aria-hidden="true">
        <filter id="voxa-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>
      <div ref={filterRef} className={styles.filter} />
      <div className={styles.stage}>
        <div className={styles.logos}>
          <img
            src="/images/logo-navy.webp"
            alt=""
            width={1040}
            height={240}
            className={`${styles.logo} ${styles.logoNavy}`}
            draggable="false"
          />
          <img
            src="/images/logo-beige.webp"
            alt="VOXA"
            width={1040}
            height={240}
            className={`${styles.logo} ${styles.logoCream}`}
            draggable="false"
          />
        </div>
      </div>

      <button type="button" className={styles.skip} onClick={finish}>
        Skip intro
      </button>
    </div>
  );
}
