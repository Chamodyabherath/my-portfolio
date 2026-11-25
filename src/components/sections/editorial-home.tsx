import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { capabilities, career } from "@/data/editorial";
import { profile } from "@/data/profile";
import { EditorialIntro } from "@/components/motion/editorial-intro";
import {
  ContactForm,
  CopyEmail,
} from "@/components/sections/editorial-contact-form";
import { isContactConfigured } from "@/lib/contact-config";
import portrait from "../../../public/images/portrait.webp";

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <p className="editorial-label">
      <span>{number}</span>
      <span>{label}</span>
    </p>
  );
}

export function EditorialHero() {
  return (
    <section
      className="editorial-hero"
      id="top"
      aria-labelledby="editorial-title"
    >
      <div className="editorial-shell hero-stage">
        <div className="hero-editorial-meta">
          <span>
            <i aria-hidden="true" /> Based in Sri Lanka
          </span>
          <span>Full-stack software engineer</span>
        </div>
        <figure className="portrait-stage">
          <div className="portrait-field">
            <span className="portrait-bracket" aria-hidden="true" />
            <Image
              src={portrait}
              alt="Portrait of Chamodya Bandara"
              fill
              preload
              quality={66}
              sizes="(max-width: 680px) calc(100vw - 38px), (max-width: 1000px) 42vw, min(42vw, 650px)"
            />
          </div>
          <figcaption>
            <span>Associate Software Engineer</span>
            <span>Fochant Technologies</span>
          </figcaption>
        </figure>
        <div className="hero-editorial-copy">
          <h1 id="editorial-title">
            <span>Chamodya</span>
            <span>Bandara</span>
          </h1>
          <p className="hero-editorial-lede">
            Building reliable systems, scalable applications, and thoughtful
            digital experiences.
          </p>
          <p className="hero-editorial-description">
            I work across enterprise software, backend architecture, and modern
            frontend development using Laravel, Next.js, and React.
          </p>
          <div className="hero-editorial-actions">
            <a className="editorial-button solid" href="#experience">
              View experience <ArrowDown aria-hidden="true" size={17} />
            </a>
            <a className="editorial-button" href="#contact">
              Start a conversation <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          </div>
        </div>
        <div className="hero-editorial-footer">
          <a href="#about" className="editorial-link">
            <ArrowDown aria-hidden="true" size={15} /> Scroll to explore
          </a>
          <span>Laravel / Next.js / React / TypeScript</span>
        </div>
        <EditorialIntro />
      </div>
    </section>
  );
}

export function EditorialAbout() {
  return (
    <section
      className="editorial-section editorial-shell"
      id="about"
      aria-labelledby="editorial-about"
      tabIndex={-1}
    >
      <SectionLabel number="01" label="About" />
      <div className="editorial-about-grid">
        <figure className="about-editorial-portrait">
          <Image
            src={portrait}
            alt="Chamodya Bandara in his university hiking club polo"
            fill
            sizes="(max-width: 560px) 80vw, 310px"
          />
        </figure>
        <div className="editorial-about-copy" data-reveal>
          <h2 id="editorial-about" data-reveal-item>
            Engineering reliable systems.
            <br />
            <em>Designing meaningful experiences.</em>
          </h2>
          <div className="editorial-about-body" data-reveal-item>
            <p>
              I’m Chamodya Bandara, a Full-Stack Software Engineer and BICT
              (Hons) graduate from Rajarata University of Sri Lanka.
            </p>
            <p>
              At Fochant Technologies I develop and maintain ERP, CRM,
              warehouse, and order management applications.
            </p>
            <p>
              My work spans backend development, REST integrations, relational
              data, authentication, and frontend interfaces.
            </p>
            <p>
              My background in graphic design and visual communication helps me
              design interfaces that make complex work easier to understand.
            </p>
          </div>
          <a
            href={profile.resume}
            download="Chamodya-Bandara-Resume.pdf"
            className="editorial-link"
          >
            <Download aria-hidden="true" size={16} /> Download résumé
          </a>
        </div>
      </div>
    </section>
  );
}

