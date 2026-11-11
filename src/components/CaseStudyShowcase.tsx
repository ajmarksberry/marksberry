"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { HeroArtwork } from "@/components/HeroArtwork";
import { ArrowRightIcon, MinnesotaIcon } from "@/components/Icons";
import { Divider } from "@/components/Divider";
import { ReachLogo } from "@/components/ReachLogo";
import { SectionHeader } from "@/components/SectionHeader";
import { TaapLogo } from "@/components/TaapLogo";
import { caseStudies, caseStudyTag } from "@/lib/site";

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
const welcomeHeadline = "Senior Product Designer";
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

/**
 * The logo on a homepage card. The card is white in both themes, so these are
 * the dark-text logos, never the theme-aware ones. All share one height; the
 * width follows each logo's proportions. `name` is also what comes out of the
 * title.
 */
const CARD_LOGO_HEIGHT = 20;
const expediaCardBrand = {
  name: "Expedia",
  logo: "/images/taap/expedia-logo.svg",
  width: 110,
} as const;
const reachCardBrand = {
  name: "REACH.ai",
  logo: "/images/reach/logo-shape.svg",
  width: 94,
} as const;
const cardBrandFor: Record<
  string,
  typeof expediaCardBrand | typeof reachCardBrand
> = {
  "/projects/taap": expediaCardBrand,
  "/projects/taap-itinerary": expediaCardBrand,
  "/projects/reach-ai": reachCardBrand,
  "/projects/reach-booking": reachCardBrand,
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
  // The client's logo above the title already says who the client is, so the
  // name comes out of the title.
  const brand = cardBrandFor[study.href];
  const title = brand
    ? study.title
        .replace(brand.name, "")
        .trim()
        .replace(/^./, (c) => c.toUpperCase())
    : study.title;

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
          loading="eager"
          unoptimized
        />
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-2 p-6">
        {brand ? (
          <Image
            src={brand.logo}
            alt={brand.name}
            width={brand.width}
            height={CARD_LOGO_HEIGHT}
            className="mb-1 block shrink-0"
            unoptimized
          />
        ) : null}
        <span
          className="font-extrabold text-2xl leading-8 tracking-[-0.4px] text-[#111827]"
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          {title}
        </span>
        <span className="font-semibold text-[11px] uppercase leading-4 tracking-[1.2px] text-[#6B7280]">
          {caseStudyTag(study)}
        </span>
        <span
          className="text-base leading-6 text-[#374151]"
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          {study.summary}
        </span>
        {/* The footer row: the badge on the left, level with the arrow, which sits
         * in the corner. */}
        <span className="mt-auto flex h-6 items-center pr-10 box-content pt-4">
          <span className="bg-[color-mix(in_oklab,var(--figma-highlights)_80%,black)] px-2 py-1 font-semibold text-xs leading-4 text-white">
            {study.platform}
          </span>
        </span>
      </span>

      <ArrowRightIcon className="absolute bottom-6 right-6 size-6 shrink-0 text-[#111827] transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none" />

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

/** The scroll animations in flight, so a new grab or click can cut one short. */
const scrollAnimations = new WeakMap<HTMLElement, number>();

/** Hands scrolling back to the browser, snapping included. */
function stopScrollAnimation(row: HTMLElement) {
  const frame = scrollAnimations.get(row);
  if (frame === undefined) return;
  cancelAnimationFrame(frame);
  scrollAnimations.delete(row);
  row.style.scrollSnapType = "";
}

/**
 * Glides the row to a card: quick off the mark, then easing into place. Snap
 * is held off for the glide (it would fight every frame) and switched back on
 * once the row has landed on the snap point, so it has nothing left to correct.
 */
function scrollToCard(row: HTMLElement, index: number) {
  stopScrollAnimation(row);
  const from = row.scrollLeft;
  const max = row.scrollWidth - row.clientWidth;
  const to = Math.min(Math.max(from + cardOffsets(row)[index], 0), max);
  const distance = Math.abs(to - from);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || distance < 1) {
    row.scrollLeft = to;
    return;
  }

  const duration = 420 + Math.min(distance, 800) * 0.35;
  const start = performance.now();
  row.style.scrollSnapType = "none";

  function step(now: number) {
    const progress = Math.min(1, (now - start) / duration);
    row.scrollLeft = from + (to - from) * (1 - (1 - progress) ** 4);
    if (progress < 1) {
      scrollAnimations.set(row, requestAnimationFrame(step));
    } else {
      scrollAnimations.delete(row);
      row.style.scrollSnapType = "";
    }
  }
  scrollAnimations.set(row, requestAnimationFrame(step));
}

