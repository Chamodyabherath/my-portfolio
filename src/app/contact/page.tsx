import { EditorialContact } from "@/components/sections/editorial-home";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Contact",
  "Get in touch with Chamodya Bandara about software engineering roles, products, and technical projects.",
  "/contact",
);

export default function Contact() {
  return <EditorialContact standalone />;
}
