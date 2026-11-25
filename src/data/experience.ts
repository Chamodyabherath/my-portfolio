import type { Experience } from "@/types";

export const experience: readonly Experience[] = [
  {
    company: "Fochant Technologies",
    role: "Associate Software Engineer",
    period: "March 2026 – Present",
    summary:
      "Develop and maintain ERP, CRM, warehouse, and order management systems. My work includes REST integrations, access control, relational data, and workflows that connect operational teams.",
    contributions: [
      "Integrate REST APIs, AJAX requests, and third-party services into business workflows.",
      "Design relational data structures, manage migrations, and optimize queries.",
      "Implement role-based access, multitenancy, and configurable business rules.",
      "Trace frontend, backend, database, and production issues across application layers.",
    ],
    technologies: [
      "Laravel",
      "PHP",
      "Next.js",
      "React",
      "MySQL",
      "REST APIs",
      "ERP",
    ],
  },
  {
    company: "Konekt Holdings (Pvt) Ltd",
    role: "Software Engineer Intern",
    period: "August 2025 – February 2026",
    summary:
      "Built responsive web interfaces and supported client projects through frontend and backend debugging, authentication, routing, API integration, and SEO.",
    contributions: [
      "Implemented authentication, routing, API integrations, and data handling.",
      "Debugged client-facing issues and collaborated with clients and development teams on requirements.",
      "Updated SEO metadata and sitemap generation.",
    ],
    technologies: ["Laravel", "Node.js", "JavaScript", "REST APIs"],
  },
];
