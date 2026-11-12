import Image from "next/image";
import { Divider } from "@/components/Divider";
import { ReachLogo } from "@/components/ReachLogo";
import copy from "@/components/story/reach-combined.json";
import {
  StorySections,
  type StorySectionData,
} from "@/components/story/StorySection";

const meta = [
  { label: "Client", value: "REACH.ai" },
  { label: "Role", value: "Lead product designer" },
  { label: "Platform", value: "B2C and B2B · Mobile and desktop" },
  { label: "Duration", value: "2020-2022" },
  { label: "Tools", value: "Figma · Principle" },
] as const;

const sections = [
  copy.overview,
  copy.challenge,
  copy.discovery,
  copy.workshop,
  copy.system,
  copy.consumer,
  copy.business,
  copy.results,
] as StorySectionData[];

/** One case study covering both REACH.ai sides, laid out after the v2 page.
 * Dev-only: reachable from the "Combined (v2)" switch in `next dev`. */
export function ReachCombinedVersion() {
  return (
    <>
      <section className="flex w-full flex-col items-start py-10">
        <div className="flex w-full max-w-[620px] flex-col items-start gap-6 pb-10">
          <div
            className="hero-reveal flex w-full flex-col items-start gap-5"
            style={{ animationDelay: "40ms" }}
          >
            <p className="font-extrabold text-xs uppercase leading-none text-accent">
              Case Study
            </p>
            <ReachLogo />
          </div>
          <h1
            className="hero-reveal w-full font-extrabold text-[36px] leading-[44px] tracking-[-0.9px] text-heading sm:text-[48px] sm:leading-[58px] sm:tracking-[-1.2px] lg:text-[60px] lg:leading-[72px] lg:tracking-[-1.5px]"
            style={{ fontFeatureSettings: '"liga" 0', animationDelay: "140ms" }}
          >
            REACH.ai
            <br />
            AI Booking Platform
          </h1>
          <p
            className="hero-reveal w-full text-lg leading-7 text-ink sm:text-xl"
            style={{ animationDelay: "240ms" }}
          >
            Designing both sides of a platform for beauty and wellness studios:
            a booking experience built from scratch and a redesigned business
            dashboard.
          </p>
        </div>
        <div className="hero-devices w-full overflow-clip rounded-lg">
          <Image
            src="/images/reach/hero-tray.webp"
            alt="REACH.ai dashboard shown on desktop and mobile"
            width={2560}
            height={1322}
            className="block h-auto w-full rounded-lg"
            unoptimized
            priority
            sizes="(min-width: 1140px) 980px, calc(100vw - 40px)"
          />
        </div>
        <div
          className="hero-reveal flex w-full flex-col items-center gap-6 pt-10"
          style={{ animationDelay: "360ms" }}
        >
          <Divider />
          <dl className="flex w-full flex-col gap-6 lg:flex-row lg:flex-wrap lg:items-start lg:justify-center lg:gap-x-[60px] lg:gap-y-6">
            {meta.map((item) => (
              <div key={item.label} className="flex flex-col items-start gap-2">
                <dt className="font-extrabold text-xs uppercase tracking-[0.48px] leading-none text-accent">
                  {item.label}
                </dt>
                <dd className="text-base font-semibold leading-7 text-ink lg:whitespace-nowrap">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
          <Divider />
        </div>
      </section>
      <StorySections sections={sections} lead="h-6" />
    </>
  );
}
