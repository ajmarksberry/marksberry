import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

export function ItineraryDesignBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-10 lg:items-start">
      <SectionHeader
        overline="Make"
        title="Design"
        subtitle="Final designs"
        description="Production-ready UI with full accessibility annotations, conditional logic, and edge case coverage delivered at dev handoff."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="w-full min-w-0 max-w-[620px] lg:max-w-full">
        <Image
          src="/images/itinerary/design-tray.webp"
          alt="Final TAAP Share itinerary design"
          width={934}
          height={2000}
          className="block h-auto w-full"
          sizes="(min-width: 1140px) 980px, calc(100vw - 40px)"
          unoptimized
        />
      </div>
    </section>
  );
}
