import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [
    "/",
    "/work",
    "/about",
    "/contact",
    ...projects.map(({ slug }) => `/work/${slug}`),
  ].map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
