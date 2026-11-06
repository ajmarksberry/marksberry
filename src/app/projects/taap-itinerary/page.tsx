import type { Metadata } from "next";
import { CaseStudyExplorer } from "@/components/CaseStudyExplorer";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { ItineraryChallengeBlock } from "@/components/itinerary/ItineraryChallengeBlock";
import { ItineraryDesignBlock } from "@/components/itinerary/ItineraryDesignBlock";
import { ItineraryFoundationsBlock } from "@/components/itinerary/ItineraryFoundationsBlock";
import { ItineraryHeroBlock } from "@/components/itinerary/ItineraryHeroBlock";
import { ItineraryInterviewsBlock } from "@/components/itinerary/ItineraryInterviewsBlock";
import { ItineraryIntroBlock } from "@/components/itinerary/ItineraryIntroBlock";
import { ItineraryPrototypeBlock } from "@/components/itinerary/ItineraryPrototypeBlock";
import { ItineraryResultsBlock } from "@/components/itinerary/ItineraryResultsBlock";
import { ItinerarySprintBlock } from "@/components/itinerary/ItinerarySprintBlock";
import { ItineraryWireframesBlock } from "@/components/itinerary/ItineraryWireframesBlock";
import copy from "@/components/story/itinerary.json";
import { CaseStudyVersionSwitch } from "@/components/CaseStudyVersionSwitch";
import {
  StorySections,
  type StorySectionData,
} from "@/components/story/StorySection";
import { CASE_STUDY_LIVE_VERSION, SHOW_VERSION_TOGGLE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Expedia TAAP Itinerary Builder | AJ Marksberry",
  description:
    "Designed and validated a new itinerary creation workflow that gives travel advisors a simpler, more flexible way to create client-ready itineraries.",
};

/** The page as it was before the six-section rewrite. Reachable from the
 * Original switch in `next dev`. */
function OriginalVersion() {
  return (
    <>
      <ItineraryHeroBlock />
      <ItineraryIntroBlock />
      <Divider padded />
      <ItineraryChallengeBlock />
      <Divider padded />
      <ItineraryFoundationsBlock />
      <Divider padded />
      <ItinerarySprintBlock />
      <Divider padded />
      <ItineraryWireframesBlock />
      <Divider padded />
      <ItineraryPrototypeBlock />
      <Divider padded />
      <ItineraryInterviewsBlock />
      <Divider padded />
      <ItineraryDesignBlock />
      <Divider padded />
      <ItineraryResultsBlock />
    </>
  );
}

const sections = [
  copy.summary,
  copy.problem,
  copy.discovery,
  copy.research,
  copy.design,
  copy.results,
] as StorySectionData[];

/** The short form: a hero, then six scannable sections. */
function OptimizedVersion() {
  return (
    <>
      <ItineraryHeroBlock />
      <StorySections sections={sections} lead="h-16" />
    </>
  );
}

export default function TaapItineraryCaseStudyPage() {
  return (
    <main id="top">
      <div className="mx-auto w-full max-w-[1140px] px-5 sm:px-10 lg:px-20">
        <CaseStudyVersionSwitch
          original={<OriginalVersion />}
          optimized={<OptimizedVersion />}
          defaultVersion={
            SHOW_VERSION_TOGGLE ? "optimized" : CASE_STUDY_LIVE_VERSION
          }
          showToggle={SHOW_VERSION_TOGGLE}
        />
        <Divider padded />
        <CaseStudyExplorer />
      </div>
      <Footer />
    </main>
  );
}
