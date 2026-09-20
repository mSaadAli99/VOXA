/**
 * Push the original VOXA homepage copy into the CMS.
 *
 * Usage (CMS must be running on NEXT_PUBLIC_API_URL):
 *   node scripts/seed-cms.mjs
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const key = m[1];
      const val = m[2].replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // optional
  }
}

loadEnvLocal();

const API = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(
  /\/$/,
  "",
);

const SEED = {
  hero: {
    id: "hero-1",
    label: "",
    title: "",
    subtitle:
      "VOXA is a voice agent platform. It handles your business's phone calls — qualifying leads, confirming orders, following up with customers — automatically, and turns every call into structured data your team can use.",
    ctaText: "Talk to us",
    ctaUrl: "/contact",
    imageUrl: "",
  },
  products: [
    {
      id: "product-1",
      name: "VOXA Voice Agent Platform",
      description:
        "An AI voice agent for real estate and e-commerce businesses.",
      longDescription:
        "An AI voice agent for real estate and e-commerce businesses. It handles lead qualification, order confirmation, and customer follow-up calls.",
      imageUrl: "/images/products/voice-agent-platform.webp",
      order: 1,
      ctaText: "See product",
      ctaUrl: "/products#voice-agent",
    },
    {
      id: "product-2",
      name: "VOXA Communications Suite",
      description:
        "A complete calling platform for contact centers and enterprises.",
      longDescription:
        "A complete calling platform for contact centers and enterprises — telephony, CRM, omni-channel support, and AI automation in one system.",
      imageUrl: "/images/products/communications-suite.webp",
      order: 2,
      ctaText: "See product",
      ctaUrl: "/products#communications-suite",
    },
  ],
  solutions: [
    {
      id: "solution-1",
      name: "Real Estate",
      description:
        "Every lead answered and qualified within seconds, day or night.",
      imageUrl: "/images/solutions/real-estate.webp",
      order: 1,
      ctaText: "See solution",
      ctaUrl: "/solutions#real-estate",
    },
    {
      id: "solution-2",
      name: "E-Commerce",
      description:
        "Every order confirmed before dispatch. Every delivery followed up automatically.",
      imageUrl: "/images/solutions/ecommerce.webp",
      order: 2,
      ctaText: "See solution",
      ctaUrl: "/solutions#e-commerce",
    },
  ],
  sections: [
    {
      id: "section-1",
      name: "What VOXA does",
      title: "What VOXA does",
      description:
        "VOXA answers and makes phone calls on behalf of your business. It qualifies leads, confirms orders, collects feedback, and books callbacks — every time, the same way, at any volume. Every call is automatically saved as clean, structured data in your CRM or dashboard, so your team never has to enter it by hand.",
      imageUrl: "",
      videoUrl: "",
      order: 1,
    },
  ],
};

async function tryJson(method, path, body) {
  const url = `${API}${path}`;
  try {
    const res = await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const text = await res.text();
    let json = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = text;
    }
    return { ok: res.ok, status: res.status, url, json };
  } catch (err) {
    return { ok: false, status: 0, url, error: err.message };
  }
}

async function main() {
  console.log(`Seeding CMS at ${API} …`);

  const ping = await tryJson("GET", "/content");
  if (!ping.ok) {
    console.error(
      `CMS is not reachable (${ping.status || ping.error}). Start the CMS on port 5000, then run: npm run seed:cms`,
    );
    process.exit(1);
  }

  // Prefer bulk replace, then fall back to per-resource updates.
  const attempts = [
    () => tryJson("PUT", "/content", SEED),
    () => tryJson("POST", "/content", SEED),
    () => tryJson("PUT", "/seed", SEED),
    () => tryJson("POST", "/seed", SEED),
  ];

  for (const run of attempts) {
    const result = await run();
    if (result.ok) {
      console.log(`✓ Seeded via ${result.method || ""} ${result.url} (${result.status})`);
      await verify();
      return;
    }
    console.log(`· ${result.url} → ${result.status || result.error}`);
  }

  // Per-item fallback
  const hero = await tryJson("PUT", "/hero", SEED.hero);
  if (!hero.ok) await tryJson("PATCH", "/hero", SEED.hero);
  if (!hero.ok) await tryJson("PUT", `/hero/${SEED.hero.id}`, SEED.hero);

  for (const product of SEED.products) {
    let r = await tryJson("PUT", `/products/${product.id}`, product);
    if (!r.ok) r = await tryJson("PATCH", `/products/${product.id}`, product);
    if (!r.ok) r = await tryJson("POST", "/products", product);
    console.log(`product ${product.id}: ${r.status || r.error}`);
  }

  for (const solution of SEED.solutions) {
    let r = await tryJson("PUT", `/solutions/${solution.id}`, solution);
    if (!r.ok) r = await tryJson("PATCH", `/solutions/${solution.id}`, solution);
    if (!r.ok) r = await tryJson("POST", "/solutions", solution);
    console.log(`solution ${solution.id}: ${r.status || r.error}`);
  }

  for (const section of SEED.sections) {
    let r = await tryJson("PUT", `/sections/${section.id}`, section);
    if (!r.ok) r = await tryJson("PATCH", `/sections/${section.id}`, section);
    if (!r.ok) r = await tryJson("POST", "/sections", section);
    console.log(`section ${section.id}: ${r.status || r.error}`);
  }

  await verify();
}

async function verify() {
  const after = await tryJson("GET", "/content");
  if (!after.ok) {
    console.warn("Could not re-fetch /content to verify.");
    return;
  }
  const name = after.json?.products?.[0]?.name;
  const subtitle = after.json?.hero?.subtitle?.slice(0, 40);
  console.log(`Verify hero subtitle: ${subtitle}…`);
  console.log(`Verify first product: ${name}`);
  if (name?.includes("Voice Agent") && subtitle?.includes("voice agent")) {
    console.log("✓ CMS now has the original VOXA copy.");
  } else {
    console.warn(
      "CMS write endpoints may not accept updates from this script. Paste SEED into your CMS admin, or share the write API routes.",
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
