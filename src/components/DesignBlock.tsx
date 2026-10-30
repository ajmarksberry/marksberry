import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

const visuals = [
  {
    src: "/images/reach/design-desktops.webp",
    alt: "Overlapping REACH.ai desktop screens showing bookings and results dashboards",
    width: 2000,
    height: 1182,
    transparent: true,
  },
  {
    src: "/images/reach/design-bookings.webp",
    alt: "REACH.ai bookings detail screen with a table of client appointments",
    width: 2000,
    height: 1179,
    transparent: true,
  },
  {
    src: "/images/reach/design-mobiles.webp",
    alt: "REACH.ai mobile screens showing results, account, and password",
    width: 1831,
    height: 2000,
    transparent: true,
  },
  {
    src: "/images/reach/design-login.webp",
    alt: "REACH.ai welcome back login screen with portrait",
    width: 2040,
    height: 1194,
  },
  {
    src: "/images/reach/design-system.webp",
    alt: "REACH.ai design system sheets with colors, buttons, and typography",
    width: 2316,
    height: 1536,
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
          <Image
            key={visual.src}
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
        ))}
      </div>
    </section>
  );
}
