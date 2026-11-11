import type { Metadata } from "next";
import { CaseStudyExplorer } from "@/components/CaseStudyExplorer";
import { DesignBlock } from "@/components/DesignBlock";
import { Divider } from "@/components/Divider";
import { EvaluateBlock } from "@/components/EvaluateBlock";
import { Footer } from "@/components/Footer";
import { HeroBlock } from "@/components/HeroBlock";
import { IdentifyBlock } from "@/components/IdentifyBlock";
import { InterviewBlock } from "@/components/InterviewBlock";
import { IntroBlock } from "@/components/IntroBlock";
import { PlanBlock } from "@/components/PlanBlock";
import { ResultsBlock } from "@/components/ResultsBlock";
import { SprintBlock } from "@/components/SprintBlock";
import { WireframeBlock } from "@/components/WireframeBlock";
import copy from "@/components/story/reach-ai.json";
import { ReachCombinedVersion } from "@/components/ReachCombinedVersion";
import { CaseStudyVersionSwitch } from "@/components/CaseStudyVersionSwitch";
import {
  StorySections,
  type StorySectionData,
} from "@/components/story/StorySection";
import {
  SHOW_VERSION_TOGGLE,
  INCLUDE_ORIGINAL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "REACH.ai AI Booking Platform | AJ Marksberry",
  description: "Designing both sides of a platform for beauty and wellness studios",
};

/** The page as it was before the six-section rewrite. Reachable from the
 * Original switch in `next dev`. */
function OriginalVersion() {
  return (
    <>
      <HeroBlock />
      <IntroBlock />
      <Divider padded />
      <PlanBlock />
      <Divider padded />
      <IdentifyBlock />
      <Divider padded />
      <InterviewBlock />
      <EvaluateBlock />
      <Divider padded />
      <SprintBlock />
      <Divider padded />
      <WireframeBlock />
      <Divider padded />
      <DesignBlock />
      <Divider padded />
      <ResultsBlock />
    </>
  );
}

const sections = [
  copy.summary,
  copy.problem,
  copy.discovery,
  copy.workshop,
  copy.design,
  copy.results,
] as StorySectionData[];

/** The short form: a hero, then six scannable sections. */
function OptimizedVersion() {
  return (
    <>
      <HeroBlock />
      <StorySections sections={sections} lead="h-6" />
    </>
  );
}

export default function ReachAiCaseStudyPage() {
  return (
    <main id="top">
      <div className="mx-auto w-full max-w-[1140px] px-5 sm:px-10 lg:px-20">
        <CaseStudyVersionSwitch
          original={INCLUDE_ORIGINAL ? <OriginalVersion /> : null}
          optimized={SHOW_VERSION_TOGGLE ? <OptimizedVersion /> : null}
          combined={<ReachCombinedVersion />}
          defaultVersion="combined"
          showToggle={SHOW_VERSION_TOGGLE}
        />
        <Divider padded />
        <CaseStudyExplorer />
      </div>
      <Footer />
    </main>
  );
}
