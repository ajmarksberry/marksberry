import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

const visuals = [
  {
    src: "/images/reach/design-desktops.webp",
    alt: "Overlapping REACH.ai desktop screens showing bookings and results dashboards",
    width: 2000,
    height: 1182,
    transparent: true,
    caption:
      "The Results Dashboard: revenue, bookings, and email and SMS campaign results in one clear view.",
  },
  {
    src: "/images/reach/design-bookings.webp",
    alt: "REACH.ai bookings detail screen with a table of client appointments",
    width: 2000,
    height: 1179,
    transparent: true,
    caption:
      "Drilling into REACH Bookings shows each appointment with its source, service, provider, and total.",
  },
  {
    src: "/images/reach/design-mobiles.webp",
    alt: "REACH.ai mobile screens showing results, account, and password",
    width: 1831,
    height: 2000,
    transparent: true,
    caption:
      "The dashboard, bookings detail, and My Account screens, adapted for mobile.",
  },
  {
    src: "/images/reach/design-account.webp",
    alt: "REACH.ai Settings and My Account screens, overlapping, with business details, service intervals, plan, and billing history",
    width: 1572,
    height: 2000,
    transparent: true,
    caption:
      "The Settings and My Account screens, where owners manage their business details, service intervals, plan, and billing.",
  },
  {
    src: "/images/reach/design-login.webp",
    alt: "REACH.ai welcome back login screen with portrait",
    width: 2040,
    height: 1194,
    caption:
      "A simple sign-in screen that welcomes users back, paired with a warm portrait.",
  },
  {
    src: "/images/reach/design-system.webp",
    alt: "REACH.ai design system sheets with colors, buttons, and typography",
    width: 2316,
    height: 1536,
    caption:
      "The design system sheets for forms, buttons, elevations, and typography that keep every screen consistent.",
  },
] as const;

export function DesignBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-8 lg:gap-10">
      <SectionHeader
        overline="Create"
        title="Design"
        subtitle="Polishing the pixels"
        description="High-fidelity UI brought breathing room, confident typography, and a design system that made charts, status, and AI moments feel like one product family."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="flex w-full min-w-0 max-w-[620px] flex-col items-center gap-16 lg:max-w-full">
        {visuals.map((visual) => (
          <figure key={visual.src} className="flex w-full flex-col gap-2">
            <Image
              src={visual.src}
              alt={visual.alt}
              width={visual.width}
              height={visual.height}
              className={`block h-auto w-full ${
                "transparent" in visual ? "" : "rounded-lg"
              }`}
              sizes="(min-width: 1140px) 980px, calc(100vw - 40px)"
              unoptimized
            />
            <figcaption className="text-sm leading-6 text-muted">
              {visual.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
