import { BrandStatement } from "@/components/home/BrandStatement";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ValuesSection } from "@/components/home/ValuesSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Paramount Club | Luxury Wedding Venue in Peshawar",
  description:
    "Paramount Club is a luxury wedding and events venue in Peshawar with capacity for approximately 5,000 guests — designed for extraordinary celebrations.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <ServicesSection />
      <WhyChooseSection />
      <ValuesSection />
      <ContactCTA />
    </>
  );
}
