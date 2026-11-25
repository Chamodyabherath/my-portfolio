"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="shell page-heading">
      <h1>Something went wrong.</h1>
      <p>Try loading the page again or return to the portfolio homepage.</p>
      <div className="hero-actions">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="outline">
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </section>
  );
}
