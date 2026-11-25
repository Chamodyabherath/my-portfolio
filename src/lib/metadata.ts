import type { Metadata } from "next";
import { profile } from "@/data/profile";

const configuredOrigin = process.env.SITE_URL?.trim();
const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
const origin =
  configuredOrigin || (vercelDomain ? `https://${vercelDomain}` : undefined);

export const siteUrl = origin ? new URL(new URL(origin).origin) : undefined;
export const indexable =
  Boolean(siteUrl) && process.env.VERCEL_ENV !== "preview";
export const siteDescription =
  "Chamodya Bandara is a full-stack software engineer in Sri Lanka working on Laravel applications, enterprise systems, and modern web interfaces.";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const socialTitle = path === "/" ? title : `${title} | ${profile.name}`;
  const url = siteUrl ? new URL(path, siteUrl) : undefined;
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    ...(url && { alternates: { canonical: url } }),
    openGraph: {
      title: socialTitle,
      description,
      siteName: profile.name,
      type: "website",
      ...(url && {
        url,
        images: [
          {
            url: "/social.png",
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
      ...(url && { images: ["/social.png"] }),
    },
  };
}
