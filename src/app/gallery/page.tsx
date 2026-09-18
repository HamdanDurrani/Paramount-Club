import { GalleryCTA } from "@/components/gallery/GalleryCTA";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GalleryIntro } from "@/components/gallery/GalleryIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { galleryCategories, galleryItems } from "@/data/gallery";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Gallery",
  description:
    "Browse wedding, Mehndi, Walima, venue, and event photography from Paramount Club — a luxury celebration destination in Peshawar.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
      <GalleryHero />
      <GalleryIntro />
      <GalleryGrid items={galleryItems} categories={galleryCategories} />
      <GalleryCTA />
    </>
  );
}
