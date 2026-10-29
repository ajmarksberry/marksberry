"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRightIcon } from "@/components/Icons";
import { ReachLogo } from "@/components/ReachLogo";
import { TaapLogo } from "@/components/TaapLogo";
import { caseStudies } from "@/lib/site";

type Study = (typeof caseStudies)[number];
type Treatment = "banner" | "cards" | "circles";

/**
 * The homepage has concepts for how the case studies are shown, and a switch to
 * move between them. Banner is the default; flip SHOW_LAYOUT_TOGGLE to false to
 * hide the switch and show only DEFAULT_TREATMENT.
 *
 * Circles is built too but is not offered in the switch: add it to `treatments`
 * to bring it back.
 */
const SHOW_LAYOUT_TOGGLE = true;
const DEFAULT_TREATMENT: Treatment = "banner";

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
      className="group flex h-full w-full flex-col overflow-clip rounded-2xl bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_8px_24px_rgba(16,24,40,0.08),0_24px_48px_-12px_rgba(16,24,40,0.14)] outline-none transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(16,24,40,0.06),0_12px_32px_rgba(16,24,40,0.12),0_32px_64px_-12px_rgba(16,24,40,0.2)] focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <span className="relative block aspect-[4/3] w-full shrink-0 overflow-clip">
        <Image
          src={study.hero ?? FALLBACK_BANNER}
          alt=""
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
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
    </Link>
  );
}

export function CaseStudyShowcase() {
  const pathname = usePathname();
  const groupId = useId();
  const [treatment, setTreatment] = useState<Treatment>(DEFAULT_TREATMENT);
  const bannerListRef = useSwipeGuard<HTMLUListElement>();
  const cardRowRef = useRef<HTMLUListElement>(null);
  const listId = `${groupId}-list`;

  /** One card's width, gap included, in the direction asked for. */
  function scrollCards(direction: 1 | -1) {
    const row = cardRowRef.current;
    const first = row?.querySelector("li");
    if (!row || !first) return;
    const step = first.getBoundingClientRect().width + 24;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    row.scrollBy({
      left: direction * step,
      behavior: reduced ? "auto" : "smooth",
    });
  }

  return (
    <section
      aria-label="Case studies"
      className="flex w-full flex-col gap-6 sm:gap-8"
    >
      {SHOW_LAYOUT_TOGGLE ? (
        <div className="mt-6 flex items-center justify-between gap-4 sm:mt-8">
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

          {treatment === "cards" ? (
            <div className="flex items-center gap-2">
              {([-1, 1] as const).map((direction) => (
                <button
                  key={direction}
                  type="button"
                  aria-label={
                    direction === 1
                      ? "Next case studies"
                      : "Previous case studies"
                  }
                  aria-controls={listId}
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-surface text-ink transition-opacity duration-200 ease-out hover:opacity-60 motion-reduce:transition-none"
                  onClick={() => scrollCards(direction)}
                >
                  <ArrowRightIcon
                    className={
                      direction === -1 ? "size-5 rotate-180" : "size-5"
                    }
                  />
                </button>
              ))}
            </div>
          ) : null}
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
        // The padding and matching negative margin leave room inside the scroll
        // container for each card's shadow, which it would otherwise clip.
        <ul
          id={listId}
          ref={cardRowRef}
          className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto px-4 pb-14 pt-4 [scrollbar-width:thin]"
        >
          {caseStudies.map((study) => (
            <li
              key={study.href}
              className="w-[82%] max-w-[340px] shrink-0 snap-start sm:w-[340px]"
            >
              <CaseStudyCard study={study} />
            </li>
          ))}
        </ul>
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
    </section>
  );
}
