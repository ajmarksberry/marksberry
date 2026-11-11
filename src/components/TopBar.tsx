"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AjMark } from "@/components/AjMark";
import { CaseStudyPreviewRow } from "@/components/CaseStudyPreviewRow";
import { CloseIcon, MenuIcon } from "@/components/Icons";
import { caseStudies, navLinks } from "@/lib/site";

const fade = "transition-opacity duration-200 ease-out hover:opacity-60";
/** Shared nav link treatment, so the two navs cannot drift apart. */
const navLinkBase =
  "whitespace-nowrap font-semibold uppercase leading-none tracking-[0.04em]";
const desktopLinkClass = `${navLinkBase} text-xs sm:text-sm`;
/** Nav text colors. The current page (a link that is switched off, since you are
 * already there) is the accent red, with the sliding line under it in the same
 * red; every other item is the bar's text color. */
const idleColor = "text-chrome-fg";
const currentColor = "text-accent";
/** The hamburger menu's page links: bigger and heavier than the desktop nav's,
 * since they are the main way around on a phone. */
const menuLinkClass =
  "whitespace-nowrap text-[28px] font-extrabold leading-none tracking-[-0.5px]";

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

/** The dropdown's case study rows sit in the same column as the page content: the
 * 1140px canvas with the page's own side padding inside it. */
const contentWidth = "mx-auto w-full max-w-[1140px] px-5 sm:px-10 lg:px-20";

