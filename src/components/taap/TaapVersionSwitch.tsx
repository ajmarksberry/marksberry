"use client";

import { useSyncExternalStore, type ReactNode } from "react";

export type TaapVersion = "optimized" | "original";

const EVENT = "taap-version-change";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

function readVersion(): TaapVersion | null {
  const v = new URLSearchParams(window.location.search).get("version");
  return v === "original" || v === "optimized" ? v : null;
}

const options: { value: TaapVersion; label: string }[] = [
  { value: "optimized", label: "Optimized" },
  { value: "original", label: "Original" },
];

/**
 * Shows one of two complete versions of the TAAP Trips case study. Both are
 * rendered on the server; this only decides which one is visible, from
 * ?version=original (or optimized) in the URL, so a version can be linked to.
 * With showToggle off, visitors get defaultVersion and no switch.
 */
export function TaapVersionSwitch({
  original,
  optimized,
  defaultVersion,
  showToggle,
}: {
  original: ReactNode;
  optimized: ReactNode;
  defaultVersion: TaapVersion;
  showToggle: boolean;
}) {
  const fromUrl = useSyncExternalStore(subscribe, readVersion, () => null);
  const version = showToggle ? (fromUrl ?? defaultVersion) : defaultVersion;

  function choose(next: TaapVersion) {
    const url = new URL(window.location.href);
    url.searchParams.set("version", next);
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event(EVENT));
  }

  return (
    <>
      <div hidden={version !== "optimized"}>{optimized}</div>
      <div hidden={version !== "original"}>{original}</div>

      {showToggle ? (
        <div
          role="group"
          aria-label="Case study version"
          className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-rule bg-surface p-1 text-sm shadow-lg"
        >
          {options.map((o) => (
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
