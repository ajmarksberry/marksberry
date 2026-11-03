import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

/** What the row actually reads — satisfied by a case study or any other link. */
export type PreviewItem = {
  href: string;
  title: string;
  summary: string;
  client: string;
  audience: string;
  years: string;
  hero: string | null;
};

/** Landscape, no transparency — safe as a small rectangular thumbnail, unlike
 * the circle-cropped fallback the homepage's round treatment uses. */
const FALLBACK_THUMB = "/images/home/case-study-backdrop.webp";

/**
 * A smaller, horizontal echo of the homepage cards: thumbnail beside the title,
 * the tag line (client, audience, years), and the summary, full width of
 * whatever contains it. Used at the bottom of each case study page and, in
 * `compact` form, in the nav's case-study list.
 */
export function CaseStudyPreviewRow({
  study,
  current,
  compact = false,
  dividerClassName = "border-rule",
}: {
  study: PreviewItem;
  current: boolean;
  /** Tighter row for the phone menu, which has little room to spare: no summary
   * until the desktop dropdown's width (md), where it has the whole panel. */
  compact?: boolean;
  /** The two call sites sit on different backgrounds, so the divider differs. */
  dividerClassName?: string;
}) {
  return (
    <Link
      href={study.href}
      aria-current={current ? "page" : undefined}
      className={`group flex w-full items-center border-b outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:gap-6 ${
        compact ? "gap-3 py-3 sm:py-4 md:py-5" : "gap-4 py-4 sm:py-5"
      } ${dividerClassName} ${
        current
          ? "opacity-60"
          : "transition-opacity duration-200 ease-out hover:opacity-80"
      }`}
    >
      <span
        className={`relative block shrink-0 overflow-clip rounded-md bg-panel-dark ${
          compact
            ? "h-10 w-16 sm:h-16 sm:w-24 md:h-24 md:w-40 lg:h-28 lg:w-48"
            : "h-16 w-28 sm:h-24 sm:w-40 lg:h-28 lg:w-48"
        }`}
      >
        <Image
          src={study.hero ?? FALLBACK_THUMB}
          alt=""
          fill
          className="object-cover transition-[filter] duration-300 ease-out group-hover:brightness-110 motion-reduce:transition-none"
          sizes="192px"
          unoptimized
        />
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-1 sm:gap-2">
        <span
          className={`font-extrabold leading-6 text-heading ${
            compact
              ? "truncate text-[clamp(10px,3.3vw,14px)] sm:text-base md:text-lg"
              : "line-clamp-2 text-base sm:text-lg"
          }`}
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          {study.title}
        </span>
        <span className="font-semibold text-[11px] uppercase leading-4 tracking-[1.2px] text-muted">
          {/* Each part stays whole, so a narrow screen wraps between them and
           * never inside the years. */}
          {[study.client, study.audience, study.years].map((part, i, parts) => (
            <span key={part} className="whitespace-nowrap">
              {part}
              {i < parts.length - 1 ? " ·" : ""}{" "}
            </span>
          ))}
        </span>
        <span
          className={`text-sm leading-6 text-ink ${
            compact ? "hidden md:line-clamp-2" : "hidden sm:line-clamp-2"
          }`}
        >
          {study.summary}
        </span>
      </span>

      {current ? (
        <span className="hidden shrink-0 font-semibold text-[11px] uppercase leading-4 tracking-[1.2px] text-muted sm:block">
          Viewing
        </span>
      ) : null}
      <ArrowRightIcon
        className={`size-5 shrink-0 text-ink transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none ${
          current ? "sm:hidden" : ""
        }`}
      />
    </Link>
  );
}
