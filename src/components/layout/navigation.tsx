"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./theme";

const navigation = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "capabilities", label: "Capabilities" },
  { id: "contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [section, setSection] = useState("");
  const menu = useRef<HTMLDetailsElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = navigation.map(({ id }) => ({
      id,
      element: document.getElementById(id),
    }));
    let frame = 0;
    function update() {
      frame = 0;
      const cutoff = window.innerHeight * 0.35;
      const current = sections.findLast(
        ({ element }) =>
          element && element.getBoundingClientRect().top <= cutoff,
      );
      setSection(current?.id ?? "");
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        closeMenu();
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && menu.current?.open) {
        closeMenu();
        menu.current.querySelector("summary")?.focus();
      }
    }
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function closeMenu() {
    if (menu.current) menu.current.open = false;
  }

  function renderLinks() {
    return navigation.map(({ id, label }) => (
      <a
        key={id}
        href={pathname === "/" ? `#${id}` : `/#${id}`}
        className="nav-link"
        aria-current={
          pathname === "/" && section === id ? "location" : undefined
        }
        onClick={closeMenu}
      >
        {label}
      </a>
    ));
  }

  return (
    <header className="site-header editorial-header" ref={header}>
      <div className="editorial-shell header-inner">
        <Link href="/" className="editorial-brand" onClick={closeMenu}>
          <span>CB</span> Chamodya Bandara
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {renderLinks()}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <details className="editorial-menu" ref={menu}>
            <summary className="icon-button" aria-label="Mobile menu">
              <Menu className="menu-open-icon" size={20} aria-hidden="true" />
              <X className="menu-close-icon" size={20} aria-hidden="true" />
            </summary>
            <nav
              aria-label="Mobile navigation"
              className="editorial-mobile-nav"
            >
              {renderLinks()}
              <a className="nav-link" href={profile.resume} download>
                Résumé
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
