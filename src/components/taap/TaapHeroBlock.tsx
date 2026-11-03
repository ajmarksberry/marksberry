import Image from "next/image";
import { Divider } from "@/components/Divider";
import { TaapLogo } from "@/components/TaapLogo";

const meta = [
  { label: "Client", value: "Expedia" },
  { label: "Role", value: "Lead product designer" },
  { label: "Duration", value: "2023-2026" },
  { label: "Tools", value: "Figma · Miro · Zoom" },
] as const;

export function TaapHeroBlock() {
  return (
    <section className="flex w-full flex-col items-start pt-10">
      <div className="flex w-full max-w-[620px] flex-col items-start gap-6 pb-6">
        <div
          className="hero-reveal flex w-full flex-col items-start gap-5"
          style={{ animationDelay: "40ms" }}
        >
          <p className="font-extrabold text-xs uppercase leading-none text-accent">
            Case Study
          </p>
          <TaapLogo />
        </div>
        <h1
          className="hero-reveal w-full font-extrabold text-[36px] leading-[44px] tracking-[-0.9px] text-heading sm:text-[48px] sm:leading-[58px] sm:tracking-[-1.2px] lg:text-[60px] lg:leading-[72px] lg:tracking-[-1.5px]"
          style={{ fontFeatureSettings: '"liga" 0', animationDelay: "140ms" }}
        >
          Expedia TAAP Trips
        </h1>
        <p
          className="hero-reveal w-full text-lg leading-7 text-ink sm:text-xl"
          style={{ fontFeatureSettings: '"liga" 0', animationDelay: "240ms" }}
        >
          From chaos to clarity: three generations that turned a consumer list
          into a professional agent workspace
        </p>
      </div>

      <div className="hero-devices w-full">
        <Image
          src="/images/taap/hero-tray.webp"
          alt="TAAP Trips dashboard on desktop, tablet, and mobile"
          width={2000}
          height={1308}
          className="block h-auto w-full"
          priority
          unoptimized
          sizes="(min-width: 1140px) 980px, calc(100vw - 40px)"
        />
      </div>

      <div
        className="hero-reveal flex w-full flex-col items-center gap-6"
        style={{ animationDelay: "360ms" }}
      >
        <Divider />
        <dl className="flex w-full flex-col gap-6 lg:flex-row lg:flex-wrap lg:items-start lg:justify-center lg:gap-x-[60px] lg:gap-y-6">
          {meta.map((item) => (
            <div key={item.label} className="flex flex-col items-start gap-2">
              <dt className="font-extrabold text-xs uppercase tracking-[0.48px] leading-none text-accent">
                {item.label}
              </dt>
              <dd
                className="text-base font-semibold leading-7 text-ink lg:whitespace-nowrap"
                style={{ fontFeatureSettings: '"liga" 0' }}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
        <Divider />
      </div>
    </section>
  );
}
