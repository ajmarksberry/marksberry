import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MarketingPage } from "@/components/MarketingPage";
import { OpenToWorkCard } from "@/components/OpenToWorkCard";
import { SHOW_ABOUT } from "@/lib/site";

export const metadata: Metadata = {
  title: "About | AJ Marksberry",
  description:
    "Senior Product Designer with 27+ years turning complex business challenges into intuitive, human-centered digital products.",
};

const expertise = [
  "Product Design",
  "AI-Assisted Design Exploration",
  "UX Design & Strategy",
  "UI & Visual Design",
  "Interaction Design",
  "User Research & Validation",
  "AI-Ready Design Systems",
  "Wireframing & Prototyping",
  "Information Architecture",
  "Accessibility (WCAG)",
  "Enterprise SaaS Platforms",
  "Cross-Functional Collaboration",
  "Figma",
  "Claude",
  "Cursor",
] as const;

export default function AboutPage() {
  if (!SHOW_ABOUT) notFound();

  return (
    <MarketingPage
      overline="About"
      title="AJ Marksberry"
      description="I'm a Senior Product Designer with deep experience in enterprise product design, consumer-facing applications, and end-to-end platform design. I've led design across B2B and B2C products, from discovery and research through design sprints, wireframing, visual design, accessibility, and dev handoff."
      showFooter={false}
      afterTitle={
        <Image
          src="/images/about/walleye.jpg"
          alt="Holding up a walleye with its mouth wide open, out on a cloudy lake"
          width={1024}
          height={768}
          className="block aspect-[4/3] w-full max-w-[480px] rounded-lg object-cover"
          sizes="(min-width: 640px) 480px, calc(100vw - 40px)"
          priority
          unoptimized
        />
      }
    >
      <div className="flex w-full max-w-[640px] flex-col gap-10 lg:max-w-full">
        <div className="flex w-full max-w-[640px] flex-col gap-6 text-base leading-7 text-ink">
          <p>
            Most recently, I was a contract product designer at Expedia, working
            on the Travel Agent Affiliate Program (TAAP), which serves 200,000+
            travel advisors at 38,000+ agencies across 85+ markets. It was
            exciting to be part of Expedia&rsquo;s fast-growing B2B business,
            where revenue grew 23% year over year in Q3 2026 and travel agency
            bookings passed $3 billion in 2025. My work focused on improving
            itinerary management, booking workflows, and post-booking
            experiences, working closely with Product, Engineering, Research,
            and Content teams along the way.
          </p>
        </div>

        <section
          aria-labelledby="expertise-heading"
          className="flex w-full flex-col gap-6 border-t border-rule pt-8"
        >
          <h2
            id="expertise-heading"
            className="font-extrabold text-2xl leading-8 tracking-[-0.24px] text-heading sm:text-[30px] sm:leading-10"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            Expertise
          </h2>
          <ul className="grid w-full grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-[10px] size-1.5 shrink-0 rounded-full bg-accent"
                />
                <span className="text-base leading-7 text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <OpenToWorkCard />
      </div>
    </MarketingPage>
  );
}
