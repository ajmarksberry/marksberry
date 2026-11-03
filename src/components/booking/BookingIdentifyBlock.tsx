import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

const frustrations = [
  "Booking appointments far into the future",
  "I don’t want to think about booking",
  "Being placed with a different provider (no rapport)",
] as const;

const goals = ["Easy booking", "Book on a cadence", "No hassle"] as const;

export function BookingIdentifyBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-6 lg:items-start">
      <SectionHeader
        overline="Identify"
        title="Our audience"
        description="These customers want booking to be easy, on a regular cadence, and with the provider they already know. Their frustrations shaped the booking experience."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-8">
        <div className="w-full max-w-[275px] shrink-0 overflow-clip rounded-full lg:size-[275px] lg:max-w-none">
          <Image
            src="/images/booking/persona.webp"
            alt="Customer persona for the REACH.ai booking experience"
            width={550}
            height={550}
            className="h-auto w-full rounded-full"
            sizes="275px"
            unoptimized
          />
        </div>

        <div className="flex w-full max-w-[620px] flex-col items-start gap-6 lg:max-w-none lg:min-w-0 lg:flex-1">
          <div className="flex w-full flex-col items-start gap-2">
            <h3
              className="w-full font-bold text-2xl leading-8 tracking-[-0.24px] text-heading sm:text-[30px] sm:leading-10 lg:text-[36px] lg:leading-[48px] lg:tracking-[-0.9px]"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              Frustrations
            </h3>
            <ul className="w-full list-disc text-base text-neutral-900">
              {frustrations.map((item) => (
                <li key={item} className="ms-6 leading-7">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-full flex-col items-start gap-2">
            <h3
              className="w-full font-bold text-2xl leading-8 tracking-[-0.24px] text-heading sm:text-[30px] sm:leading-10 lg:text-[36px] lg:leading-[48px] lg:tracking-[-0.9px]"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              Goals
            </h3>
            <ul className="w-full list-disc text-base text-neutral-900">
              {goals.map((item) => (
                <li key={item} className="ms-6 leading-7">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
