import { EditorialContact } from "@/components/sections/editorial-home";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Contact",
  "Contact Chamodya Bandara, a full-stack software engineer in Sri Lanka, about Laravel, Next.js, enterprise software, and engineering roles.",
  "/contact",
);

export default function Contact() {
  return <EditorialContact standalone />;
}
