import { BriefcaseBusiness, CodeXml, Download, Mail } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";

export function ResumeButton() {
  return (
    <Button asChild variant="outline">
      <a href={profile.resume} download="Chamodya-Bandara-Resume.pdf">
        <Download size={17} /> Download Resume
      </a>
    </Button>
  );
}

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  const links = [
    { label: "GitHub", href: profile.social.github, Icon: CodeXml },
    {
      label: "LinkedIn",
      href: profile.social.linkedin,
      Icon: BriefcaseBusiness,
    },
    ...(compact
      ? [{ label: "Email", href: `mailto:${profile.email}`, Icon: Mail }]
      : []),
  ];

  return (
    <ul className={compact ? "social-list social-compact" : "social-list"}>
      {links.map(
        ({ label, href, Icon }) =>
          href && (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                className={compact ? "icon-button" : "social-link"}
              >
                <Icon size={17} aria-hidden="true" />
                {!compact && label}
              </a>
            </li>
          ),
      )}
    </ul>
  );
}

export function SectionHeading({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        <span />
        {label}
      </p>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export function PageHeading({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="shell page-heading enter">
      <p className="eyebrow">
        <span />
        {label}
      </p>
      <h1>{title}</h1>
      {children}
    </header>
  );
}

export function Footer() {
  const year = new Intl.DateTimeFormat("en", {
    year: "numeric",
    timeZone: "Asia/Colombo",
  }).format(new Date());
  return (
    <footer className="editorial-footer">
      <div className="editorial-shell editorial-footer-inner">
        <p>
          {profile.name} <span className="sr-only">·</span>
        </p>
        <p>{profile.positioning}</p>
        <p>© {year} — All rights reserved</p>
        <Link href="/#top" className="editorial-link">
          Back to top
        </Link>
      </div>
    </footer>
  );
}
