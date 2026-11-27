"use client";

import { useEffect, useRef } from "react";

const followTimeMs = 170;

export function CursorRing() {
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const preference = window.matchMedia(
      "(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let frame: number | undefined;
    let previousTime = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    const renderPosition = () => {
      ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const animate = (time: number) => {
      const elapsed = Math.max(0, time - previousTime);
      previousTime = time;
      const weight = 1 - Math.exp(-elapsed / followTimeMs);
      x += (targetX - x) * weight;
      y += (targetY - y) * weight;

      if (Math.hypot(targetX - x, targetY - y) < 0.5) {
        x = targetX;
        y = targetY;
        frame = undefined;
      } else {
        frame = window.requestAnimationFrame(animate);
      }

      renderPosition();
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !preference.matches) return;

      targetX = event.clientX;
      targetY = event.clientY;

      if (!ring.hasAttribute("data-visible")) {
        x = targetX;
        y = targetY;
        renderPosition();
        ring.setAttribute("data-visible", "");
        return;
      }

      if (frame === undefined) {
        previousTime = performance.now();
        frame = window.requestAnimationFrame(animate);
      }
    };

    const hide = () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      frame = undefined;
      ring.removeAttribute("data-visible");
    };

    const hideOnTouch = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") hide();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", hideOnTouch, { passive: true });
    window.addEventListener("blur", hide);
    document.documentElement.addEventListener("pointerleave", hide);
    preference.addEventListener("change", hide);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", hideOnTouch);
      window.removeEventListener("blur", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
      preference.removeEventListener("change", hide);
      hide();
    };
  }, []);

  return (
    <div className="cursor-ring" aria-hidden="true">
      <span ref={ringRef} />
    </div>
  );
}
