import { SectionHeader } from "@/components/SectionHeader";

const points = [
  {
    label: "The problem",
    body: "Advisors managing hundreds of client bookings were stuck with a consumer-grade “My Trips” list: no traveler names, no search, and no filters.",
  },
  {
    label: "What I did",
    body: "I led design across three generations of the Trips workspace: a professional data table, a 3-panel layout, and post-launch refinements.",
  },
  {
    label: "The outcome",
    body: "Gen 1 and Gen 2 shipped to production, reducing support tickets and calls to the call center. Removing the map was validated across two research studies and informed a platform-wide content decision. Gen 3 is in progress.",
  },
] as const;

const stats = [
  { value: "110,000+", label: "travel advisors on TAAP" },
  { value: "3", label: "design generations, 2023-2026" },
  { value: "20+", label: "post-launch changes prioritized" },
] as const;

/** The case study in thirty seconds, right under the hero. */
export function TaapSummaryBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-10 pt-16 lg:items-start">
      <SectionHeader
        overline="Summary"
        title="At a glance"
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="grid w-full max-w-[620px] gap-8 lg:max-w-full lg:grid-cols-3 lg:gap-10">
        {points.map((p) => (
          <div key={p.label} className="flex flex-col items-start gap-3">
            <h3 className="font-extrabold text-xs uppercase leading-none tracking-[0.48px] text-accent">
              {p.label}
            </h3>
            <p
              className="text-base leading-7 text-ink"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              {p.body}
            </p>
          </div>
        ))}
      </div>

      <dl className="grid w-full max-w-[620px] gap-6 border-t border-rule pt-8 sm:grid-cols-3 lg:max-w-full lg:gap-10">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-2">
            <dt
              className="order-2 text-base leading-7 text-ink"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              {s.label}
            </dt>
            <dd
              className="order-1 font-extrabold text-[36px] leading-[44px] tracking-[-0.9px] text-heading sm:text-[48px] sm:leading-[58px] sm:tracking-[-1.2px]"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
