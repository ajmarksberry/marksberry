export const EMAIL = "ajmarksberry@gmail.com";
export const MAILTO = `mailto:${EMAIL}`;
export const LINKEDIN_URL = "https://www.linkedin.com/in/marksberry";

export const RESUME_PATH = "/AJ_Marksberry_Resume_2026.pdf";
/** Name the file lands under on the visitor's machine. */
export const RESUME_FILENAME = "AJ-Marksberry-Resume-2026.pdf";

export const SHOW_ABOUT = true;
/** The two groups on the Projects page (/work): the other Expedia work, and the
 * visual design projects. Turning one off hides that group. */
export const SHOW_EXPEDIA_WORK = true;
export const SHOW_VISUAL_DESIGN = true;
/** Gates both the nav link and the Projects page itself, like SHOW_ABOUT: on
 * while either group is. */
export const SHOW_PROJECTS = SHOW_EXPEDIA_WORK || SHOW_VISUAL_DESIGN;

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

export const navLinks = [
  { href: "/projects", label: "Case studies" },
  ...(SHOW_PROJECTS ? [{ href: "/work", label: "Projects" }] : []),
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
 * `platform`, `audience` and `summary` are only for the case study lists.
 * `platform` names what the work was built for, in words a recruiter would
 * search, instead of the company. The homepage card lists it as its "Project"
 * row; the other lists use it in their tag line (platform · audience · years). The other
 * places that list the case studies keep using `description`.
 */
export const caseStudies = [
  {
    href: "/projects/taap",
    client: "Expedia",
    platform: "Enterprise travel platform",
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
    platform: "Enterprise travel platform",
    audience: "B2B",
    years: "2025-2026",
    title: "Expedia TAAP Itinerary Builder",
    description:
      "Designed and validated a new itinerary workflow that gives travel advisors a simpler, more flexible way to curate client-ready itineraries and share them with travelers.",
    summary:
      "Designed and validated a new itinerary workflow that gives travel advisors a simpler, more flexible way to curate client-ready itineraries and share them with travelers.",
    thumb: "/images/itinerary/hero-tray.webp",
    hero: null,
  },
  {
    href: "/projects/reach-ai",
    client: "REACH.ai",
    platform: "AI booking platform",
    audience: "B2C and B2B",
    years: "2020-2022",
    title: "REACH.ai AI Booking Platform",
    description:
      "Designing both sides of a platform for beauty and wellness studios",
    summary:
      "A booking experience built from scratch and a redesigned business dashboard, on one design language.",
    thumb: "/images/reach/hero-tray.webp",
    hero: "/images/reach/dashboard-hero.webp",
  },
] as const;

export type CaseStudyHref = (typeof caseStudies)[number]["href"];

/** The tag line under a homepage card's title: audience and years. The project
 * type has its own row in the card, so it is not repeated here. */
export function caseStudyTag(study: { audience: string; years: string }) {
  return [study.audience, study.years].join(" · ");
}
