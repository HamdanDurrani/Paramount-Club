import { PackagesCTA } from "@/components/packages/PackagesCTA";
import { PackagesHero } from "@/components/packages/PackagesHero";
import { PackagesIntro } from "@/components/packages/PackagesIntro";
import { PackagesList } from "@/components/packages/PackagesList";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Packages",
  description:
    "Explore Essential, Signature, and Grand hosting packages at Paramount Club in Peshawar. Pricing is available on enquiry.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Packages", path: "/packages" },
        ])}
      />
      <PackagesHero />
      <PackagesIntro />
      <PackagesList />
      <PackagesCTA />
    </>
  );
}
