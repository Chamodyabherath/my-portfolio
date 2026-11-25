import {
  Boxes,
  Braces,
  ChevronDown,
  Database,
  GraduationCap,
  LayoutPanelTop,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { Button } from "@/components/ui/button";
import { SectionHeading, SocialLinks } from "@/components/layout/frame";
import { Tags } from "@/components/projects/project-list";

const capabilityIcons = [LayoutPanelTop, Braces, Database, Boxes];

export function ExperienceSection() {
  return (
    <section
      className="shell section divider experience-grid"
      id="experience"
      tabIndex={-1}
    >
      <SectionHeading
        label="Experience"
        title="Building software for real operations."
      />
      <div className="timeline">
        {experience.map((entry, index) => (
          <article className="timeline-entry" key={entry.company}>
            <p className="timeline-date">{entry.period}</p>
            <h3>{entry.company}</h3>
            <p className="timeline-role">{entry.role}</p>
            <p>{entry.summary}</p>
            <details open={index === 0}>
              <summary>
                Technical contributions{" "}
                <ChevronDown size={17} aria-hidden="true" />
              </summary>
              <ul className="contributions">
                {entry.contributions.map((contribution) => (
                  <li key={contribution}>{contribution}</li>
                ))}
              </ul>
            </details>
            <Tags values={entry.technologies} />
          </article>
        ))}
      </div>
    </section>
  );
}

export function Expertise() {
  return (
    <section className="shell section divider">
      <SectionHeading
        label="Expertise"
        title="Tools, technologies & engineering capabilities."
      />
      <div className="skill-grid">
        {skills.map((group, index) => {
          const Icon = capabilityIcons[index];
          return (
            <article className="skill-card" key={group.title}>
              <span className="section-icon">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3>{group.title}</h3>
              <p>{group.summary}</p>
              <Tags values={group.technologies} />
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function Education() {
  const { degree, institution, period } = profile.education;
  return (
    <section className="shell section divider education-grid">
      <SectionHeading
        label="Education & research"
        title="A foundation in computing and design."
      />
      <div className="education-panel">
        <span className="section-icon">
          <GraduationCap size={22} aria-hidden="true" />
        </span>
        <div>
          <p className="timeline-date">{period}</p>
          <h3>{degree}</h3>
          <p>{institution}</p>
          <p>
            University research explored rice leaf disease identification and
            the relationship between soil, weather, and crop yield.
          </p>
          <Link className="text-link" href="/work/rice-disease-research">
            Explore the research
          </Link>
          <ul className="contributions">
            {profile.qualifications.map((qualification) => (
              <li key={qualification}>{qualification}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ContactCallout() {
  return (
    <section className="shell contact-section">
      <div className="contact-panel">
        <SectionHeading
          label="Contact"
          title="Have an interesting problem to solve?"
        >
          <p>
            I’m interested in meaningful software engineering opportunities,
            ambitious products, and technically challenging projects.
          </p>
        </SectionHeading>
        <div className="contact-actions">
          <Button asChild>
            <a href={`mailto:${profile.email}`}>
              <Mail size={17} /> Let’s Connect
            </a>
          </Button>
          <a
            className="text-link contact-email"
            href={`mailto:${profile.email}`}
          >
            {profile.email}
          </a>
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
