import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExpediaWorkSection } from "@/components/ExpediaWorkSection";
import { MarketingPage } from "@/components/MarketingPage";
import { expediaWork } from "@/lib/expedia-work";
import {
  SHOW_EXPEDIA_WORK,
  SHOW_PROJECTS,
  SHOW_VISUAL_DESIGN,
} from "@/lib/site";
import { visualDesign } from "@/lib/visual-design";

export const metadata: Metadata = {
  title: "Projects | AJ Marksberry",
  description:
    "More of my work beyond the case studies: projects at Expedia Group, and websites and interfaces I've designed.",
};

/** A group on the page: an overline, a heading and a line about it. */
function GroupHeader({
  id,
  overline,
  title,
  description,
}: {
  id: string;
  overline: string;
  title: string;
  description: string;
}) {
  return (
    <header className="flex w-full max-w-[640px] flex-col items-start gap-4">
      <p className="font-extrabold text-xs uppercase leading-none text-accent">
        {overline}
      </p>
      <h2
        id={id}
        className="font-extrabold text-[32px] leading-10 tracking-[-0.8px] text-heading sm:text-[40px] sm:leading-[50px] sm:tracking-[-1px]"
        style={{ fontFeatureSettings: '"liga" 0' }}
      >
        {title}
      </h2>
      <p
        className="text-base leading-7 text-ink"
        style={{ fontFeatureSettings: '"liga" 0' }}
      >
        {description}
      </p>
    </header>
  );
}

/**
 * Everything that is not a case study, on one page: the other work from
 * Expedia, then the visual design projects. It replaces the two pages these
 * used to be (/expedia-work and /visual-design, which now redirect here). The
 * route is /work because /projects is the case studies' own path.
 */
export default function ProjectsPage() {
  if (!SHOW_PROJECTS) notFound();

  return (
    <MarketingPage
      overline="Selected work"
      title="Projects"
      description="More of what I've designed beyond the case studies: projects at Expedia Group, and websites and interfaces."
      showFooter={false}
    >
      <div className="flex w-full flex-col gap-24 pt-8">
        {SHOW_EXPEDIA_WORK ? (
          <section
            aria-labelledby="expedia-work-heading"
            className="flex w-full flex-col gap-10"
          >
            <GroupHeader
              id="expedia-work-heading"
              overline="Expedia"
              title="Other Expedia work"
              description="More of the work I've done at Expedia Group, beyond the case studies."
            />
            <div className="flex w-full flex-col gap-14">
              {expediaWork.map((item) => (
                <ExpediaWorkSection key={item.id} item={item} />
              ))}
            </div>
          </section>
        ) : null}

        {SHOW_VISUAL_DESIGN ? (
          <section
            aria-labelledby="visual-design-heading"
            className="flex w-full flex-col gap-10"
          >
            <GroupHeader
              id="visual-design-heading"
              overline="Visual design"
              title="Websites and interfaces"
              description="A selection of websites and interfaces I've designed."
            />
            <div className="flex w-full flex-col gap-14">
              {visualDesign.map((item) => (
                <ExpediaWorkSection key={item.id} item={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </MarketingPage>
  );
}
