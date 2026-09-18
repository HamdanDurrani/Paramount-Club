import { VenueAtmosphere } from "@/components/venue/VenueAtmosphere";
import { VenueCapacity } from "@/components/venue/VenueCapacity";
import { VenueCTA } from "@/components/venue/VenueCTA";
import { VenueDanceFloor } from "@/components/venue/VenueDanceFloor";
import { VenueEntrance } from "@/components/venue/VenueEntrance";
import { VenueEntertainment } from "@/components/venue/VenueEntertainment";
import { VenueHero } from "@/components/venue/VenueHero";
import { VenueIntro } from "@/components/venue/VenueIntro";
import { VenueSetups } from "@/components/venue/VenueSetups";
import { VenueStageDesignsCTA } from "@/components/venue/VenueStageDesignsCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "The Venue",
  description:
    "Explore Paramount Club — a luxury wedding hall and events venue in Peshawar with a grand ballroom, dance floor, DJ, live performances, and capacity for approximately 5,000 guests.",
  path: "/venue",
});

export default function VenuePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Venue", path: "/venue" },
        ])}
      />
      <VenueHero />
      <VenueIntro />
      <VenueAtmosphere />
      <VenueEntrance />
      <VenueSetups />
      <VenueStageDesignsCTA />
      <VenueDanceFloor />
      <VenueEntertainment />
      <VenueCapacity />
      <VenueCTA />
    </>
  );
}
