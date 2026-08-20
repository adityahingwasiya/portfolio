"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";
import { IconClose, IconMenu } from "./icons";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-zinc-200/80 bg-zinc-50/80 backdrop-blur-md dark:border-white/10 dark:bg-[#05050a]/88"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="text-sm font-medium tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          {site.name}
        </a>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-5 lg:flex lg:gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center text-zinc-700 lg:hidden dark:text-zinc-200"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <IconClose className="h-5 w-5" />
            ) : (
              <IconMenu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-zinc-200 bg-zinc-50/95 px-6 py-6 lg:hidden dark:border-white/8 dark:bg-zinc-950/95"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-1 text-base text-zinc-800 dark:text-zinc-200"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
