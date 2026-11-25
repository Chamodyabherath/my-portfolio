import Link from "next/link";
import { PageHeading } from "@/components/layout/frame";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageHeading label="404" title="Page not found.">
      <p>
        Check the address or use the links below to continue exploring the
        portfolio.
      </p>
      <div className="hero-actions">
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/work">Browse work</Link>
        </Button>
      </div>
    </PageHeading>
  );
}
