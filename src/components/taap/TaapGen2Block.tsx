import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

export function TaapGen2Block() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-10 lg:items-start">
      <SectionHeader
        overline="Generation 2"
        title="3-panel design"
        description="Post-launch research and a product direction change drove a full redesign. Before designing, I mapped the live experience as a detailed user flow, annotating every friction point. The new 3-column Outlook-style layout gave agents a persistent list on the left, contextual actions in the center, and itinerary preview on the right."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="w-full min-w-0 max-w-[620px] lg:max-w-full">
        <Image
          src="/images/taap/gen2-tray.webp"
          alt="Generation 2 three-panel Trips layout on desktop with the mobile list overlapping"
          width={1194}
          height={2000}
          className="block h-auto w-full"
          sizes="(min-width: 1140px) 980px, calc(100vw - 40px)"
          unoptimized
        />
      </div>
    </section>
  );
}
