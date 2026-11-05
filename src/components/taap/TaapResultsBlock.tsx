import { SectionHeader } from "@/components/SectionHeader";
import { TaapCheckItem, TaapClockItem } from "@/components/taap/TaapListItems";

const shipped = [
  "Gen 1 shipped, establishing a B2B data table foundation with search, filtering, and LOB icons",
  "Gen 2 shipped: a 3-column panel view replaced Gen 1 based on research and product direction",
  "Map removal was validated independently across two separate research studies, informing a platform-wide content decision",
  "Accessibility annotations delivered at every dev handoff across all three generations",
] as const;

export function TaapResultsBlock({
  leadItems = [],
}: {
  /** Extra shipped outcomes, listed ahead of the standard ones. */
  leadItems?: readonly string[];
}) {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-8 lg:items-start">
      <SectionHeader
        overline="Retrospective"
        title="Results"
        description="Three design generations spanning three years, each grounded in research and each replacing the last. The original consumer UI became a professional, accessible, research-informed advisor workspace."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="flex w-full max-w-[620px] flex-col items-start gap-3 lg:max-w-[564px] lg:mr-auto">
        {[...leadItems, ...shipped].map((item) => (
          <TaapCheckItem key={item}>{item}</TaapCheckItem>
        ))}
        <TaapClockItem>
          Gen 3 enhancements in progress, with post-launch metrics to follow
        </TaapClockItem>
      </div>
    </section>
  );
}
