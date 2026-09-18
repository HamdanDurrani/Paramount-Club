import { ExperiencesCTA } from "@/components/experiences/ExperiencesCTA";
import { ExperiencesHero } from "@/components/experiences/ExperiencesHero";
import { ExperiencesList } from "@/components/experiences/ExperiencesList";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Experiences & Events",
  description:
    "Discover weddings, Mehndi, Walima, engagements, corporate events, and private celebrations at Paramount Club in Peshawar.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Experiences", path: "/experiences" },
        ])}
      />
      <ExperiencesHero />
      <ExperiencesList />
      <ExperiencesCTA />
    </>
  );
}
