"use client";

import { useEffect } from "react";

export function EditorialMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".editorial-main");
    const preference = window.matchMedia(
      "(prefers-reduced-motion: no-preference)",
    );
    if (!root || !preference.matches) return;

    const scope = root;
    let dispose: (() => void) | undefined;
    let cancelled = false;

    // Load scroll effects when a visitor starts to explore the page.
    function loadScrollEffects() {
      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
        .then(([{ gsap }, { ScrollTrigger }]) => {
          if (cancelled) return;
          gsap.registerPlugin(ScrollTrigger);
          const media = gsap.matchMedia();
          media.add("(prefers-reduced-motion: no-preference)", () => {
            for (const group of scope.querySelectorAll<HTMLElement>(
              "[data-reveal]",
            )) {
              if (group.getBoundingClientRect().top < window.innerHeight)
                continue;
              gsap.from(group.querySelectorAll("[data-reveal-item]"), {
                y: 21,
                opacity: 0.72,
                duration: 0.56,
                stagger: 0.09,
                ease: "power2.out",
                clearProps: "opacity,transform",
                scrollTrigger: { trigger: group, start: "top 90%", once: true },
              });
            }
          });
          dispose = () => media.revert();
        })
        .catch(() => {
          /* The page remains fully readable if motion fails to load. */
        });
    }

    window.addEventListener("scroll", loadScrollEffects, {
      once: true,
      passive: true,
    });

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", loadScrollEffects);
      dispose?.();
    };
  }, []);

  return null;
}
