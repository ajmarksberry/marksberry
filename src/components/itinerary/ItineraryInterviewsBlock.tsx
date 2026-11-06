import type { ReactNode } from "react";
import { SectionHeader } from "@/components/SectionHeader";

const stats = [
  { value: "6", label: "Participants" },
  { value: "8", label: "Tasks" },
  { value: "8+", label: "Hours" },
] as const;

type Finding = { heading: string; items: readonly ReactNode[] };

const findings: readonly Finding[] = [
  {
    heading: "What worked",
    items: [
      <>
        <strong>Preview</strong> and <strong>Share with traveler</strong> were
        consistently discovered and used correctly, without assistance
      </>,
      <>
        All 6 participants rated the layout{" "}
        <strong>clean and professional</strong>
      </>,
      <>
        <strong>Show/hide sections</strong> were seen as highly valuable for
        customizing what travelers see
      </>,
      <>
        A working Figma Make prototype felt realistic, which led to richer
        feedback than a click-through
      </>,
    ],
  },
  {
    heading: "What to improve",
    items: [
      <>
        <strong>Map was not valuable:</strong> replace it with a clickable link
      </>,
      <>
        <strong>Agency contact info</strong> and{" "}
        <strong>itinerary number</strong> were not seen as useful
      </>,
      <>
        Desire for <strong>more imagery</strong> (rooms, destinations)
      </>,
      <>
        Ability to <strong>edit Additional Info</strong> text directly
      </>,
      <>
        <strong>Simplify the pre-filled email</strong> and make it less formal
      </>,
      <>
        <strong>Pre-populate logos</strong>, but allow customization
      </>,
    ],
  },
  {
    heading: "Broader insights",
    items: [
      <>
        Advisors value the <strong>visual flexibility</strong> of the tools they
        use today
      </>,
      <>
        Strong interest in a <strong>centralized library</strong> for logos and
        agency information
      </>,
    ],
  },
  {
    heading: "Recommendations",
    items: [
      <>
        <strong>Simplify layout and content</strong> based on feedback
      </>,
      <>
        Add <strong>more imagery and editable text fields</strong>
      </>,
      <>
        Explore <strong>pre-populated logo</strong> functionality
      </>,
      <>
        Assess <strong>feasibility</strong> with Tech for richer imagery and
        logo management
      </>,
    ],
  },
];

export function ItineraryInterviewsBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center">
      <SectionHeader
        overline="Discovery"
        title="Interviews"
        description="8-task sessions over Zoom using a think-aloud protocol while participants navigated the Figma Make prototype. The findings shaped the final design iterations before handoff."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="flex w-full flex-col items-center gap-10 pb-11 pt-8 lg:flex-row lg:items-start">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex w-full max-w-[620px] flex-col items-start border-t border-rule-strong pt-6 lg:max-w-none lg:min-w-0 lg:flex-1"
          >
            <p
              className="w-full font-extrabold text-[48px] leading-[60px] tracking-[-1.2px] text-accent sm:text-[60px] sm:leading-[72px] lg:text-[72px] lg:leading-[90px] lg:tracking-[-1.8px]"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              {stat.value}
            </p>
            <p
              className="w-full font-bold text-2xl leading-8 tracking-[-0.24px] text-heading sm:text-[30px] sm:leading-10 lg:text-[36px] lg:leading-[48px] lg:tracking-[-0.9px]"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-[620px] flex-col items-start gap-4 border-t border-rule-strong pt-6 lg:max-w-full">
        <h3
          className="w-full max-w-[632px] font-extrabold text-[32px] leading-10 tracking-[-0.8px] text-heading sm:text-[40px] sm:leading-[50px] lg:text-[48px] lg:leading-[60px] lg:tracking-[-1.2px]"
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          Findings
        </h3>
        <div className="grid w-full gap-x-10 gap-y-8 pt-2 lg:grid-cols-2">
          {findings.map((group) => (
            <div key={group.heading} className="flex flex-col gap-3">
              <h4
                className="font-extrabold text-2xl leading-8 tracking-[-0.24px] text-heading"
                style={{ fontFeatureSettings: '"liga" 0' }}
              >
                {group.heading}
              </h4>
              <ul className="w-full list-disc ps-6 text-base leading-6 text-heading">
                {group.items.map((item, i) => (
                  <li key={i} className="pb-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
