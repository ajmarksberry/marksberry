import Image from "next/image";

export function TaapIntroBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-10 pt-16 lg:flex-row lg:items-start lg:justify-center lg:gap-12">
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
        <div className="flex w-full flex-col items-start gap-8 text-neutral-900">
          <div className="flex w-full flex-col items-start gap-4">
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
              Expedia TAAP is a free platform by Expedia Group where travel
              advisors book properties, flights, activities, and car rentals
              for their clients and earn commissions on each booking, with
              real-time availability. It supports over 200,000 travel advisors
              across 35 countries and is part of Expedia&rsquo;s fast-growing
              B2B business, where revenue was growing around 25% year over
              year.
            </p>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <h3
              className="w-full font-extrabold text-2xl leading-8 sm:text-[30px] sm:leading-10"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              Trips on TAAP
            </h3>
            <p
              className="w-full text-base leading-7"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              The TAAP Trips page started as a consumer-borrowed flat list, with
              no search, no agent-specific data, and no professional tooling.
              Over three
              years, I led three successive design generations that transformed
              it into a research-informed professional workspace. Each version
              shipped to production and informed the next through user testing,
              and direct collaboration with the Development team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
