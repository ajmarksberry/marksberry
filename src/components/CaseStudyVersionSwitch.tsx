"use client";

import { useSyncExternalStore, type ReactNode } from "react";

/** "legacy" is the page before the hiring-manager rewrite. It has no button; it
 * is only reachable at ?version=legacy. */
export type CaseStudyVersion = "optimized" | "original" | "legacy" | "combined";

const EVENT = "case-study-version-change";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

function readVersion(): CaseStudyVersion | null {
  const v = new URLSearchParams(window.location.search).get("version");
  return v === "original" || v === "optimized" || v === "legacy" || v === "combined" ? v : null;
}

const options: { value: CaseStudyVersion; label: string }[] = [
  { value: "optimized", label: "Optimized" },
  { value: "original", label: "Original" },
];

/**
 * Shows one of two complete versions of a case study. Both are
 * rendered on the server; this only decides which one is visible, from
 * ?version=original (or optimized) in the URL, so a version can be linked to.
 * With showToggle off, visitors get defaultVersion and no switch.
 */
export function CaseStudyVersionSwitch({
  original,
  optimized,
  legacy,
  combined,
  defaultVersion,
  showToggle,
}: {
  original: ReactNode;
  optimized: ReactNode;
  legacy?: ReactNode;
  /** A merged study (REACH). Adds a "Combined (v2)" button when given. */
  combined?: ReactNode;
  defaultVersion: CaseStudyVersion;
  showToggle: boolean;
}) {
  const fromUrl = useSyncExternalStore(subscribe, readVersion, () => null);
  const version = showToggle ? (fromUrl ?? defaultVersion) : defaultVersion;

  function choose(next: CaseStudyVersion) {
    const url = new URL(window.location.href);
    url.searchParams.set("version", next);
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event(EVENT));
  }

  return (
    <>
      <div hidden={version !== "optimized"}>{optimized}</div>
      <div hidden={version !== "original"}>{original}</div>
      {combined ? <div hidden={version !== "combined"}>{combined}</div> : null}
      {legacy ? <div hidden={version !== "legacy"}>{legacy}</div> : null}

      {showToggle ? (
        <div
          role="group"
          aria-label="Case study version"
          className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-rule bg-surface p-1 text-sm shadow-lg"
        >
          {(combined ? [...options, { value: "combined" as const, label: "Combined (v2)" }] : options).map((o) => (
            <button
              key={o.value}
              type="button"
              aria-pressed={version === o.value}
              onClick={() => choose(o.value)}
              className={`rounded-full px-4 py-2 font-semibold leading-none transition-colors ${
                version === o.value
                  ? "bg-accent text-white"
                  : "text-ink hover:text-accent"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
}
