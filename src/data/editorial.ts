import { experience } from "@/data/experience";
import { profile } from "@/data/profile";

type TimelineEntry = {
  organization: string;
  title: string;
  date: string;
  description: string;
  skills: readonly string[];
};

export const career: readonly TimelineEntry[] = [
  ...experience.map((entry) => ({
    organization: entry.company,
    title: entry.role,
    date: entry.period,
    description: entry.summary,
    skills: entry.technologies,
  })),
  {
    organization: profile.education.institution,
    title: profile.education.degree,
    date: profile.education.period,
    description:
      "Completed a four-year honours degree covering software engineering, databases, networking, programming, and research.",
    skills: ["Software engineering", "Database systems"],
  },
  {
    organization: "Undergraduate research",
    title: "Machine Learning Research",
    date: "2025",
    description:
      "Investigated rice leaf disease identification and how weather and soil conditions relate to agricultural outcomes.",
    skills: ["Machine learning", "Environmental factors"],
  },
  {
    organization: "Open University of Sri Lanka",
    title: "Certificate in Graphic Design",
    date: "2019 – 2021",
    description:
      "Studied graphic design, visual communication, and digital design techniques.",
    skills: ["Graphic design", "Visual communication"],
  },
  {
    organization: "Simplilearn",
    title: "Introduction to DevOps Tools",
    date: "2025",
    description:
      "Completed introductory training in DevOps tools and development workflows.",
    skills: ["DevOps"],
  },
];

export const capabilities = [
  {
    title: "Backend & enterprise systems",
    description:
      "Laravel and PHP applications that support ERP, CRM, and the business rules behind operational workflows.",
  },
  {
    title: "Modern frontend engineering",
    description:
      "Responsive interfaces built with React, Next.js, TypeScript, JavaScript, and Tailwind CSS.",
  },
  {
    title: "REST APIs & integration",
    description:
      "REST endpoints and third-party integrations with explicit authentication, authorization, and client-server responsibilities.",
  },
  {
    title: "Database design",
    description:
      "MySQL and PostgreSQL schemas, migrations, and query optimization grounded in real application workflows.",
  },
  {
    title: "Business application development",
    description:
      "Order, inventory, and warehouse systems with tenant-aware behavior and role-based access.",
  },
  {
    title: "UI/UX & creative development",
    description:
      "Interface design in Figma, informed by graphic design and visual communication.",
  },
] as const;
