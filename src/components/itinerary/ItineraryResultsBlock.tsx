import { SectionHeader } from "@/components/SectionHeader";
import { TaapCheckItem, TaapClockItem } from "@/components/taap/TaapListItems";

const metrics = [
  {
    value: "6/6",
    label: "Clean and professional",
    description:
      "Every participant rated the new layout clean and professional.",
  },
  {
    value: "6",
    label: "Improvements identified",
    description:
      "Specific opportunities from the sessions, from replacing the map with a link to editable text and pre-filled logos.",
  },
] as const;

const shipped = [
  "Preview and Share with Traveler consistently discovered and used correctly, without assistance",
  "Show/hide section controls rated highly valuable for customization",
  "Research recommendations: simplify layout and content, add imagery and editable text fields, explore pre-populated logos",
  "Fully accessible dev handoff delivered with WCAG annotations",
] as const;

export function ItineraryResultsBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-8 lg:items-start">
      <SectionHeader
        overline="Retrospective"
        title="Results"
        description="The moderated study validated the core interaction model: advisors found and used Share with traveler without help, and every participant rated the layout clean and professional. Adoption metrics will follow post-launch."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-start">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="flex w-full max-w-[620px] flex-col items-start gap-4 border-t border-ink pt-6 lg:max-w-none lg:min-w-0 lg:flex-1"
          >
            <p
              className="font-extrabold text-[48px] leading-[60px] tracking-[-1.2px] text-accent sm:text-[60px] sm:leading-[72px] lg:text-[72px] lg:leading-[90px] lg:tracking-[-1.8px]"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              {m.value}
            </p>
            <p className="font-bold text-base leading-none text-ink">
              {m.label}
            </p>
            <p
              className="w-full text-base leading-6 text-ink"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              {m.description}
            </p>
          </div>
        ))}
      </div>

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
