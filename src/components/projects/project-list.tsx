import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectVisual } from "./project-visual";

export function Tags({ values }: { values: readonly string[] }) {
  return (
    <ul className="tags">
      {values.map((value) => (
        <li key={value}>{value}</li>
      ))}
    </ul>
  );
}

export function ProjectList({ heading = "h3" }: { heading?: "h2" | "h3" }) {
  const Heading = heading;
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <article
          className={
            index === 0 ? "project-card project-feature" : "project-card"
          }
          key={project.slug}
        >
          <ProjectVisual project={project} />
          <div className="project-info">
            <div className="project-meta">
              <span>{project.category}</span>
              <span>{project.status}</span>
            </div>
            <Heading>
              <Link
                href={`/work/${project.slug}`}
                className="project-title-link"
              >
                {project.title}
              </Link>
            </Heading>
            <p>{project.problem}</p>
            <p className="project-contribution">{project.contribution}</p>
            <Tags values={project.technologies} />
            <span className="case-link" aria-hidden="true">
              Read case study <ChevronRight size={17} />
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
