import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectVisual } from "@/components/projects/project-visual";
import { Tags } from "@/components/projects/project-list";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import { caseStudyBreadcrumbs } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/json-ld";

type Props = PageProps<"/work/[slug]">;

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return pageMetadata(project.title, project.overview, `/work/${slug}`);
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];
  if (!project) notFound();
  const next = projects[index + 1];

  return (
    <article className="shell case-study enter">
      <JsonLd data={caseStudyBreadcrumbs(project.title, slug)} />
      <header className="case-header">
        <Link href="/work" className="text-link">
          All projects
        </Link>
        <div className="project-meta">
          <span>{project.category}</span>
          <span>{project.status}</span>
        </div>
        <h1>{project.title}</h1>
        <p>{project.overview}</p>
      </header>
      <ProjectVisual project={project} />
      <div className="case-layout">
        <aside aria-label="Project information">
          <h2>Technologies & scope</h2>
          <Tags values={project.technologies} />
          {project.links?.map(({ label, url }) => (
            <a key={url} href={url} className="text-link">
              {label}
            </a>
          ))}
        </aside>
        <div className="case-body">
          <section>
            <h2>The problem</h2>
            <p>{project.problem}</p>
          </section>
          <section>
            <h2>My contribution</h2>
            <p>{project.contribution}</p>
          </section>
          {project.sections.map(({ title, text, pending }) => (
            <section
              className={pending ? "pending-detail" : undefined}
              key={title}
            >
              {pending && (
                <span className="editorial-label">Details pending</span>
              )}
              <h2>{title}</h2>
              <p>{text}</p>
            </section>
          ))}
        </div>
      </div>
      <nav className="case-navigation" aria-label="Case study navigation">
        <Button asChild variant="outline">
          <Link href="/work">All projects</Link>
        </Button>
        {next && (
          <Button asChild>
            <Link href={`/work/${next.slug}`}>
              Next case study <span className="sr-only">: {next.title}</span>
            </Link>
          </Button>
        )}
      </nav>
    </article>
  );
}
