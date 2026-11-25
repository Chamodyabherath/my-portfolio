"use client";

import { useEffect, useRef } from "react";

export function EditorialIntro() {
  const banner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem("editorial-intro-seen")) return;
      sessionStorage.setItem("editorial-intro-seen", "1");
    } catch {
      return;
    }
    if (window.scrollY > 0 || window.location.hash) return;
    const element = banner.current;
    if (!element) return;

    const animation = element.animate(
      [
        { opacity: 0 },
        { opacity: 1, offset: 0.13 },
        { opacity: 1, offset: 0.65 },
        { opacity: 0 },
      ],
      { duration: 650, easing: "ease-out" },
    );
    const progress = element
      .querySelector("[data-intro-progress]")
      ?.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
        duration: 480,
        easing: "ease-out",
      });

    return () => {
      animation.cancel();
      progress?.cancel();
    };
  }, []);

  return (
    <div ref={banner} className="editorial-intro" aria-hidden="true">
      <div>
        <strong>Chamodya Bandara</strong>
        <span>Full-stack software engineer</span>
      </div>
      <div>
        <span>Initializing experience…</span>
        <span className="intro-progress">
          <i data-intro-progress />
        </span>
      </div>
    </div>
  );
}
