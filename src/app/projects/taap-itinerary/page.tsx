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

export const metadata: Metadata = {
  title: "Expedia TAAP Itinerary Builder | AJ Marksberry",
  description:
    "Designed and validated a new itinerary creation workflow that gives travel advisors a simpler, more flexible way to create client-ready itineraries.",
};

export default function TaapItineraryCaseStudyPage() {
  return (
    <main id="top">
      <div className="mx-auto w-full max-w-[1140px] px-5 sm:px-10 lg:px-20">
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
        <Divider padded />
        <CaseStudyExplorer />
      </div>
      <Footer />
    </main>
  );
}
