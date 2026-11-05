import { SectionHeader } from "@/components/SectionHeader";

const metrics = [
  {
    value: "2x",
    label: "Engagement Surge",
    description:
      "In comparison to the previous iteration, customers spent twice as much time interacting with the dashboard over the course of a week.",
  },
  {
    value: "-40%",
    label: "Support Decline",
    description:
      "Fewer “where do I…?” tickets as hierarchy, labels, and empty states did the teaching.",
  },
] as const;

const insights = [
  "Positive feedback from current customer base as well as potential customers during sales demos.",
  "The majority of clients who were using the previous UI decided to upgrade to the new dashboard design.",
] as const;

export function ResultsBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-8">
      <SectionHeader
        overline="Design"
        title="Results"
        subtitle="Project success metrics."
        description="The redesigned dashboard doubled weekly engagement and cut support requests by 40%, and most clients on the previous UI chose to upgrade."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-start">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex w-full max-w-[620px] flex-col items-start gap-4 border-t border-ink pt-6 lg:max-w-none lg:min-w-0 lg:flex-1"
          >
            <p
              className="font-extrabold text-[48px] leading-[60px] tracking-[-1.2px] text-accent sm:text-[60px] sm:leading-[72px] lg:text-[72px] lg:leading-[90px] lg:tracking-[-1.8px]"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              {metric.value}
            </p>
            <p className="font-bold text-base leading-none text-ink">
              {metric.label}
            </p>
            <p
              className="w-full text-base leading-6 text-ink"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              {metric.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-[620px] flex-col items-start gap-4 text-ink lg:mr-auto lg:max-w-[632px]">
        <h3
          className="w-full max-w-[632px] font-extrabold text-2xl leading-8 sm:text-[30px] sm:leading-10"
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          Other insights
        </h3>
        <ul className="flex w-full list-disc flex-col gap-2 text-base">
          {insights.map((insight) => (
            <li key={insight} className="ms-6 leading-6">
              {insight}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
