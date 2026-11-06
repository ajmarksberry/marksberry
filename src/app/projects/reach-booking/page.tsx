import type { Metadata } from "next";
import { BookingCompetitiveBlock } from "@/components/booking/BookingCompetitiveBlock";
import { BookingDesignBlock } from "@/components/booking/BookingDesignBlock";
import { BookingHeroBlock } from "@/components/booking/BookingHeroBlock";
import { BookingIdentifyBlock } from "@/components/booking/BookingIdentifyBlock";
import { BookingIntroBlock } from "@/components/booking/BookingIntroBlock";
import { BookingPlanBlock } from "@/components/booking/BookingPlanBlock";
import { BookingResultsBlock } from "@/components/booking/BookingResultsBlock";
import { BookingWireframeBlock } from "@/components/booking/BookingWireframeBlock";
import { CaseStudyExplorer } from "@/components/CaseStudyExplorer";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import copy from "@/components/story/reach-booking.json";
import { CaseStudyVersionSwitch } from "@/components/CaseStudyVersionSwitch";
import {
  StorySections,
  type StorySectionData,
} from "@/components/story/StorySection";
import {
  CASE_STUDY_LIVE_VERSION,
  SHOW_VERSION_TOGGLE,
  INCLUDE_ORIGINAL,
  INCLUDE_OPTIMIZED,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "REACH.ai booking experience | AJ Marksberry",
  description:
    "Filling last-minute appointments to capture lost revenue for service providers, built from the ground up",
};

/** The page as it was before the six-section rewrite. Reachable from the
 * Original switch in `next dev`. */
function OriginalVersion() {
  return (
    <>
      <BookingHeroBlock />
      <BookingIntroBlock />
      <Divider padded />
      <BookingPlanBlock />
      <Divider padded />
      <BookingIdentifyBlock />
      <Divider padded />
      <BookingWireframeBlock />
      <Divider padded />
      <BookingCompetitiveBlock />
      <Divider padded />
      <BookingDesignBlock />
      <Divider padded />
      <BookingResultsBlock />
    </>
  );
}

const sections = [
  copy.summary,
  copy.problem,
  copy.discovery,
  copy.design,
  copy.iteration,
  copy.results,
] as StorySectionData[];

/** The short form: a hero, then six scannable sections. */
function OptimizedVersion() {
  return (
    <>
      <BookingHeroBlock />
      <StorySections sections={sections} lead="h-6" />
    </>
  );
}

export default function ReachBookingCaseStudyPage() {
  return (
    <main id="top">
      <div className="mx-auto w-full max-w-[1140px] px-5 sm:px-10 lg:px-20">
        <CaseStudyVersionSwitch
          original={INCLUDE_ORIGINAL ? <OriginalVersion /> : null}
          optimized={INCLUDE_OPTIMIZED ? <OptimizedVersion /> : null}
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
