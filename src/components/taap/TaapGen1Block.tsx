import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

export function TaapGen1Block() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-8 lg:items-start">
      <SectionHeader
        overline="Generation 1"
        title="Table format redesign"
        description={`Replaced the consumer pattern with a professional data table. Renamed "My Trips" to "Trips," reframing the page as an advisor workspace. Designed 4 status tabs, sortable columns, LOB icons, paginated results, and universal search with typeahead and full search states.`}
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="w-full min-w-0 max-w-[620px] lg:max-w-full">
        <Image
          src="/images/taap/gen1-table.webp"
          alt="Generation 1 Trips page redesigned as a sortable data table"
          width={1280}
          height={1134}
          className="block h-auto w-full"
          sizes="(min-width: 1140px) 980px, calc(100vw - 40px)"
          unoptimized
        />
      </div>
    </section>
  );
}
