import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { TaapXItem } from "@/components/taap/TaapListItems";

const gaps = [
  "Two tabs only: Upcoming and Past and Canceled",
  "A flat list of hyperlinks showing destination, date, and itinerary number only",
  "No traveler name visible, which is critical for multi-client advisors",
  "No search, no filter, no booking type indicators",
  "No earnings, no refund status, no advisor-specific actions",
] as const;

export function TaapOriginsBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center lg:items-start">
      <SectionHeader
        overline="History"
        title="The challenge"
        description={`The original "My Trips" page was built for consumers, not professional travel advisors. For advisors managing hundreds of client bookings at once, it was completely inadequate.`}
        className="w-full max-w-[620px] pb-6 lg:max-w-full"
      />

      {/* Figma 7571:4091: the screen takes two thirds of the row with the list
       * centered beside it, straight on the page; stacked below lg. */}
      <div className="flex w-full min-w-0 max-w-[620px] flex-col gap-10 lg:max-w-full lg:flex-row lg:items-center">
        <div className="w-full min-w-0 lg:w-[66.64%] lg:shrink-0">
          <Image
            src="/images/taap/origins-table.webp"
            alt="Original My Trips page with a flat list of hyperlinks"
            width={1702}
            height={1608}
            className="block h-auto w-full"
            sizes="(min-width: 1140px) 653px, calc(100vw - 40px)"
            unoptimized
          />
        </div>

        <div className="flex w-full min-w-0 flex-col items-start gap-3 lg:flex-1">
          {gaps.map((item) => (
            <TaapXItem key={item}>{item}</TaapXItem>
          ))}
        </div>
      </div>
    </section>
  );
}
