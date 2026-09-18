import { LegalDocument } from "@/components/legal/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { termsPageContent } from "@/data/legal";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Terms and Conditions",
  description:
    "Terms governing use of the Paramount Club website and event enquiry process in Peshawar.",
  path: "/terms",
});

export default function TermsPage() {
  const content = termsPageContent;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms and Conditions", path: "/terms" },
        ])}
      />
      <LegalDocument
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.subtitle}
        updated={content.updated}
        intro={content.intro}
        sections={content.sections}
        alternateHref="/privacy"
        alternateLabel="Privacy Policy"
      />
    </>
  );
}
