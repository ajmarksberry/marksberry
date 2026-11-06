export const EMAIL = "ajmarksberry@gmail.com";
export const MAILTO = `mailto:${EMAIL}`;
export const LINKEDIN_URL = "https://www.linkedin.com/in/marksberry";

export const RESUME_PATH = "/AJ_Marksberry_Resume_2026.pdf";
/** Name the file lands under on the visitor's machine. */
export const RESUME_FILENAME = "AJ-Marksberry-Resume-2026.pdf";

export const SHOW_ABOUT = true;
/** Gates both the nav link and the page itself, like SHOW_ABOUT. */
export const SHOW_EXPEDIA_WORK = true;
/** Gates the Visual design page and its rows in the menu and More work list. */
export const SHOW_VISUAL_DESIGN = true;

/** Shows the Original / Optimized switch on the case studies. It is on in
 * `next dev` and off in any production build, so the live site never shows it.
 * With it off, every visitor gets CASE_STUDY_LIVE_VERSION and the other versions
 * stay in the code, unseen. */
export const SHOW_VERSION_TOGGLE = process.env.NODE_ENV !== "production";
/** Which version of each case study visitors get on the live site: "optimized"
 * is the six-section version, "original" is the longer page it replaced. In
 * `next dev` the pages open on "optimized" and the switch flips between them. */
export const CASE_STUDY_LIVE_VERSION: "optimized" | "original" = "optimized";

/** Which versions get built into each case study page. The live site ships only
 * CASE_STUDY_LIVE_VERSION, so the other versions never reach visitors, even in
 * the page source. `next dev` builds them all so the switch can flip between them. */
export const INCLUDE_OPTIMIZED =
  SHOW_VERSION_TOGGLE || CASE_STUDY_LIVE_VERSION === "optimized";
export const INCLUDE_ORIGINAL =
  SHOW_VERSION_TOGGLE || (CASE_STUDY_LIVE_VERSION as string) === "original";
export const INCLUDE_LEGACY = SHOW_VERSION_TOGGLE;

/** Show the light/dark switch in the corner. While it is off, every visitor gets
 * DEFAULT_THEME and any choice saved by an earlier visit is ignored. */
export const SHOW_THEME_TOGGLE = false;
/** The theme a visitor starts on (and always gets, while the switch is hidden). */
export const DEFAULT_THEME: "light" | "dark" = "light";

/**
 * The Expedia work page as a list row, for the mobile menu. `hero` is the
 * Expedia wordmark on a dark tile, cropped from the page's own screenshots.
 */
export const expediaWorkLink = {
  href: "/expedia-work",
  title: "Other Expedia work",
  description: "More of the work I've done at Expedia Group.",
  hero: "/images/expedia-work/expedia-thumb.webp",
} as const;

/** The Visual design page as a list row. `hero` is cropped from the Cowtown
 * homepage. */
export const visualDesignLink = {
  href: "/visual-design",
  title: "Visual design",
  description: "A selection of websites and interfaces I've designed.",
  hero: "/images/visual-design/thumb.webp",
} as const;

export const navLinks = [
  { href: "/projects", label: "Case studies" },
  ...(SHOW_EXPEDIA_WORK
    ? [{ href: "/expedia-work", label: "Expedia work" }]
    : []),
  ...(SHOW_VISUAL_DESIGN
    ? [{ href: "/visual-design", label: "Visual design" }]
    : []),
  ...(SHOW_ABOUT ? [{ href: "/about", label: "About" }] : []),
  { href: "/contact", label: "Contact" },
];

/**
 * `hero` is the photograph that represents a case study on the homepage — the
 * banner backdrop and the circle thumbnail both read it. null means "no image of
 * its own yet"; the showcase falls back to a shared placeholder.
 *
 * `client` and `years` are the facts each homepage card lists under its
 * description, laid out like the meta strip at the top of a case study. Both
 * repeat each case study's hero block.
 *
 * `audience` and `summary` are only for the homepage cards: the tag line under
 * the title (client · audience · years) and the sentence beneath it. The other
 * places that list the case studies keep using `description`.
 */
export const caseStudies = [
  {
    href: "/projects/taap",
    client: "Expedia",
    audience: "B2B",
    years: "2023-2026",
    title: "Expedia TAAP Trips",
    description:
      "From chaos to clarity: three generations that turned a consumer list into a professional advisor workspace",
    summary:
      "Three generations transforming a consumer-borrowed flat list into a professional, accessible advisor workspace.",
    thumb: "/images/taap/hero-tray.webp",
    hero: "/images/taap/trips-hero.webp",
  },
  {
    href: "/projects/taap-itinerary",
    client: "Expedia",
    audience: "B2B",
    years: "2025-2026",
    title: "Expedia TAAP Itinerary Builder",
    description:
      "Designed and validated a new itinerary creation workflow that gives travel advisors a simpler, more flexible way to create client-ready itineraries.",
    summary:
      "Designed and validated a new itinerary creation workflow that gives travel advisors a simpler, more flexible way to create client-ready itineraries.",
    thumb: "/images/itinerary/hero-tray.webp",
    hero: null,
  },
  {
    href: "/projects/reach-ai",
    client: "REACH.ai",
    audience: "B2B",
    years: "2020-2022",
    title: "REACH.ai Booking Dashboard",
    description: "Bringing an outdated experience back to life again",
    summary:
      "The business analytics side of a two-sided AI booking platform for beauty & wellness, designed from 0-to-1.",
    thumb: "/images/reach/hero-tray.webp",
    hero: "/images/reach/dashboard-hero.webp",
  },
  {
    href: "/projects/reach-booking",
    client: "REACH.ai",
    audience: "B2C",
    years: "2020-2022",
    title: "REACH.ai booking experience",
    description:
      "Filling last-minute appointments to capture lost revenue for service providers, built from the ground up",
    summary:
      "The consumer booking side of a two-sided AI booking platform for beauty & wellness, designed from 0-to-1.",
    thumb: "/images/booking/hero-tray.webp",
    hero: "/images/booking/experience-hero.webp",
  },
] as const;

export type CaseStudyHref = (typeof caseStudies)[number]["href"];

/** The tag line under a case study's title: client, audience, and years. */
export function caseStudyTag(study: {
  client: string;
  audience: string;
  years: string;
}) {
  return [study.client, study.audience, study.years].join(" · ");
}
