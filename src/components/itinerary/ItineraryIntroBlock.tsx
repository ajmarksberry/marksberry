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
              Expedia TAAP is Expedia Group&rsquo;s end-to-end booking
              platform built for travel advisors. Advisors book
              accommodations, flights, activities, ground transportation, and
              car rentals for their clients and earn commissions on every
              booking. It serves 200,000+ advisors at 38,000+ agencies across
              85+ markets, with 10M+ searches a month across 3M+
              accommodations. It is part of Expedia&rsquo;s fast-growing B2B
              business, where revenue grew 23% year over year in Q3 2026 and travel agency bookings passed $3 billion in 2025.
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
              TAAP advisors had powerful booking tools but no way to curate or
              share what they’d booked with their travelers. I led end-to-end
              design of a new itinerary builder to close that gap.
            </p>
            <ul
              className="w-full list-disc ps-6 text-base leading-7"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              <li>Discovery and a 2-day design sprint</li>
              <li>AI-assisted prototyping with Figma Make</li>
              <li>Moderated research with 6 travel advisors</li>
              <li>Fully accessible dev handoff</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
