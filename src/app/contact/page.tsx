import { ContactCTA } from "@/components/contact/ContactCTA";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactPanel } from "@/components/contact/ContactPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Paramount Club in Peshawar to enquire about weddings, Mehndi, Walima, and private events at our luxury venue.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ContactHero />
      <ContactPanel />
      <ContactCTA />
    </>
  );
}
