const VOICE_AUDIO_PATHS = [
  "/audio/featured-voice.mp3?v=full48k",
  "/audio/customer-service-voice.mp3?v=full48k",
  "/audio/news-anchor-f-voice.mp3?v=full48k",
  "/audio/narration-voice.mp3?v=full48k",
];

const blobUrls = new Map();
const inFlight = new Map();
let warmPromise = null;

async function fetchAsObjectUrl(path) {
  if (blobUrls.has(path)) return blobUrls.get(path);
  if (inFlight.has(path)) return inFlight.get(path);

  const promise = (async () => {
    const response = await fetch(path, { cache: "force-cache" });
    if (!response.ok) throw new Error(`Failed to fetch ${path}`);

    const objectUrl = URL.createObjectURL(await response.blob());
    blobUrls.set(path, objectUrl);
    return objectUrl;
  })().finally(() => {
    inFlight.delete(path);
  });

  inFlight.set(path, promise);
  return promise;
}

/** Start downloading voice previews ASAP (featured first). */
export function warmVoiceAudio() {
  if (typeof window === "undefined") return Promise.resolve();
  if (warmPromise) return warmPromise;

  warmPromise = (async () => {
    const [featured, ...rest] = VOICE_AUDIO_PATHS;
    try {
      await fetchAsObjectUrl(featured);
    } catch {
      /* ignore */
    }
    await Promise.all(
      rest.map(async (path) => {
        try {
          await fetchAsObjectUrl(path);
        } catch {
          /* ignore */
        }
      }),
    );
  })();

  return warmPromise;
}

export function getVoiceObjectUrl(path) {
  return blobUrls.get(path) || null;
}

export async function resolveVoiceObjectUrl(path) {
  const cached = blobUrls.get(path);
  if (cached) return cached;
  // Kick overall warm, but resolve this path as soon as its own fetch finishes.
  void warmVoiceAudio();
  return fetchAsObjectUrl(path);
}

export { VOICE_AUDIO_PATHS };
