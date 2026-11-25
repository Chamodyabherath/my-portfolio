import {
  EditorialAbout,
  EditorialCapabilities,
  EditorialCareer,
  EditorialContact,
  EditorialHero,
  EditorialStatement,
} from "@/components/sections/editorial-home";
import { EditorialMotion } from "@/components/motion/editorial-motion";
import { JsonLd } from "@/components/seo/json-ld";
import { profile } from "@/data/profile";
import { pageMetadata, siteDescription } from "@/lib/metadata";
import { profileStructuredData } from "@/lib/structured-data";

export const metadata = pageMetadata(
  `${profile.name} | Full-Stack Software Engineer in Sri Lanka`,
  siteDescription,
  "/",
);

export default function Home() {
  return (
    <div className="editorial-main">
      <JsonLd data={profileStructuredData()} />
      <EditorialHero />
      <EditorialAbout />
      <EditorialStatement />
      <EditorialCareer />
      <EditorialCapabilities />
      <EditorialContact />
      <EditorialMotion />
    </div>
  );
}
