import { SectionHeader } from "@/components/SectionHeader";
import { TaapCheckItem, TaapClockItem } from "@/components/taap/TaapListItems";

const shipped = [
  "Preview and Share with Traveler consistently discovered and used correctly",
  "Layout rated clean and professional by all 6 participants",
  "Show/hide section controls rated highly valuable for customization",
  "Fully accessible dev handoff delivered with WCAG annotations",
] as const;

export function ItineraryResultsBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-6 lg:items-start">
      <SectionHeader
        overline="Retrospective"
        title="Results"
        description="The moderated research study validated the core interaction model. Advisors consistently discovered and used the primary share flow without assistance. Layout was rated clean and professional. Show/hide controls were highlighted as particularly valuable. Quantitative adoption metrics to follow post-launch."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="flex w-full max-w-[620px] flex-col items-start gap-3 lg:max-w-[564px] lg:mr-auto">
        {shipped.map((item) => (
          <TaapCheckItem key={item}>{item}</TaapCheckItem>
        ))}
        <TaapClockItem>
          Advisor adoption and share-rate metrics — to follow post-launch
        </TaapClockItem>
      </div>
    </section>
  );
}
