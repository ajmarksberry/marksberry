"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Item = { id: string; label: string };

/** Only the case study pages, /projects/<slug>, get a section nav. */
const CASE_STUDY = /^\/projects\/[^/]+\/?$/;
/** A section counts as current once its top passes this far down the screen. */
const READ_LINE = 140;
/** Clears the fixed top bar when a link scrolls a section into view. */
const SCROLL_MARGIN = 96;

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** The nav label for a section, or null to leave it out. */
function labelFor(section: HTMLElement, first: boolean): string | null {
  if (first) return "Overview";
  const overline = section.querySelector("p")?.textContent?.trim() ?? "";
  if (overline.toLowerCase() === "case studies") return null; // "More work"
  const title = section.querySelector("h2")?.textContent?.trim();
  const generation = overline.match(/^Generation (\d+)/i);
  if (title) return generation ? `Gen ${generation[1]}: ${title}` : title;
  return overline
    ? overline.charAt(0).toUpperCase() + overline.slice(1).toLowerCase()
    : null;
}

/** Every visible section of the page, in order, with an id and a label. */
function collect() {
  const found: { el: HTMLElement; id: string; label: string }[] = [];
  const used = new Set<string>();
  // Ids this nav handed out earlier may now belong to a hidden version of the
  // page, so take them back first; otherwise two sections could share one.
  document.querySelectorAll<HTMLElement>("[data-nav-id]").forEach((el) => {
    el.removeAttribute("id");
    el.removeAttribute("data-nav-id");
  });
  document.querySelectorAll<HTMLElement>("main section").forEach((el) => {
    // The TAAP page renders two versions and hides one.
    if (el.closest("[hidden]") || el.getClientRects().length === 0) return;
    const label = labelFor(el, found.length === 0);
    if (!label) return;

    let id = el.id || slug(label) || `section-${found.length}`;
    while (used.has(id)) id += "-2";
    used.add(id);
    if (!el.id) {
      el.id = id;
      el.dataset.navId = "";
    }
    el.style.scrollMarginTop = `${SCROLL_MARGIN}px`;
    found.push({ el, id, label });
  });
  return found;
}

/**
 * A nav down the left edge of a case study, one link per section. It reads the
 * page itself, so every case study (and both versions of the TAAP Trips page)
 * gets one without listing its sections anywhere.
 *
 * Wide screens (2xl and up) have room in the margin to show the labels. Below
 * that it is a slim rail of ticks that opens into the labels on hover or focus.
 * Under lg it is hidden.
 */
export function SectionNav() {
  const pathname = usePathname();
  const enabled = CASE_STUDY.test(pathname);
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled) return;

    let sections = collect();
    let frame = 0;

    function sync() {
      const next = sections.map(({ id, label }) => ({ id, label }));
      setItems((prev) =>
        JSON.stringify(prev) === JSON.stringify(next) ? prev : next,
      );
    }

    function track() {
      let current = sections[0]?.id ?? "";
      for (const s of sections) {
        if (s.el.getBoundingClientRect().top <= READ_LINE) current = s.id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom && sections.length)
        current = sections[sections.length - 1].id;
      setActive(current);
    }

    function refresh() {
      sections = collect();
      sync();
      track();
    }

    function schedule(fn: () => void) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fn);
    }

    refresh();

    const onScroll = () => schedule(track);
    const onChange = () => schedule(refresh);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onChange);
    window.addEventListener("load", onChange);
    // Switching versions on the TAAP page flips `hidden` on a wrapper.
    const observer = new MutationObserver(onChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["hidden"],
      subtree: true,
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onChange);
      window.removeEventListener("load", onChange);
      observer.disconnect();
    };
  }, [enabled, pathname]);

  if (!enabled || items.length < 2) return null;

  return (
    <nav
      aria-label="Case study sections"
      className="group fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <ol className="flex flex-col gap-1 rounded-lg p-2 transition-colors group-hover:bg-background group-hover:shadow-lg group-hover:ring-1 group-hover:ring-rule group-focus-within:bg-background group-focus-within:shadow-lg group-focus-within:ring-1 group-focus-within:ring-rule 2xl:group-hover:bg-transparent 2xl:group-hover:shadow-none 2xl:group-hover:ring-0 2xl:group-focus-within:bg-transparent 2xl:group-focus-within:shadow-none 2xl:group-focus-within:ring-0">
        {items.map((item) => {
          const current = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? "true" : undefined}
                title={item.label}
                className={`flex items-center gap-3 rounded py-1.5 pr-2 text-sm leading-5 transition-colors ${
                  current
                    ? "font-semibold text-heading"
                    : "text-muted hover:text-ink focus-visible:text-ink"
                }`}
              >
                <span
                  aria-hidden
                  className={`h-0.5 shrink-0 rounded-full transition-all ${
                    current ? "w-6 bg-accent" : "w-3 bg-rule-strong"
                  }`}
                />
                <span className="hidden whitespace-nowrap group-hover:inline group-focus-within:inline 2xl:inline">
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
