import type { Metadata } from "next";
import { MarketingPage } from "@/components/MarketingPage";
import { OpenToWorkCard } from "@/components/OpenToWorkCard";

const title = "AJ Marksberry | Senior Product Designer";
const description =
  "Senior Product Designer with deep experience in enterprise and consumer products. Case studies from Expedia TAAP and REACH.ai.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    type: "website",
    siteName: "AJ Marksberry",
    locale: "en_US",
  },
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
