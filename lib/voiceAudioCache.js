const VOICE_AUDIO_PATHS = [
  "/audio/customer-service-voice.mp3?v=48k",
  "/audio/featured-voice.mp3?v=48k",
  "/audio/news-anchor-f-voice.mp3?v=48k",
  "/audio/narration-voice.mp3?v=48k",
];

const blobUrls = new Map();
let warmPromise = null;

async function fetchAsObjectUrl(path) {
  if (blobUrls.has(path)) return blobUrls.get(path);

  const response = await fetch(path, { cache: "force-cache" });
  if (!response.ok) throw new Error(`Failed to fetch ${path}`);

  const objectUrl = URL.createObjectURL(await response.blob());
  blobUrls.set(path, objectUrl);
  return objectUrl;
}

/** Start downloading all voice previews as soon as the homepage mounts. */
export function warmVoiceAudio() {
  if (typeof window === "undefined") return Promise.resolve();
  if (warmPromise) return warmPromise;

  warmPromise = Promise.all(
    VOICE_AUDIO_PATHS.map(async (path) => {
      try {
        await fetchAsObjectUrl(path);
      } catch {
        /* ignore individual failures */
      }
    }),
  );

  return warmPromise;
}

export function getVoiceObjectUrl(path) {
  return blobUrls.get(path) || null;
}

export async function resolveVoiceObjectUrl(path) {
  const cached = blobUrls.get(path);
  if (cached) return cached;
  await warmVoiceAudio();
  if (blobUrls.has(path)) return blobUrls.get(path);
  return fetchAsObjectUrl(path);
}

export { VOICE_AUDIO_PATHS };
