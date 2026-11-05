import { SectionHeader } from "@/components/SectionHeader";

const owned = [
  "Led design across all three generations, from 2023 to 2026",
  "Mapped the live experience as a user flow and annotated every friction point",
  "Planned and ran user testing, surveys, and feedback questionnaires with the Research team",
  "Worked with Product, Engineering, and Content through every release",
  "Delivered annotated specs, tokenized styles, and component documentation, with accessibility annotations, at every handoff",
] as const;

export function TaapRoleBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-8 lg:items-start">
      <SectionHeader
        overline="My role"
        title="What I owned"
        description="Lead product designer, working with Product, Engineering, Research, and Content."
        className="w-full max-w-[620px] lg:max-w-full"
      />
      <ul
        className="w-full max-w-[620px] list-disc ps-6 text-base leading-7 text-ink lg:max-w-[640px] lg:self-start"
        style={{ fontFeatureSettings: '"liga" 0' }}
      >
        {owned.map((item) => (
          <li key={item} className="pb-1">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
