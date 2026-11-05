import type { Metadata } from "next";
import { Fragment } from "react";
import { CaseStudyExplorer } from "@/components/CaseStudyExplorer";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { TaapGen1Block } from "@/components/taap/TaapGen1Block";
import { TaapGen2Block } from "@/components/taap/TaapGen2Block";
import { TaapGen3Block } from "@/components/taap/TaapGen3Block";
import { TaapHandoffBlock } from "@/components/taap/TaapHandoffBlock";
import { TaapHeroBlock } from "@/components/taap/TaapHeroBlock";
import { TaapIntroBlock } from "@/components/taap/TaapIntroBlock";
import { TaapOriginsBlock } from "@/components/taap/TaapOriginsBlock";
import { TaapResultsBlock } from "@/components/taap/TaapResultsBlock";
import { TaapVersionSwitch } from "@/components/taap/TaapVersionSwitch";
import { TaapContextBlock } from "@/components/taap/optimized/TaapContextBlock";
import { TaapGenerationBlock } from "@/components/taap/optimized/TaapGenerationBlock";
import { TaapJourneyBlock } from "@/components/taap/optimized/TaapJourneyBlock";
import { TaapRoleBlock } from "@/components/taap/optimized/TaapRoleBlock";
import { TaapSummaryBlock } from "@/components/taap/optimized/TaapSummaryBlock";
import copy from "@/components/taap/sixSection/copy.json";
import {
  TaapStorySection,
  type StorySectionData,
} from "@/components/taap/sixSection/TaapStorySection";
import { SHOW_TAAP_VERSION_TOGGLE, TAAP_LIVE_VERSION } from "@/lib/site";

export const metadata: Metadata = {
  title: "Expedia TAAP Trips | AJ Marksberry",
  description:
    "From chaos to clarity: three generations that turned a consumer list into a professional advisor workspace",
};

/** The page as it was before the hiring-manager rewrite. Untouched. Reach it at
 * ?version=legacy. */
function LegacyVersion() {
  return (
    <>
      <TaapHeroBlock />
      <TaapIntroBlock />
      <Divider padded />
      <TaapOriginsBlock />
      <Divider padded />
      <TaapGen1Block />
      <Divider padded />
      <TaapGen2Block />
      <Divider padded />
      <TaapHandoffBlock />
      <Divider padded />
      <TaapGen3Block />
      <Divider padded />
      <TaapResultsBlock />
    </>
  );
}

const heroMeta = [
  { label: "Client", value: "Expedia" },
  { label: "Role", value: "Lead product designer" },
  { label: "Team", value: "Product · Engineering · Research · Content" },
  { label: "Duration", value: "2023-2026" },
] as const;

/** The first rewrite: summary and role up front, then the problem, then each
 * generation. This is the version that is live, so it is the "original" the
 * six-section version is compared against. */
function OriginalVersion() {
  return (
    <>
      <TaapHeroBlock meta={heroMeta} />
      <TaapSummaryBlock />
      <Divider padded />
      <TaapRoleBlock />
      <Divider padded />
      <TaapContextBlock />
      <Divider padded />
      <TaapOriginsBlock />
      <Divider padded />
      <TaapJourneyBlock />
      <Divider padded />
      <TaapGenerationBlock
        id="gen-1"
        overline="Generation 1"
        title="Table format redesign"
        description={`I replaced the consumer pattern with a professional data table and renamed "My Trips" to "Trips," reframing the page as an advisor workspace.`}
        bullets={[
          "4 status tabs and sortable columns",
          "Line-of-business icons to show booking types at a glance",
          "Paginated results",
          "Universal search with typeahead and full search states",
        ]}
        image={{
          src: "/images/taap/gen1-table.webp",
          alt: "Generation 1 Trips page redesigned as a sortable data table",
          width: 1280,
          height: 1134,
        }}
      />
      <Divider padded />
      <TaapGenerationBlock
        id="gen-2"
        overline="Generation 2"
        title="3-panel design"
        description="Post-launch research and a product direction change called for a full redesign. Before designing, I mapped the live experience as a detailed user flow and annotated every friction point. The new Outlook-style layout gave advisors:"
        bullets={[
          "A persistent list on the left",
          "Contextual actions in the center",
          "An itinerary preview on the right",
        ]}
        image={{
          src: "/images/taap/gen2-tray.webp",
          alt: "Generation 2 three-panel Trips layout on desktop with the mobile list overlapping",
          width: 2576,
          height: 3762,
        }}
      />
      <Divider padded />
      <TaapGenerationBlock
        overline="Build"
        title="Dev handoff"
        description="A structured handoff bridged design and engineering, so spacing, states, edge cases, and interactions shipped as intended."
        bullets={[
          "Annotated specs",
          "Tokenized styles",
          "Component-level documentation",
          "Accessibility annotations at every handoff",
        ]}
        roundedImage
        image={{
          src: "/images/taap/handoff-tray.webp",
          alt: "Annotated Figma handoff of the three-panel Trips desktop and mobile screens",
          width: 2000,
          height: 1241,
        }}
      />
      <Divider padded />
      <TaapGenerationBlock
        id="gen-3"
        overline="Generation 3"
        title="Post-launch"
        subtitle="2025–2026"
        description="User testing, surveys, and feedback questionnaires, run with the Research team, surfaced specific refinements."
        bullets={[
          "Organized 20+ changes into four categories",
          "Prioritized them with Engineering",
        ]}
        image={{
          src: "/images/taap/gen3-tray.webp",
          alt: "Generation 3 Trips dashboard after post-launch refinements",
          width: 2576,
          height: 4348,
        }}
      />
      <Divider padded />
      <TaapResultsBlock
        leadItems={[
          "The Gen 2 3-panel view decreased call volume to the customer center by 10%",
          "Reduced support tickets",
        ]}
      />
    </>
  );
}

const sixSections = [
  copy.summary,
  copy.problem,
  copy.gen1,
  copy.gen2,
  copy.gen3,
  copy.results,
] as StorySectionData[];

/** The short form: a hero, then six sections of roughly 300 words each. */
function OptimizedVersion() {
  return (
    <>
      <TaapHeroBlock meta={heroMeta} />
      {sixSections.map((section, i) => (
        <Fragment key={section.title}>
          {i === 0 ? <div className="h-16" aria-hidden /> : <Divider padded />}
          <TaapStorySection data={section} />
        </Fragment>
      ))}
    </>
  );
}

export default function TaapTripsCaseStudyPage() {
  return (
    <main id="top">
      <div className="mx-auto w-full max-w-[1140px] px-5 sm:px-10 lg:px-20">
        <TaapVersionSwitch
          original={<OriginalVersion />}
          optimized={<OptimizedVersion />}
          legacy={<LegacyVersion />}
          defaultVersion={
            SHOW_TAAP_VERSION_TOGGLE ? "optimized" : TAAP_LIVE_VERSION
          }
          showToggle={SHOW_TAAP_VERSION_TOGGLE}
        />
        <Divider padded />
        <CaseStudyExplorer />
      </div>
      <Footer />
    </main>
  );
}
