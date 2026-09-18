import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/venue",
    "/stage-designs",
    "/experiences",
    "/gallery",
    "/packages",
    "/availability",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/availability" ? 0.9 : 0.7,
  }));
}
