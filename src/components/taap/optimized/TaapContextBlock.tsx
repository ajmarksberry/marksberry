import Image from "next/image";

/** The original intro without its second paragraph, which the summary now covers. */
export function TaapContextBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-12">
      <div className="w-full max-w-[468px] shrink-0 overflow-clip rounded-full lg:size-[468px] lg:max-w-none">
        <Image
          src="/images/taap/intro-plane.webp"
          alt="Commercial jet flying above the clouds"
          width={936}
          height={936}
          className="h-auto w-full rounded-full"
          sizes="(min-width: 1024px) 468px, min(468px, 100vw)"
          unoptimized
        />
      </div>

      <div className="flex w-full max-w-[620px] flex-col items-start gap-6 lg:max-w-[640px] lg:min-w-0">
        <p className="font-extrabold text-xs uppercase leading-none text-accent">
          Context
        </p>
        <div className="flex w-full flex-col items-start gap-4 text-neutral-900">
          <h3
            className="w-full font-extrabold text-[28px] leading-9 tracking-[-0.7px] sm:text-[36px] sm:leading-[48px] sm:tracking-[-0.9px]"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            What is Expedia TAAP?
          </h3>
          <p
            className="w-full text-base leading-7"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            Expedia TAAP is Expedia Group&rsquo;s end-to-end booking platform
            built for travel advisors. Advisors book accommodations, flights,
            activities, ground transportation, and car rentals for their clients
            and earn commissions on every booking. It serves 200,000+ advisors
            at 38,000+ agencies across 85+ markets, with 10M+ searches a month
            across 3M+ accommodations. It is part of Expedia&rsquo;s
            fast-growing B2B business, where revenue grew 25% year over year in Q1 2026 and travel agency bookings passed $3 billion in 2025.
          </p>
        </div>
      </div>
    </section>
  );
}
