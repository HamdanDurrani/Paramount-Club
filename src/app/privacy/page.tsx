import { LegalDocument } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { privacyPageContent } from "@/data/legal";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Read how Paramount Club in Peshawar collects, uses, and protects personal information from website visitors and event enquiries.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const content = privacyPageContent;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <LegalDocument
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.subtitle}
        updated={content.updated}
        intro={content.intro}
        sections={content.sections}
        alternateHref="/terms"
        alternateLabel="Terms and Conditions"
      />
    </>
  );
}
