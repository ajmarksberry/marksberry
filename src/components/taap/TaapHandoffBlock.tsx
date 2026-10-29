import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

export function TaapHandoffBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-10 lg:items-start">
      <SectionHeader
        overline="Build"
        title="Dev handoff"
        description="A structured dev handoff, with annotated specs, tokenized styles, and component-level documentation, bridged design and engineering so spacing, states, edge cases, and interactions shipped exactly as intended."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="w-full min-w-0 max-w-[620px] overflow-clip rounded-lg lg:max-w-full">
        <Image
          src="/images/taap/handoff-tray.webp"
          alt="Annotated Figma handoff of the three-panel Trips desktop and mobile screens"
          width={2000}
          height={1241}
          className="block h-auto w-full rounded-lg"
          sizes="(min-width: 1140px) 980px, calc(100vw - 40px)"
          unoptimized
        />
      </div>
    </section>
  );
}
