import OrbLanding from "@/components/OrbLanding";
import { getHomeContent } from "@/lib/cms";
import { VOICE_AUDIO_PATHS } from "@/lib/voiceAudioCache";

export default async function HomePage() {
  const content = await getHomeContent();

  return (
    <main>
      {VOICE_AUDIO_PATHS.map((href) => (
        <link key={href} rel="preload" as="audio" href={href} />
      ))}
      <OrbLanding
        hero={content.hero}
        products={content.products}
        solutions={content.solutions}
      />
    </main>
  );
}
