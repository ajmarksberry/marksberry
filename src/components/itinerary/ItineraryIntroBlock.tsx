import Image from "next/image";

export function ItineraryIntroBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-10 pt-16 lg:flex-row lg:items-start lg:justify-center lg:gap-12">
      <div className="w-full max-w-[468px] shrink-0 overflow-clip rounded-full lg:size-[468px] lg:max-w-none">
        <Image
          src="/images/itinerary/intro-photo.webp"
          alt="Traveler photographing terraced hills"
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
              Itinerary builder
            </h3>
            <p
              className="w-full text-base leading-7"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              TAAP agents had powerful booking tools but no way to curate or
              share what they’d booked with their travelers. I led end-to-end
              design of a new itinerary builder, from discovery through a 2-day
              design sprint, AI-assisted prototyping with Figma Make, and
              moderated research with 6 travel agents, to a fully accessible
              dev handoff across both desktop and mobile platforms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
