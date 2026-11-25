import {
  EditorialAbout,
  EditorialCapabilities,
  EditorialCareer,
  EditorialContact,
  EditorialHero,
  EditorialStatement,
} from "@/components/sections/editorial-home";
import { EditorialMotion } from "@/components/motion/editorial-motion";
import { profile } from "@/data/profile";
import { pageMetadata, siteDescription, siteUrl } from "@/lib/metadata";

export const metadata = pageMetadata(
  `${profile.name} | Full-Stack Software Engineer`,
  siteDescription,
  "/",
);

export default function Home() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    email: `mailto:${profile.email}`,
    ...(siteUrl && { url: siteUrl.href }),
    address: { "@type": "PostalAddress", addressCountry: "LK" },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.institution,
    },
    sameAs: Object.values(profile.social).filter(Boolean),
    knowsAbout: [
      "Laravel",
      "Next.js",
      "React",
      "Enterprise software",
      "Relational databases",
    ],
  };
  return (
    <div className="editorial-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <EditorialHero />
      <EditorialAbout />
      <EditorialStatement />
      <EditorialCareer />
      <EditorialCapabilities />
      <EditorialContact />
      <EditorialMotion />
    </div>
  );
}