export function TopBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const workButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLElement | null>>({});
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // The line under the selected page link. It is moved by hand rather than
  // rendered under each link so that it can slide from the old link to the new
  // one when the page changes; the first placement is not animated.
  const activeHref = navLinks.find(
    (link) => link.href !== "/projects" && isCurrentPath(pathname, link.href),
  )?.href;

  useEffect(() => {
    const nav = navRef.current;
    const line = indicatorRef.current;
    if (!nav || !line) return;

    function place() {
      const target = activeHref ? linkRefs.current[activeHref] : null;
      if (!line) return;
      if (!target) {
        line.style.opacity = "0";
        return;
      }
      line.style.opacity = "1";
      line.style.width = `${target.offsetWidth}px`;
      line.style.top = `${target.offsetTop + target.offsetHeight + 10}px`;
      line.style.transform = `translateX(${target.offsetLeft}px)`;
    }

    place();
    const frame = window.requestAnimationFrame(() => {
      line.dataset.ready = "true";
    });
    // The nav is display:none below sm and its width shifts as the font loads.
    // Re-place without sliding: a resize is not a page change.
    const observer = new ResizeObserver(() => {
      line.dataset.ready = "false";
      place();
      void line.offsetWidth;
      line.dataset.ready = "true";
    });
    observer.observe(nav);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [activeHref]);

  useEffect(() => {
    if (!open) return;

    const header = headerRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const dialog = header?.querySelector<HTMLElement>(
      'nav[role="dialog"]:not([inert])',
    );
    const firstLink = dialog?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        (workButtonRef.current ?? menuButtonRef.current)?.focus();
        return;
      }

      if (event.key !== "Tab" || !header) return;

      const focusable = [
        ...header.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ),
      ].filter((el) => !el.hasAttribute("inert") && el.tabIndex !== -1);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [open]);

  useEffect(() => {
    if (!headerRef.current || !barRef.current) return;
    const headerEl: HTMLElement = headerRef.current;
    const barEl: HTMLDivElement = barRef.current;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lastY = Math.max(0, window.scrollY);
    let offset = 0;
    let ticking = false;
    let ignoreUntil = 0;

    function maxOffset() {
      return barEl.offsetHeight;
    }

    function apply(next: number) {
      offset = Math.min(maxOffset(), Math.max(0, next));
      headerEl.style.transform = offset ? `translateY(-${offset}px)` : "";
      headerEl.style.pointerEvents = "";
    }

    function reveal(holdMs = 0) {
      apply(0);
      lastY = Math.max(0, window.scrollY);
      if (holdMs > 0) ignoreUntil = performance.now() + holdMs;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        if (media.matches || openRef.current) {
          reveal();
          return;
        }

        const y = Math.max(0, window.scrollY);
        const delta = y - lastY;
        lastY = y;

        if (performance.now() < ignoreUntil || y < 8) {
          apply(0);
          return;
        }

        apply(offset + delta);
      });
    }

    reveal(400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      headerEl.style.transform = "";
      headerEl.style.pointerEvents = "";
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const header = headerRef.current;
    if (!header) return;
    header.style.transform = "";
    header.style.pointerEvents = "";
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 left-0 z-50 w-full border-b border-chrome-line bg-chrome will-change-transform backdrop-blur-md"
    >
      <div className="mx-auto w-full max-w-[1140px]">
        <div
          ref={barRef}
          className="flex h-[72px] w-full items-center justify-between px-5 py-6 sm:h-[104px] sm:px-10 lg:px-20"
        >
          {pathname === "/" ? (
            <span
              aria-current="page"
              className="shrink-0 whitespace-nowrap font-bold text-lg leading-none tracking-[-0.72px] text-accent sm:text-[22px] sm:tracking-[-0.88px]"
            >
              <AjMark className="size-10 sm:size-12" />
              <span className="sr-only">AJ Marksberry</span>
            </span>
          ) : (
            <Link
              href="/"
              className={`shrink-0 whitespace-nowrap font-bold text-lg leading-none tracking-[-0.72px] text-chrome-fg sm:text-[22px] sm:tracking-[-0.88px] ${fade}`}
            >
              <AjMark className="size-10 sm:size-12" />
              <span className="sr-only">AJ Marksberry</span>
            </Link>
          )}
          <div className="flex items-center gap-3 sm:gap-6">
            <nav
              ref={navRef}
              className="relative hidden items-center gap-6 md:flex"
              aria-label="Primary"
            >
              <span
                ref={indicatorRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-0 h-0.5 w-0 bg-accent opacity-0 data-[ready=true]:transition-[transform,width,opacity] data-[ready=true]:duration-300 data-[ready=true]:ease-out motion-reduce:transition-none"
              />
              {navLinks.map((link) => {
                if (link.href === "/projects") {
                  return (
                    <button
                      key={link.href}
                      ref={workButtonRef}
                      type="button"
                      aria-expanded={open}
                      aria-controls={menuId}
                      aria-haspopup="dialog"
                      className={`${desktopLinkClass} ${
                        isCurrentPath(pathname, link.href)
                          ? currentColor
                          : open
                            ? `${idleColor} opacity-60`
                            : `${idleColor} ${fade}`
                      }`}
                      onClick={() => setOpen((current) => !current)}
                    >
                      {link.label}
                    </button>
                  );
                }

                if (isCurrentPath(pathname, link.href)) {
                  return (
                    <span
                      key={link.href}
                      ref={(el) => {
                        linkRefs.current[link.href] = el;
                      }}
                      aria-current="page"
                      className={`${desktopLinkClass} ${currentColor}`}
                    >
                      {link.label}
                    </span>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    ref={(el) => {
                      linkRefs.current[link.href] = el;
                    }}
                    href={link.href}
                    className={`${desktopLinkClass} ${idleColor} ${fade}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <button
              ref={menuButtonRef}
              type="button"
              className={`relative z-10 flex size-11 items-center justify-center text-chrome-fg pointer-events-auto md:hidden ${fade}`}
              aria-expanded={open}
              aria-controls={menuId}
              aria-haspopup="dialog"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((current) => !current)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      <WorkIndexPanel id={menuId} open={open} pathname={pathname} />
    </header>
  );
}

/** The phone menu's page links. Home leads; on desktop the logo is the way back.
 * Case studies is the dropdown itself, so it is not listed: the rows below are
 * what that link opens on desktop. Contact is an ordinary page, last. */
const phoneLinks = [
  { href: "/", label: "Home" },
  ...navLinks.filter((link) => link.href !== "/projects"),
];

/** Staggered reveal for one item of the dropdown, played each time it opens. */
function reveal(open: boolean, index: number, afterLinks = false) {
  return {
    className: open
      ? `menu-item-in${afterLinks ? " menu-item-after-links" : ""}`
      : "",
    style: open ? ({ "--i": index } as React.CSSProperties) : undefined,
  };
}

function WorkIndexPanel({
  id,
  open,
  pathname,
}: {
  id: string;
  open: boolean;
  pathname: string;
}) {
  return (
    <div
      className={`absolute left-0 right-0 top-full z-40 grid w-full max-w-none ${
        open ? "grid-rows-[1fr]" : "pointer-events-none grid-rows-[0fr]"
      } ${
        open
          ? "transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
          : "transition-[grid-template-rows] duration-200 ease-in motion-reduce:transition-none"
      }`}
    >
      <div className="min-h-0 overflow-hidden">
        <nav
          id={id}
          role="dialog"
          aria-modal={open}
          aria-label="Case studies"
          inert={!open || undefined}
          className="flex min-h-[calc(100svh-72px)] w-full flex-col overflow-y-auto border-t border-chrome-line bg-chrome-solid pb-10 pt-4 sm:min-h-[calc(100svh-104px)] sm:pb-16 sm:pt-6"
        >
          <div className={`${contentWidth} flex flex-col`}>
            <div className="mb-4 flex flex-col items-start md:hidden">
              {phoneLinks.map((link, i) => {
                const current = isCurrentPath(pathname, link.href);
                const r = reveal(open, i);
                // The desktop nav's own link treatment, so the two read as one
                // control: same type, dimmed with a line under it when it is
                // the current page, a plain fading link otherwise.
                const button = `${menuLinkClass} inline-block py-4`;
                return current ? (
                  <span
                    key={link.href}
                    aria-current="page"
                    className={`${button} ${currentColor} underline decoration-accent decoration-[3px] underline-offset-[10px] ${r.className}`}
                    style={r.style}
                  >
                    {link.label}
                  </span>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${button} ${idleColor} ${fade} ${r.className}`}
                    style={r.style}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <ul className="flex flex-col">
              {caseStudies.map((study, i) => (
                <li
                  key={study.href}
                  className={reveal(open, i, true).className}
                  style={reveal(open, i, true).style}
                >
                  <CaseStudyPreviewRow
                    study={study}
                    current={isCurrentPath(pathname, study.href)}
                    compact
                    dividerClassName="border-chrome-line"
                  />
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