/**
 * The cards in a row you can drag, with a dot per card underneath.
 *
 * Touch scrolls the row natively. A mouse can't, so pointer events drive
 * scrollLeft while it's held down: the row eases after the pointer rather than
 * jumping to it, and snapping is switched off for the drag. On release the row
 * glides to a card (a quick flick goes to the next one) and snapping comes
 * back once it has landed. A drag swallows the click that follows it, so
 * letting go over a card doesn't open it.
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
    let goal = 0;
    let follow = 0;

    // While held, the row chases the pointer a little behind it; that's what
    // takes the stutter out of a drag.
    function chase() {
      if (!row) return;
      const gap = goal - row.scrollLeft;
      if (Math.abs(gap) < 0.5) {
        row.scrollLeft = goal;
      } else {
        row.scrollLeft += gap * 0.3;
      }
      follow = requestAnimationFrame(chase);
    }

    function onPointerDown(event: PointerEvent) {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      stopScrollAnimation(row!);
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
        goal = row.scrollLeft;
        follow = requestAnimationFrame(chase);
      }
      const now = performance.now();
      const instant = (event.clientX - lastX) / Math.max(1, now - lastTime);
      velocity = velocity * 0.4 + instant * 0.6;
      lastX = event.clientX;
      lastTime = now;
      goal = startLeft - dx;
    }

    function onPointerUp(event: PointerEvent) {
      if (pointerId !== event.pointerId || !row) return;
      pointerId = null;
      if (!dragging) return;
      dragging = false;
      cancelAnimationFrame(follow);
      // Held still before letting go: that's a drop, not a flick.
      if (performance.now() - lastTime > 100) velocity = 0;

      const offsets = cardOffsets(row);
      let target = nearestCard(offsets);
      if (velocity < -0.4) {
        const ahead = offsets.findIndex((offset) => offset > 1);
        if (ahead !== -1) target = Math.max(target, ahead);
      } else if (velocity > 0.4) {
        const behind = offsets.findLastIndex((offset) => offset < -1);
        if (behind !== -1) target = Math.min(target, behind);
      }

      row.style.cursor = "";
      row.style.userSelect = "";
      scrollToCard(row, target);
    }

    // A touch or wheel mid-glide takes over from it.
    function onTakeOver() {
      if (row) stopScrollAnimation(row);
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
    row.addEventListener("touchstart", onTakeOver, { passive: true });
    row.addEventListener("wheel", onTakeOver, { passive: true });
    row.addEventListener("pointermove", onPointerMove);
    row.addEventListener("pointerup", onPointerUp);
    row.addEventListener("pointercancel", onPointerUp);
    row.addEventListener("click", onClickCapture, true);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(follow);
      stopScrollAnimation(row);
      row.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
      row.removeEventListener("pointerdown", onPointerDown);
      row.removeEventListener("touchstart", onTakeOver);
      row.removeEventListener("wheel", onTakeOver);
      row.removeEventListener("pointermove", onPointerMove);
      row.removeEventListener("pointerup", onPointerUp);
      row.removeEventListener("pointercancel", onPointerUp);
      row.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  // The cards fade in from left to right, one after another, as soon as the hero
  // artwork has finished. They do not wait to be scrolled to: they are part of
  // the page from the start, so they are there (and have already played) by the
  // time anyone scrolls down to them.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    row.style.setProperty("--fade-delay", `${120 + holdForHero()}ms`);
    row.dataset.in = "true";
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
        {caseStudies.map((study, index) => (
          <li
            key={study.href}
            data-card
            className="card-fade-in w-[82%] max-w-[340px] shrink-0 snap-start sm:w-[340px]"
            style={{ "--i": index } as CSSProperties}
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

/**
 * When the hero has finished playing, in ms from the page load. The artwork's
 * last pieces land by about 1.9s (the back wave 1.75s, the fish 1.66s, the lure
 * 1.9s), and the "Minneapolis, MN" line, which comes in last, starts at 1.9s
 * (LOCATION_DELAY_MS) and takes 0.75s to fade up: 2.65s. The case studies, which
 * are already on screen at load, wait until then. The hold is measured from the
 * page load, so a reveal that fires late (a slow start, or a page that was
 * scrolled down) waits less, or not at all.
 */
const LOCATION_DELAY_MS = 1900;
const LOCATION_FADE_MS = 750;
const HERO_INTRO_MS = LOCATION_DELAY_MS + LOCATION_FADE_MS;

/** Milliseconds still to wait, from now, for the hero artwork to finish. */
function holdForHero() {
  return Math.max(0, HERO_INTRO_MS - performance.now());
}

/**
 * Fades and rises its children in the first time they scroll into view. What's
 * already on screen at load holds back until the hero artwork has played;
 * anything further down reveals as soon as you reach it. `eager` ones do not
 * wait to be scrolled to: they play when the hero artwork has finished. `delay` staggers neighbours.
 */
function Reveal({
  children,
  delay = 0,
  className = "",
  eager = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Play as soon as the hero has finished, without waiting to be scrolled to. */
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (eager) {
      node.style.setProperty("--reveal-delay", `${delay + holdForHero()}ms`);
      node.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.style.setProperty("--reveal-delay", `${delay + holdForHero()}ms`);
        node.dataset.visible = "true";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay, eager]);

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
        <div className="flex w-full flex-col items-center gap-6">
          {/* The artwork carries the name and title as drawn letters, so the
           * real heading is here for screen readers and search. */}
          <h1 className="sr-only">
            {welcomeOverline}, {welcomeHeadline}
          </h1>
          <HeroArtwork className="h-auto w-full max-w-[960px]" />
          <p
            className="hero-reveal flex items-center gap-2 font-extrabold text-xs uppercase leading-none text-accent"
            style={{ animationDelay: `${LOCATION_DELAY_MS}ms` }}
          >
            <MinnesotaIcon className="size-4 shrink-0" />
            {welcomeLocation}
          </p>
        </div>
      ) : null}

      {/* No rule between the hero and the case studies, and the gap there is
       * halved (the section's own gap is 48-64px), so the location line sits
       * close to the "Case studies" heading. */}
      <div className="-mt-6 flex flex-col gap-4 lg:-mt-8">
        <Reveal eager>
          <SectionHeader
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
          <CardCarousel id={listId} />
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
