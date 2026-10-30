import type { Metadata } from "next";
import { MarketingPage } from "@/components/MarketingPage";
import { OpenToWorkCard } from "@/components/OpenToWorkCard";

export const metadata: Metadata = {
  title: "AJ Marksberry",
  description: "Product design portfolio",
};

export default function HomePage() {
  return (
    <MarketingPage
      overline="Contact"
      title="Let’s work together"
      caseStudyLayout="stack"
      caseStudiesFirst
    >
      <OpenToWorkCard />
    </MarketingPage>
  );
}
