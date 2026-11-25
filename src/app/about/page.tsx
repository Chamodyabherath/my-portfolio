import { MapPin } from "lucide-react";
import { PageHeading, ResumeButton } from "@/components/layout/frame";
import {
  ContactCallout,
  Education,
  ExperienceSection,
  Expertise,
} from "@/components/sections/home-sections";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About",
  "Professional experience, engineering capabilities, and education of Chamodya Bandara.",
  "/about",
);

export default function About() {
  return (
    <>
      <PageHeading label="About" title={profile.name}>
        <p>{profile.intro}</p>
        <div className="about-meta">
          <span>{profile.title}</span>
          <span>
            <MapPin size={16} />
            {profile.location}
          </span>
        </div>
        <ResumeButton />
      </PageHeading>
      <ExperienceSection />
      <Expertise />
      <Education />
      <ContactCallout />
    </>
  );
}
