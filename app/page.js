import OrbLanding from "@/components/OrbLanding";
import { getHomeContent } from "@/lib/cms";

export default async function HomePage() {
  const content = await getHomeContent();

  return (
    <main>
      <OrbLanding
        hero={content.hero}
        products={content.products}
        solutions={content.solutions}
      />
    </main>
  );
}
