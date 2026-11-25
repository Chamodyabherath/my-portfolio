import type { Metadata } from "next";
import { profile } from "@/data/profile";

const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
const netlifyOrigin =
  process.env.NETLIFY === "true" ? process.env.URL?.trim() : undefined;
const origin =
  process.env.SITE_URL?.trim() ||
  netlifyOrigin ||
  (vercelDomain ? `https://${vercelDomain}` : undefined);
const isPreview =
  process.env.VERCEL_ENV === "preview" ||
  (process.env.NETLIFY === "true" &&
    Boolean(process.env.CONTEXT) &&
    process.env.CONTEXT !== "production");

export const siteUrl = origin ? new URL(new URL(origin).origin) : undefined;
export const indexable = Boolean(siteUrl) && !isPreview;
export const siteDescription =
  "Chamodya Bandara is a full-stack software engineer in Sri Lanka building Laravel and Next.js applications for ERP, CRM, warehouse operations, and order management.";

export function canonicalUrl(path: string) {
  if (!siteUrl) return undefined;
  const pathname = path.replace(/\/+$/, "");
  const separator = process.env.SITE_TRAILING_SLASH === "1" ? "/" : "";
  return new URL(pathname ? `${pathname}${separator}` : "/", siteUrl).href;
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const socialTitle = path === "/" ? title : `${title} | ${profile.name}`;
  const url = canonicalUrl(path);
  const image = siteUrl ? new URL("/social.png", siteUrl).href : undefined;

  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    ...(url && { alternates: { canonical: url } }),
    openGraph: {
      title: socialTitle,
      description,
      siteName: profile.name,
      locale: "en_LK",
      type: "website",
      ...(url && { url }),
      ...(image && {
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: "Chamodya Bandara · Full-Stack Software Engineer",
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      ...(image && { images: [image] }),
    },
  };
}
