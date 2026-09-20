/**
 * Canonical VOXA homepage copy — used as FE fallbacks and CMS seed payload.
 * Shape matches GET /api/content.
 */

export const CMS_SEED = {
  hero: {
    id: "hero-1",
    label: "",
    // Empty title keeps the homepage LayoutTextFlip ("Turns conversations into…")
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

export const DEFAULT_API_URL = "http://localhost:5000/api";

export const DEFAULT_HERO = {
  title: null,
  description: CMS_SEED.hero.subtitle,
  label: null,
  ctaText: null,
  ctaUrl: null,
  imageUrl: null,
};

export const DEFAULT_PRODUCTS = CMS_SEED.products.map((item) => ({
  id: item.ctaUrl?.includes("communications")
    ? "communications-suite"
    : "voice-agent",
  src: item.imageUrl,
  alt: item.name,
  badge: item.name.replace(/^VOXA\s+/i, ""),
  title: item.name,
  body: item.longDescription || item.description,
  href: item.ctaUrl,
  cta: "See product →",
}));

export const DEFAULT_SOLUTIONS = CMS_SEED.solutions.map((item) => ({
  id: item.name.toLowerCase().includes("commerce") ? "ecommerce" : "real-estate",
  src: item.imageUrl,
  alt: item.name,
  badge: item.name,
  title: item.name,
  body: item.description,
  href: item.ctaUrl,
  cta: "See solution →",
}));

export const DEFAULT_WHAT_VOXA_DOES = {
  label: CMS_SEED.sections[0].name,
  body: CMS_SEED.sections[0].description,
};

function apiBase() {
  return (process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL).replace(/\/$/, "");
}

function byOrder(a, b) {
  return (a?.order ?? 0) - (b?.order ?? 0);
}

function shortBadge(name = "") {
  const cleaned = String(name).replace(/^VOXA\s+/i, "").trim();
  return cleaned || "VOXA";
}

/** Map CMS product → OrbShowcasePanel item */
export function mapProduct(item) {
  if (!item) return null;
  return {
    id: item.id,
    src: item.imageUrl || "",
    alt: item.name || "VOXA product",
    badge: shortBadge(item.name),
    title: item.name || "",
    body: item.longDescription || item.description || "",
    href: item.ctaUrl || "/products",
    cta: item.ctaText
      ? `${item.ctaText.replace(/\s*→\s*$/, "")} →`
      : "See product →",
  };
}

/** Map CMS solution → OrbShowcasePanel item */
export function mapSolution(item) {
  if (!item) return null;
  return {
    id: item.id,
    src: item.imageUrl || "",
    alt: item.name || "VOXA solution",
    badge: shortBadge(item.name),
    title: item.name || "",
    body: item.description || "",
    href: item.ctaUrl || "/solutions",
    cta: item.ctaText
      ? `${item.ctaText.replace(/\s*→\s*$/, "")} →`
      : "See solution →",
  };
}

function takeTwo(mapped, fallback) {
  const list = mapped.filter(Boolean);
  if (list.length >= 2) return list.slice(0, 2);
  if (list.length === 1) return [list[0], fallback[1] || fallback[0]];
  return fallback;
}

export function mapHero(hero) {
  if (!hero) return DEFAULT_HERO;
  return {
    // Empty CMS title → homepage flip animation (original behavior)
    title: hero.title?.trim() ? hero.title : null,
    description: hero.subtitle || DEFAULT_HERO.description,
    label: hero.label || null,
    ctaText: hero.ctaText || null,
    ctaUrl: hero.ctaUrl || null,
    imageUrl: hero.imageUrl || null,
  };
}

export function mapWhatVoxaDoes(sections = []) {
  const sorted = [...sections].sort(byOrder);
  const manifesto =
    sorted.find((s) => /manifesto|what/i.test(s?.name || "")) || sorted[0];
  if (!manifesto) return DEFAULT_WHAT_VOXA_DOES;
  return {
    label: manifesto.name || DEFAULT_WHAT_VOXA_DOES.label,
    body:
      manifesto.description || manifesto.title || DEFAULT_WHAT_VOXA_DOES.body,
  };
}

/**
 * Fetch CMS homepage payload from NEXT_PUBLIC_API_URL/content.
 * Falls back to local defaults if the API is unreachable.
 */
export async function getHomeContent() {
  const url = `${apiBase()}/content`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(2500),
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      throw new Error(`CMS ${res.status} from ${url}`);
    }

    const data = await res.json();
    const products = takeTwo(
      [...(data.products || [])].sort(byOrder).map(mapProduct),
      DEFAULT_PRODUCTS,
    );
    const solutions = takeTwo(
      [...(data.solutions || [])].sort(byOrder).map(mapSolution),
      DEFAULT_SOLUTIONS,
    );

    return {
      hero: mapHero(data.hero),
      products,
      solutions,
      whatVoxaDoes: mapWhatVoxaDoes(data.sections),
      source: "cms",
    };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[cms] Falling back to local copy:", err?.message || err);
    }
    return {
      hero: DEFAULT_HERO,
      products: DEFAULT_PRODUCTS,
      solutions: DEFAULT_SOLUTIONS,
      whatVoxaDoes: DEFAULT_WHAT_VOXA_DOES,
      source: "fallback",
    };
  }
}
