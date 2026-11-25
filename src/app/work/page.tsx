import { PageHeading } from "@/components/layout/frame";
import { ProjectList } from "@/components/projects/project-list";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Software Engineering Case Studies",
  "Explore Chamodya Bandara",
  "/work",
);

export default function Work() {
  return (
    <>
      <PageHeading label="Portfolio" title="Selected work.">
        <p>
          Case studies about the problems, engineering decisions, and trade-offs
          behind each project.
        </p>
      </PageHeading>
      <section className="shell page-content" aria-label="Project case studies">
        <ProjectList heading="h2" />
      </section>
    </>
  );
}
