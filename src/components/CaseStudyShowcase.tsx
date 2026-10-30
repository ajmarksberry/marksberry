"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowRightIcon, LocationIcon } from "@/components/Icons";
import { Divider } from "@/components/Divider";
import { ReachLogo } from "@/components/ReachLogo";
import { SectionHeader } from "@/components/SectionHeader";
import { TaapLogo } from "@/components/TaapLogo";
import { caseStudies } from "@/lib/site";

type Study = (typeof caseStudies)[number];
type Treatment = "banner" | "cards" | "circles";

/**
 * The homepage has concepts for how the case studies are shown. Cards are the
 * default and the switch is hidden; flip SHOW_LAYOUT_TOGGLE to true to bring it
 * back, or set DEFAULT_TREATMENT to "banner" for the full-screen version.
 *
 * Circles is built too but is not offered in the switch: add it to `treatments`
 * to bring it back.
 */
const SHOW_LAYOUT_TOGGLE = false;
const DEFAULT_TREATMENT: Treatment = "cards";

/**
 * The big headline above the case studies. Set SHOW_WELCOME to false to hide it
 * (and the rule under it).
 */
const SHOW_WELCOME = true;
const welcomeOverline = "AJ Marksberry";
const welcomeHeadline = "Creative Product Designer";
const welcomeLocation = "Minneapolis, MN";

const treatments = [
  { value: "banner", label: "Banners" },
  { value: "cards", label: "Cards" },
] as const;

/**
 * Breaks out of BOTH the page padding and CaseStudyShell's max-w-[1140px], so a
 * card spans the viewport rather than the content column.
 */
const fullBleed = "ml-[calc(50%-50vw)] w-screen";

/** Stand-ins for the case studies that have no photograph of their own yet. */
const FALLBACK_BANNER = "/images/home/case-study-backdrop.webp";
const FALLBACK_CIRCLE = "/images/home/case-study-circle.webp";

/** How far a pointer travels before it counts as a drag rather than a tap. */
const DRAG_THRESHOLD = 8;

/**
 * Touch only. Stops a swipe that started on a card from being resolved as a tap
 * on its link — without that, scrolling a phone lands you inside a case study.
 *
 * The browser's own touch scrolling is left alone; it has momentum and
 * rubber-banding a JS handler would only degrade. All this does is watch how far
 * the finger moved and swallow the click if it was a swipe. Desktop is untouched:
 * a mouse scrolls with the wheel, so drag-to-scroll would only get in the way of
 * selecting and clicking.
 */
function useSwipeGuard<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let pointerId: number | null = null;
    let originY = 0;
    let dragging = false;
    let swallowClick = false;

    function onPointerDown(event: PointerEvent) {
      if (event.pointerType === "mouse") return;
      pointerId = event.pointerId;
      originY = event.clientY;
      dragging = false;
      // Clear it here, not in the click handler: a swipe that scrolls fires no
      // click at all, so a flag left armed would swallow the NEXT real tap.
      swallowClick = false;
    }

    function onPointerMove(event: PointerEvent) {
      if (pointerId !== event.pointerId) return;
      if (dragging) return;
      if (Math.abs(event.clientY - originY) < DRAG_THRESHOLD) return;
      dragging = true;
      swallowClick = true;
    }

    function onPointerUp(event: PointerEvent) {
      if (pointerId !== event.pointerId) return;
      pointerId = null;
      dragging = false;
    }

    function onClickCapture(event: MouseEvent) {
      if (!swallowClick) return;
      event.preventDefault();
      event.stopPropagation();
      swallowClick = false;
    }

    node.addEventListener("pointerdown", onPointerDown);
    node.addEventListener("pointermove", onPointerMove, { passive: true });
    node.addEventListener("pointerup", onPointerUp);
    node.addEventListener("pointercancel", onPointerUp);
    node.addEventListener("click", onClickCapture, true);

    return () => {
      node.removeEventListener("pointerdown", onPointerDown);
      node.removeEventListener("pointermove", onPointerMove);
      node.removeEventListener("pointerup", onPointerUp);
      node.removeEventListener("pointercancel", onPointerUp);
      node.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  return ref;
}

