import { CaseStudyShowcase } from "@/components/CaseStudyShowcase";
import { CaseStudyExplorer } from "@/components/CaseStudyExplorer";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import type { ReactNode } from "react";

export function MarketingPage({
  overline,
  title,
  description,
  afterTitle,
  children,
  showFooter = true,
  showCaseStudies,
  caseStudyLayout = "list",
  caseStudiesFirst = false,
  hideSection = false,
}: {
  overline?: string;
  title: string;
  description?: string;
  /** Shown between the title and the description. */
  afterTitle?: ReactNode;
  children?: ReactNode;
  showFooter?: boolean;
  showCaseStudies?: boolean;
  caseStudyLayout?: "list" | "stack";
  /** Put the case studies above the page's own section instead of below it. */
  caseStudiesFirst?: boolean;
  /** Leave out the page's own section (header and children), keeping the rest. */
  hideSection?: boolean;
}) {
  const explorer = showCaseStudies ?? showFooter;
  const caseStudies = explorer ? (
    caseStudyLayout === "stack" ? (
      <CaseStudyShowcase />
    ) : (
      <CaseStudyExplorer />
    )
  ) : null;

  return (
    <main id="top">
      <div className="px-5 sm:px-10 lg:px-20">
        {caseStudiesFirst ? caseStudies : null}
        {hideSection ? null : (
          <section
            className={`flex w-full max-w-[640px] flex-col items-start gap-10 lg:max-w-full ${
              caseStudiesFirst
                ? "pb-16 pt-12 sm:pb-20 lg:pb-24 lg:pt-16"
                : "py-16 sm:py-20 lg:py-24"
            }`}
          >
            <SectionHeader
              overline={overline}
              title={title}
              description={description}
              afterTitle={afterTitle}
              className="w-full max-w-[640px]"
              reveal
            />
            {children ? (
              <div
                className="hero-reveal w-full"
                style={{ animationDelay: "340ms" }}
              >
                {children}
              </div>
            ) : null}
          </section>
        )}
        {caseStudiesFirst ? null : caseStudies}
      </div>
      {showFooter ? <Footer /> : null}
    </main>
  );
}
