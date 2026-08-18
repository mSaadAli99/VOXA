"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./Hero.module.css";

const CONFIG = {
  COLS: 8,
  ROWS: 6,
  NEAR_MIN: 0.15,
  NEAR_MAX: 0.25,
  FAR_MIN: 0.35,
  FAR_MAX: 0.45,
  JITTER: 0.06,
  ROTATION: 60,
  STAGGER: 0.28,
  END_OPACITY: 0.15,
  OVERLAP: 1.5,
  SEED: 21018,
  LOGO_SRC: "/logomark.png",
};

function seededRandom(seed) {
  let state = seed >>> 0;

  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function tileSeed(col, row) {
  return (CONFIG.SEED + col * 374761393 + row * 668265263) >>> 0;
}

function range(rand, min, max) {
  return min + rand() * (max - min);
}

function buildTiles() {
  const tiles = [];
  const centerCol = (CONFIG.COLS - 1) / 2;
  const centerRow = (CONFIG.ROWS - 1) / 2;
  const maxDist = Math.hypot(centerCol, centerRow);

  for (let row = 0; row < CONFIG.ROWS; row += 1) {
    for (let col = 0; col < CONFIG.COLS; col += 1) {
      const rand = seededRandom(tileSeed(col, row));
      const dx = col - centerCol;
      const dy = row - centerRow;
      const dist = Math.hypot(dx, dy) || 1;
      const falloff = dist / maxDist;
      const nearPct = range(rand, CONFIG.NEAR_MIN, CONFIG.NEAR_MAX);
      const farPct = range(rand, CONFIG.FAR_MIN, CONFIG.FAR_MAX);

      tiles.push({
        key: `${row}-${col}`,
        row,
        col,
        falloff,
        ux: dx / dist,
        uy: dy / dist,
        travelPct: nearPct + falloff * (farPct - nearPct),
        jitterXPct: range(rand, -CONFIG.JITTER, CONFIG.JITTER),
        jitterYPct: range(rand, -CONFIG.JITTER, CONFIG.JITTER),
        rotation: range(rand, -CONFIG.ROTATION, CONFIG.ROTATION),
      });
    }
  }

  return tiles;
}

function travelForTile(tile, vw, vh) {
  let x = tile.ux * tile.travelPct * vw + tile.jitterXPct * vw;
  let y = tile.uy * tile.travelPct * vh + tile.jitterYPct * vh;
  const maxX = vw * CONFIG.FAR_MAX;
  const maxY = vh * CONFIG.FAR_MAX;

  if (Math.abs(x) > maxX) x = Math.sign(x) * maxX;
  if (Math.abs(y) > maxY) y = Math.sign(y) * maxY;

  return { x, y };
}

function layoutTiles(grid) {
  const { width: gridW, height: gridH } = grid.getBoundingClientRect();
  const tileW = gridW / CONFIG.COLS;
  const tileH = gridH / CONFIG.ROWS;
  const overlap = CONFIG.OVERLAP;

  grid.querySelectorAll("[data-tile]").forEach((node) => {
    const tile = TILES[Number(node.dataset.index)];

    node.style.backgroundSize = `${gridW}px ${gridH}px`;
    node.style.backgroundPosition = `${-tile.col * tileW + overlap}px ${-tile.row * tileH + overlap}px`;
    node.style.width = `${tileW + overlap * 2}px`;
    node.style.height = `${tileH + overlap * 2}px`;
    node.style.marginTop = `${-overlap}px`;
    node.style.marginLeft = `${-overlap}px`;
  });
}

const TILES = buildTiles();

export default function Hero() {
  const wrapRef = useRef(null);
  const gridRef = useRef(null);
  const intactRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const grid = gridRef.current;
    const intact = intactRef.current;
    if (!wrap || !grid || !intact) return;

    const mobileMq = window.matchMedia("(max-width: 767px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ctx;
    let resizeTimer;

    const build = () => {
      ctx?.revert();
      ctx = undefined;

      const nodes = grid.querySelectorAll("[data-tile]");
      gsap.set(nodes, { x: 0, y: 0, rotation: 0, opacity: 1, scale: 1 });
      gsap.set(intact, { opacity: 1 });
      layoutTiles(grid);

      if (mobileMq.matches || motionMq.matches) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        tl.to(intact, { opacity: 0, duration: 0.08, ease: "none" }, 0);

        nodes.forEach((node) => {
          const tile = TILES[Number(node.dataset.index)];
          const start = (1 - tile.falloff) * CONFIG.STAGGER;
          const { x, y } = travelForTile(tile, vw, vh);

          tl.to(
            node,
            {
              x,
              y,
              rotation: tile.rotation,
              opacity: CONFIG.END_OPACITY,
              duration: 1 - start,
              ease: "power1.inOut",
            },
            start,
          );
        });
      }, wrap);
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 150);
    };

    build();
    mobileMq.addEventListener("change", build);
    motionMq.addEventListener("change", build);
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(resizeTimer);
      mobileMq.removeEventListener("change", build);
      motionMq.removeEventListener("change", build);
      window.removeEventListener("resize", onResize);
      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      style={{
        "--cols": CONFIG.COLS,
        "--rows": CONFIG.ROWS,
      }}
    >
      <section className={`${styles.hero} logo-hero`}>
        <div className={styles.stage}>
          <div
            ref={gridRef}
            id="shatterGrid"
            className={styles.grid}
            aria-hidden="true"
          >
            {TILES.map((tile, index) => (
              <div
                key={tile.key}
                data-tile
                data-index={index}
                className={styles.tile}
                style={{ backgroundImage: `url(${CONFIG.LOGO_SRC})` }}
              />
            ))}
          </div>
          <img
            ref={intactRef}
            src={CONFIG.LOGO_SRC}
            alt="VOXA"
            className={styles.intact}
          />
        </div>
      </section>
    </div>
  );
}