/** Figma "Shadow xs" — keeps the copy legible over the photograph. */
const textShadow = "[text-shadow:0px_2px_8px_rgba(28,44,64,0.16)]";

/** Which brand lockup sits above each title. */
const logoFor: Record<string, "taap" | "reach"> = {
  "/projects/taap": "taap",
  "/projects/taap-itinerary": "taap",
  "/projects/reach-ai": "reach",
  "/projects/reach-booking": "reach",
};

/** The banner logos run a little smaller than on the case study pages. */
const BANNER_LOGO_SCALE = 0.8;

/**
 * Figma 7821:4320, minus the product shot: the photograph now carries the whole
 * frame at 40% opacity. From sm up the copy starts a third of the way across the
 * banner (the left padding) and keeps 40px of its own padding on the right;
 * below sm it runs the full width.
 *
 * It stays a dark panel in both themes, so its copy uses the fixed on-dark
 * colors rather than the theme-aware --ink.
 */
function CaseStudyBanner({
  study,
  current,
}: {
  study: Study;
  current: boolean;
}) {
  const brand = logoFor[study.href];

  return (
    <Link
      href={study.href}
      aria-current={current ? "page" : undefined}
      draggable={false}
      className={`group relative flex h-full w-full items-center touch-pan-y overflow-clip bg-panel-dark px-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:pl-[33.333%] sm:pr-10 lg:pr-[6.94%] ${current ? "opacity-60" : ""}`}
    >
      <span
        aria-hidden
        className="card-media absolute inset-0 will-change-transform"
      >
        <Image
          src={study.hero ?? FALLBACK_BANNER}
          alt=""
          draggable={false}
          fill
          className="object-cover opacity-40 transition-[opacity,filter] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-[0.55] group-hover:brightness-110 group-active:opacity-[0.55] group-active:brightness-110 motion-reduce:transition-none"
          style={{ objectPosition: "50% 30%" }}
          sizes="100vw"
          priority={study.href === caseStudies[0].href}
          unoptimized
        />
      </span>

      <div className="relative flex w-full min-w-0 flex-col gap-6 sm:pr-10">
        <div className="card-rise flex flex-col gap-5">
          {brand === "taap" ? (
            <TaapLogo onDark scale={BANNER_LOGO_SCALE} />
          ) : (
            <ReachLogo onDark scale={BANNER_LOGO_SCALE} />
          )}
        </div>

        <p
          className={`card-rise card-rise-2 font-semibold text-[32px] leading-10 tracking-[-0.8px] text-white sm:text-[40px] sm:leading-[50px] sm:tracking-[-1px] lg:text-[48px] lg:leading-[60px] lg:tracking-[-1.2px] ${textShadow}`}
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          {study.title}
        </p>

        <p
          className={`card-rise card-rise-3 max-w-[620px] font-medium text-base leading-7 text-[var(--figma-on-dark-muted)] sm:text-lg ${textShadow}`}
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          {study.description}
        </p>
      </div>

      {/* Transition lives on the hover/focus/active state, not the resting
       * one. A transition change is governed by whichever state you're
       * entering: coming IN grows the stroke over 500ms; going back to rest
       * has no transition declared, so it snaps to 0 instantly. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 [box-shadow:inset_0_0_0_0px_var(--accent)] group-hover:[box-shadow:inset_0_0_0_16px_var(--accent)] group-hover:transition-[box-shadow] group-hover:duration-500 group-hover:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-focus-visible:[box-shadow:inset_0_0_0_16px_var(--accent)] group-focus-visible:transition-[box-shadow] group-focus-visible:duration-500 group-focus-visible:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-active:[box-shadow:inset_0_0_0_16px_var(--accent)] group-active:transition-[box-shadow] group-active:duration-500 group-active:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
      />
    </Link>
  );
}

/**
 * One project as a circle. The forward/back behavior is sibling-aware, so it
 * lives in globals.css as .circle-row / .circle-item rather than here.
 */
function CaseStudyCircle({
  study,
  current,
}: {
  study: Study;
  current: boolean;
}) {
  return (
    <Link
      href={study.href}
      aria-current={current ? "page" : undefined}
      className={`circle-item group relative flex flex-col items-center gap-4 outline-none ${current ? "opacity-60" : ""}`}
    >
      <span className="relative block aspect-square w-full overflow-clip rounded-full bg-panel-dark ring-1 ring-border group-focus-visible:ring-2 group-focus-visible:ring-accent">
        {/* The fallback is circle-cropped with transparent corners in Figma, so
         * it lines up with the container's own rounding. */}
        <Image
          src={study.hero ?? FALLBACK_CIRCLE}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 24vw, 44vw"
          unoptimized
        />
      </span>
      <p
        className="text-center font-semibold text-sm leading-6 text-ink sm:text-base"
        style={{ fontFeatureSettings: '"liga" 0' }}
      >
        {study.title}
      </p>
    </Link>
  );
}

/**
 * Concept: each case study as a vertical card — a white surface lifted off the
 * page by a soft layered shadow — in a row that scrolls sideways. Deliberately
 * plain: a thumbnail on top, then the title and the description, ready to be
 * restyled.
 *
 * The card is white in both themes, so its copy uses fixed dark colors rather
 * than the theme-aware tokens.
 */
function CaseStudyCard({ study }: { study: Study }) {
  return (
    <Link
      href={study.href}
      draggable={false}
      className="group relative flex h-full w-full flex-col overflow-clip rounded-2xl bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_8px_24px_rgba(16,24,40,0.08),0_24px_48px_-12px_rgba(16,24,40,0.14)] outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <span className="relative block aspect-[4/3] w-full shrink-0 overflow-clip">
        <Image
          src={study.hero ?? FALLBACK_BANNER}
          alt=""
          draggable={false}
          fill
          className="object-cover"
          sizes="(min-width: 640px) 340px, 82vw"
          unoptimized
        />
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-3 p-6">
        <span
          className="font-extrabold text-2xl leading-8 tracking-[-0.4px] text-[#111827]"
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          {study.title}
        </span>
        <span
          className="text-base leading-7 text-[#374151]"
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          {study.description}
        </span>
        <ArrowRightIcon className="mt-auto size-6 shrink-0 text-[#111827] transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none" />
      </span>

      {/* Drawn over the photograph, inside the card, so the card keeps its size. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl border-[3px] border-transparent group-hover:border-black"
      />
    </Link>
  );
}

/** Card helpers: where each card sits relative to the row's snap edge. */
function cardOffsets(row: HTMLElement): number[] {
  const inset = parseFloat(getComputedStyle(row).scrollPaddingLeft) || 0;
  const origin = row.getBoundingClientRect().left + inset;
  return Array.from(
    row.querySelectorAll<HTMLElement>("[data-card]"),
    (card) => card.getBoundingClientRect().left - origin,
  );
}

function nearestCard(offsets: number[]) {
  return offsets.reduce(
    (best, offset, index) =>
      Math.abs(offset) < Math.abs(offsets[best]) ? index : best,
    0,
  );
}

function scrollToCard(row: HTMLElement, index: number) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  row.scrollTo({
    left: row.scrollLeft + cardOffsets(row)[index],
    behavior: reduced ? "auto" : "smooth",
  });
}

/**
 * The cards in a row you can drag, with a dot per card underneath.
 *
 * Touch scrolls the row natively. A mouse can't, so pointer events drive
 * scrollLeft while it's held down; snapping is switched off for the drag and
 * back on at release, where the row settles on a card (a quick flick goes to
 * the next one). A drag swallows the click that follows it, so letting go over a
 * card doesn't open it.
 *
 * A spacer after the last card lets every card reach the left edge, so each dot
 * lines up with exactly one card.
 */
function CardCarousel({ id }: { id: string }) {
  const rowRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    let frame = 0;
    function syncActive() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (row) setActive(nearestCard(cardOffsets(row)));
      });
    }

    let pointerId: number | null = null;
    let startX = 0;
    let startLeft = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let dragging = false;
    let swallowClick = false;

    function onPointerDown(event: PointerEvent) {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      pointerId = event.pointerId;
      startX = lastX = event.clientX;
      startLeft = row!.scrollLeft;
      lastTime = performance.now();
      velocity = 0;
      dragging = false;
      swallowClick = false;
    }

    function onPointerMove(event: PointerEvent) {
      if (pointerId !== event.pointerId || !row) return;
      const dx = event.clientX - startX;
      if (!dragging) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        dragging = true;
        swallowClick = true;
        row.setPointerCapture(event.pointerId);
        row.style.scrollSnapType = "none";
        row.style.cursor = "grabbing";
        row.style.userSelect = "none";
      }
      const now = performance.now();
      velocity = (event.clientX - lastX) / Math.max(1, now - lastTime);
      lastX = event.clientX;
      lastTime = now;
      row.scrollLeft = startLeft - dx;
    }

    function onPointerUp(event: PointerEvent) {
      if (pointerId !== event.pointerId || !row) return;
      pointerId = null;
      if (!dragging) return;
      dragging = false;

      const offsets = cardOffsets(row);
      let target = nearestCard(offsets);
      if (velocity < -0.4) {
        const ahead = offsets.findIndex((offset) => offset > 1);
        if (ahead !== -1) target = Math.max(target, ahead);
      } else if (velocity > 0.4) {
        const behind = offsets.findLastIndex((offset) => offset < -1);
        if (behind !== -1) target = Math.min(target, behind);
      }

      row.style.scrollSnapType = "";
      row.style.cursor = "";
      row.style.userSelect = "";
      scrollToCard(row, target);
    }

    function onClickCapture(event: MouseEvent) {
      if (!swallowClick) return;
      event.preventDefault();
      event.stopPropagation();
      swallowClick = false;
    }

    syncActive();
    row.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);
    row.addEventListener("pointerdown", onPointerDown);
    row.addEventListener("pointermove", onPointerMove);
    row.addEventListener("pointerup", onPointerUp);
    row.addEventListener("pointercancel", onPointerUp);
    row.addEventListener("click", onClickCapture, true);

    return () => {
      cancelAnimationFrame(frame);
      row.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
      row.removeEventListener("pointerdown", onPointerDown);
      row.removeEventListener("pointermove", onPointerMove);
      row.removeEventListener("pointerup", onPointerUp);
      row.removeEventListener("pointercancel", onPointerUp);
      row.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  return (
    <div className="@container flex flex-col">
      {/* The row runs edge to edge so a card's shadow isn't cut off by the
       * scroll container. Its padding (50vw - 50cqw, the page gutter) puts the
       * first card back on the content column's left edge. */}
      <ul
        id={id}
        ref={rowRef}
        className={`${fullBleed} flex cursor-grab snap-x snap-mandatory scroll-pl-[calc(50vw-50cqw)] gap-6 overflow-x-auto px-[calc(50vw-50cqw)] pb-14 pt-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {caseStudies.map((study) => (
          <li
            key={study.href}
            data-card
            className="w-[82%] max-w-[340px] shrink-0 snap-start sm:w-[340px]"
          >
            <CaseStudyCard study={study} />
          </li>
        ))}
        <li
          aria-hidden
          className="w-[max(0px,calc(100%-min(82%,340px)-24px))] shrink-0"
        />
      </ul>

      <div
        role="group"
        aria-label="Choose a case study"
        className="-mt-8 flex items-center justify-center"
      >
        {caseStudies.map((study, index) => (
          <button
            key={study.href}
            type="button"
            aria-label={`Show ${study.title}`}
            aria-current={index === active ? "true" : undefined}
            aria-controls={id}
            className="group/dot flex size-6 items-center justify-center outline-none"
            onClick={() => {
              if (rowRef.current) scrollToCard(rowRef.current, index);
            }}
          >
            <span
              className={`size-2.5 rounded-full transition-[background-color,transform] duration-200 ease-out group-focus-visible/dot:ring-2 group-focus-visible/dot:ring-accent group-focus-visible/dot:ring-offset-2 group-focus-visible/dot:ring-offset-background motion-reduce:transition-none ${
                index === active
                  ? "scale-110 bg-heading"
                  : "bg-border group-hover/dot:bg-muted"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/** Gap past page load within which a reveal counts as "on load" and waits for
 * the headline to finish first. */
const LOAD_WINDOW_MS = 1500;
const AFTER_HEADLINE_MS = 450;

/**
 * Fades and rises its children in the first time they scroll into view. What's
 * already on screen at load holds back until the headline has played; anything
 * further down reveals as soon as you reach it. `delay` staggers neighbours.
 */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const onLoad = performance.now() < LOAD_WINDOW_MS;
        node.style.setProperty(
          "--reveal-delay",
          `${delay + (onLoad ? AFTER_HEADLINE_MS : 0)}ms`,
        );
        node.dataset.visible = "true";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function CaseStudyShowcase() {
  const pathname = usePathname();
  const groupId = useId();
  const [treatment, setTreatment] = useState<Treatment>(DEFAULT_TREATMENT);
  const bannerListRef = useSwipeGuard<HTMLUListElement>();
  const listId = `${groupId}-list`;

  return (
    <section
      aria-label="Case studies"
      className="flex w-full flex-col gap-12 pt-12 lg:gap-16 lg:pt-16"
    >
      {SHOW_WELCOME ? (
        <div className="flex w-full flex-col items-start gap-6">
          <p
            className="hero-reveal font-extrabold text-xs uppercase leading-none text-accent"
            style={{ animationDelay: "40ms" }}
          >
            {welcomeOverline}
          </p>
          <h1
            className="w-full font-extrabold text-[clamp(52px,11.5vw,148px)] leading-[0.95] tracking-[-0.045em] text-heading"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            {welcomeHeadline.split(" ").map((word, index) => (
              <span key={index}>
                {index > 0 ? " " : null}
                <span
                  className="word-in"
                  style={{ "--i": index } as React.CSSProperties}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <p
            className="hero-reveal flex items-center gap-2 font-extrabold text-lg leading-none tracking-[-0.02em] text-heading sm:text-xl"
            style={{ animationDelay: "560ms" }}
          >
            <LocationIcon className="size-6 shrink-0 text-accent sm:size-7" />
            {welcomeLocation}
          </p>
        </div>
      ) : null}

      {SHOW_WELCOME ? (
        <Reveal>
          <Divider />
        </Reveal>
      ) : null}

      <div className="flex flex-col gap-4">
        <Reveal>
          <SectionHeader
            overline="Selected work"
            title="Case studies"
            className="w-full max-w-[640px]"
          />
        </Reveal>

        {SHOW_LAYOUT_TOGGLE ? (
          <div className="flex items-center justify-between gap-4">
            <div
              role="group"
              aria-label="Case study layout"
              className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-surface p-1"
            >
              {treatments.map((option) => {
                const active = treatment === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={active}
                    aria-controls={listId}
                    className={`flex h-9 items-center rounded-full px-4 font-semibold text-xs uppercase tracking-[0.04em] transition-colors duration-200 ease-out motion-reduce:transition-none ${
                      active
                        ? "bg-heading text-background"
                        : "text-muted hover:text-ink"
                    }`}
                    onClick={() => setTreatment(option.value)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Cards sit one after another at full height — no overlap. The movement
         * comes from globals.css: the photograph parallaxes against the scroll and
         * the copy staggers in, both on scroll-driven timelines. */}
        {treatment === "banner" ? (
          <ul id={listId} ref={bannerListRef} className={fullBleed}>
            {caseStudies.map((study) => (
              <li key={study.href} className="h-[100svh] overflow-clip">
                <CaseStudyBanner
                  study={study}
                  current={pathname === study.href}
                />
              </li>
            ))}
          </ul>
        ) : treatment === "cards" ? (
          <Reveal delay={120}>
            <CardCarousel id={listId} />
          </Reveal>
        ) : (
          // 2x2 below lg — four circles across a phone would be thumbnails.
          <ul
            id={listId}
            className="circle-row grid grid-cols-2 gap-8 py-4 sm:gap-10 lg:grid-cols-4"
          >
            {caseStudies.map((study) => (
              <li key={study.href} className="w-full">
                <CaseStudyCircle
                  study={study}
                  current={pathname === study.href}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <Reveal>
        <Divider />
      </Reveal>
    </section>
  );
}
