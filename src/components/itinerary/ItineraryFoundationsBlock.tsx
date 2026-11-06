import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

export function ItineraryFoundationsBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-10 lg:items-start">
      <SectionHeader
        overline="Discovery"
        title="Foundations"
        subtitle="Discovery & competitive audit"
        description="Reviewed how other platforms handle itinerary sharing to identify patterns and inspiration before any design work began."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="w-full min-w-0 max-w-[620px] overflow-clip rounded-lg bg-mat lg:max-w-full">
        <Image
          src="/images/itinerary/foundations-tray.png"
          alt="Competitive audit collage of itinerary sharing patterns"
          width={2560}
          height={1016}
          className="block h-auto w-full"
          sizes="(min-width: 1140px) 980px, calc(100vw - 40px)"
          unoptimized
        />
      </div>
    </section>
  );
}
