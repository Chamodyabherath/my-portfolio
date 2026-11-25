import { profile } from "@/data/profile";
import { canonicalUrl } from "@/lib/metadata";

export function profileStructuredData() {
  const homepage = canonicalUrl("/");
  if (!homepage) return undefined;
  const personId = `${homepage}#person`;
  const websiteId = `${homepage}#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: homepage,
        name: profile.name,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${homepage}#profile`,
        url: homepage,
        name: `${profile.name} | ${profile.positioning}`,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        url: homepage,
        image: new URL("/images/portrait.webp", homepage).href,
        jobTitle: profile.title,
        description: `${profile.positioning} in ${profile.location}`,
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
      },
    ],
  };
}

export function caseStudyBreadcrumbs(title: string, slug: string) {
  const homepage = canonicalUrl("/");
  const work = canonicalUrl("/work");
  const study = canonicalUrl(`/work/${slug}`);
  if (!homepage || !work || !study) return undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: homepage },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: work },
      { "@type": "ListItem", position: 3, name: title, item: study },
    ],
  };
}
