export interface Profile {
  name: string;
  title: string;
  positioning: string;
  location: string;
  email: string;
  resume: string;
  intro: string;
  social: { github?: string; linkedin?: string };
  education: { degree: string; institution: string; period: string };
  qualifications: readonly string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  summary: string;
  contributions: readonly string[];
  technologies: readonly string[];
}

export interface SkillGroup {
  title: string;
  summary: string;
  technologies: readonly string[];
}

export type ProjectKind = "enterprise" | "commerce" | "voice" | "research";

export interface Project {
  slug: string;
  title: string;
  category: string;
  status: string;
  kind: ProjectKind;
  overview: string;
  problem: string;
  contribution: string;
  technologies: readonly string[];
  diagram: {
    title: string;
    steps: readonly { title: string; detail: string }[];
    caption: string;
  };
  sections: readonly { title: string; text: string; pending?: boolean }[];
  links?: readonly { label: string; url: string }[];
}
