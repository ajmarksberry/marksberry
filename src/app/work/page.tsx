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

/** One list, in the order shown: the security dashboard first, then the TAAP
 * checkout, then the rest of the Expedia work, then the other visual design. */
const [dashboard, ...otherDesign] = SHOW_VISUAL_DESIGN ? visualDesign : [];
const [checkout, ...otherExpedia] = SHOW_EXPEDIA_WORK ? expediaWork : [];
const projects = [dashboard, checkout, ...otherExpedia, ...otherDesign].filter(
  (item) => item !== undefined,
);

export const metadata: Metadata = {
  title: "Projects | AJ Marksberry",
  description:
    "More of my work beyond the case studies: projects at Expedia Group, and websites and interfaces I've designed.",
};

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
      <div className="flex w-full flex-col gap-14 pt-8">
        {projects.map((item) => (
          <ExpediaWorkSection key={item.id} item={item} />
        ))}
      </div>
    </MarketingPage>
  );
}
