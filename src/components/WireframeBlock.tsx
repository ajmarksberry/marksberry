import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

export function WireframeBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-8">
      <SectionHeader
        overline="Discovery"
        title="Wireframes"
        subtitle="Structure before polish"
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="w-full min-w-0 max-w-[620px] lg:max-w-full">
        <Image
          src="/images/reach/wireframes-tray.webp"
          alt="Overlapping dashboard wireframes showing revenue overview and location selector"
          width={2000}
          height={1466}
          className="block h-auto w-full"
          sizes="(min-width: 1140px) 980px, calc(100vw - 40px)"
          unoptimized
        />
      </div>
    </section>
  );
}
