import type { SkillGroup } from "@/types";

export const skills: readonly SkillGroup[] = [
  {
    title: "Frontend Engineering",
    summary: "Responsive interfaces, routing, and accessible interactions.",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
    ],
  },
  {
    title: "Backend & API Development",
    summary: "Business logic, service integration, and access control.",
    technologies: [
      "Laravel",
      "PHP",
      "Node.js",
      "Java",
      "REST APIs",
      "Authentication",
      "Authorization",
    ],
  },
  {
    title: "Databases & Architecture",
    summary:
      "Modeling and maintaining data behind inventory and order workflows.",
    technologies: [
      "MySQL",
      "PostgreSQL",
      "Relational design",
      "Migrations",
      "Query optimization",
      "Multitenancy",
      "RBAC",
      "ERP / CRM",
      "Debugging",
    ],
  },
  {
    title: "Engineering Tools & Design",
    summary: "Version control, interface design, and visual communication.",
    technologies: [
      "Git",
      "GitHub",
      "VS Code",
      "Figma",
      "Photoshop",
      "Blender",
      "UI/UX design",
      "Photography",
    ],
  },
];
