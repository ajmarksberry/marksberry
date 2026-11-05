import { SectionHeader } from "@/components/SectionHeader";

const steps = [
  {
    href: "#gen-1",
    label: "Generation 1",
    title: "Data table",
    body: "A professional table with tabs, sorting, and universal search.",
    status: "Shipped",
  },
  {
    href: "#gen-2",
    label: "Generation 2",
    title: "3-panel workspace",
    body: "An Outlook-style layout: list, actions, and itinerary preview.",
    status: "Shipped",
  },
  {
    href: "#gen-3",
    label: "Generation 3",
    title: "Post-launch refinements",
    body: "20+ changes from research, prioritized with Engineering.",
    status: "In progress",
  },
] as const;

/** A map of the three generations, each linking to its section below. */
export function TaapJourneyBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-10 lg:items-start">
      <SectionHeader
        overline="The approach"
        title="Three generations"
        description="Each generation was shaped by research on the one before it."
        className="w-full max-w-[620px] lg:max-w-full"
      />
      <ol className="grid w-full max-w-[620px] gap-4 lg:max-w-full lg:grid-cols-3 lg:gap-6">
        {steps.map((s) => (
          <li key={s.href}>
            <a
              href={s.href}
              className="flex h-full flex-col items-start gap-3 rounded-lg border border-rule p-6 transition-colors hover:border-accent"
            >
              <span className="font-extrabold text-xs uppercase leading-none tracking-[0.48px] text-accent">
                {s.label}
              </span>
              <span
                className="font-extrabold text-2xl leading-8 text-heading"
                style={{ fontFeatureSettings: '"liga" 0' }}
              >
                {s.title}
              </span>
              <span className="text-base leading-7 text-ink">{s.body}</span>
              <span className="mt-auto pt-2 text-sm font-semibold leading-6 text-muted">
                {s.status}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
