"use client";

import { usePathname } from "next/navigation";
import { useId } from "react";
import {
  CaseStudyPreviewRow,
  type PreviewItem,
} from "@/components/CaseStudyPreviewRow";
import { caseStudies } from "@/lib/site";

/** The Expedia work and Visual design pages live in the main navigation. */
const items: readonly PreviewItem[] = caseStudies;

/** Static export serves trailing-slash URLs; hrefs in site.ts have none. */
function samePath(a: string, b: string) {
  const trim = (v: string) => (v.length > 1 ? v.replace(/\/+$/, "") : v);
  return trim(a) === trim(b);
}

export function CaseStudyExplorer() {
  const pathname = usePathname();
  const groupId = useId();

  // On a case study page this leaves the others; elsewhere, all of them.
  const others = items.filter((study) => !samePath(study.href, pathname));
  if (others.length === 0) return null;

  return (
    <section
      aria-labelledby={`${groupId}-heading`}
      className="flex w-full flex-col gap-6 pb-16 sm:gap-8 sm:pb-20"
    >
      <div className="flex flex-col gap-3">
        <p className="font-extrabold text-xs uppercase leading-none text-accent">
          Case studies
        </p>
        <h2
          id={`${groupId}-heading`}
          className="font-extrabold text-[28px] leading-9 tracking-[-0.7px] text-heading sm:text-[36px] sm:leading-[48px] sm:tracking-[-0.9px]"
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          More work
        </h2>
      </div>

      <ul className="flex w-full flex-col">
        {others.map((study) => (
          <li key={study.href}>
            <CaseStudyPreviewRow study={study} current={false} />
          </li>
        ))}
      </ul>
    </section>
  );
}
