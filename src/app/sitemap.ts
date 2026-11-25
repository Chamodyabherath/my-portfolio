import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { canonicalUrl, indexable } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexable) return [];
  const paths = [
    "/",
    "/work",
    "/about",
    "/contact",
    ...projects.map(({ slug }) => `/work/${slug}`),
  ];
  return paths.flatMap((path) => {
    const url = canonicalUrl(path);
    return url ? [{ url }] : [];
  });
}
