import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { TaapXItem } from "@/components/taap/TaapListItems";

const painPoints = [
  "Messy, unorganized list of itineraries",
  "Ability to adjust content was limited",
  "Outdated UI",
  "Limited preview functionality",
  "Inconsistent content hierarchy",
] as const;

export function ItineraryChallengeBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center lg:items-start">
      <SectionHeader
        overline="History"
        title="The challenge"
        description="Travel advisors using TAAP could book flights, hotels, and experiences, but once bookings were made, there was no unified view for the advisor or the traveler. Advisors were forced to manually compile trip details outside the platform, creating extra work and an inconsistent client experience on both desktop and mobile."
        className="w-full max-w-[620px] pb-10 lg:max-w-full"
      />

      <div className="flex w-full min-w-0 max-w-[620px] flex-col gap-10 lg:max-w-full lg:flex-row lg:items-center">
        <div className="w-full min-w-0 lg:w-[66.64%] lg:shrink-0">
          <Image
            src="/images/itinerary/challenge-shot.png"
            alt="Original TAAP itinerary detail and booked itineraries list"
            width={820}
            height={813}
            className="block h-auto w-full"
            sizes="(min-width: 1140px) 653px, calc(100vw - 40px)"
            unoptimized
          />
        </div>

        <div className="flex w-full min-w-0 flex-col items-start gap-3 lg:flex-1">
          <h3
            className="w-full font-extrabold text-2xl leading-8 text-heading sm:text-[30px] sm:leading-10"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            Pain points
          </h3>
          {painPoints.map((item) => (
            <TaapXItem key={item}>{item}</TaapXItem>
          ))}
        </div>
      </div>
    </section>
  );
}