export function EditorialStatement() {
  return (
    <section className="editorial-statement" aria-labelledby="statement-title">
      <div className="editorial-shell statement-inner">
        <SectionLabel number="02" label="Statement" />
        <h2 id="statement-title" data-reveal>
          <span data-reveal-item>I build</span>
          <span data-reveal-item>systems</span>
          <span data-reveal-item>that scale.</span>
        </h2>
        <div className="statement-art" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
    </section>
  );
}

export function EditorialCareer() {
  return (
    <section
      className="editorial-section editorial-shell"
      id="experience"
      aria-labelledby="editorial-experience"
      tabIndex={-1}
    >
      <div className="editorial-section-intro" data-reveal>
        <div>
          <SectionLabel number="02" label="Career & education" />
          <p>
            A journey through engineering, practical problem-solving, and
            continuous learning.
          </p>
        </div>
        <h2
          className="editorial-heading"
          id="editorial-experience"
          data-reveal-item
        >
          The path so far.
        </h2>
      </div>
      <ol className="editorial-timeline">
        {career.map(
          ({ organization, title, date, description, skills }, index) => (
            <li key={title} data-reveal>
              <div className="career-date" data-reveal-item>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{date}</p>
              </div>
              <div className="career-copy" data-reveal-item>
                <p>{organization}</p>
                <h3>{title}</h3>
                <p>{description}</p>
                <ul aria-label="Technologies and topics">
                  {skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </li>
          ),
        )}
      </ol>
      <Link href="/work" className="editorial-link career-work-link">
        Explore project case studies{" "}
        <ArrowUpRight aria-hidden="true" size={16} />
      </Link>
    </section>
  );
}

export function EditorialCapabilities() {
  return (
    <section
      className="editorial-section editorial-shell"
      id="capabilities"
      aria-labelledby="editorial-capabilities"
      tabIndex={-1}
    >
      <div className="editorial-section-intro" data-reveal>
        <SectionLabel number="03" label="Capabilities" />
        <h2
          className="editorial-heading"
          id="editorial-capabilities"
          data-reveal-item
        >
          Engineering capabilities.
        </h2>
      </div>
      <ol className="editorial-capabilities">
        {capabilities.map(({ title, description }, index) => (
          <li key={title} data-reveal>
            <details data-reveal-item>
              <summary>
                <span className="capability-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{title}</span>
                <ArrowUpRight size={22} aria-hidden="true" />
              </summary>
              <div className="capability-description">
                <p>{description}</p>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function EditorialContact({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section
      className="editorial-contact"
      id="contact"
      aria-labelledby="editorial-contact-title"
      tabIndex={-1}
    >
      <div className="editorial-shell editorial-section">
        <div className="editorial-contact-grid">
          <div className="editorial-contact-links">
            <SectionLabel number="04" label="Contact" />
            <p>
              Based in Sri Lanka. Interested in meaningful engineering
              opportunities, full-stack development, and ambitious digital
              products.
            </p>
            <div className="address-actions">
              <a className="editorial-link" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <CopyEmail email={profile.email} />
            </div>
            <div className="editorial-socials">
              {profile.social.github && (
                <a href={profile.social.github} className="editorial-link">
                  GitHub <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
              {profile.social.linkedin && (
                <a href={profile.social.linkedin} className="editorial-link">
                  LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
          <div className="editorial-contact-main">
            <Heading
              className="editorial-heading"
              id="editorial-contact-title"
              data-reveal
            >
              <span data-reveal-item>Let’s build</span>
              <span data-reveal-item>something</span>
              <span data-reveal-item>great.</span>
            </Heading>
            <ContactForm
              email={profile.email}
              configured={isContactConfigured()}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
