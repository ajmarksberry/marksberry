"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SHOW_VERSION_TOGGLE } from "@/lib/site";

/**
 * Dev-only controls for placing the hero fish and lure (they only render while
 * SHOW_VERSION_TOGGLE is on, never in a production build, and only with
 * ?controls on the address, e.g. http://localhost:3000/?controls). Three poses for each,
 * every one an x and y in drawing units (px in the artwork's own coordinates), a
 * rotation in degrees (clockwise is positive) and one scale:
 *
 *   start  where the entrance begins
 *   rest   where it stands once the entrance is done (the static middle)
 *   end    where it finishes after scrolling, relative to the rest pose
 *
 * They write --fish-<pose>-<axis> or --lure-<pose>-<axis> on <html>; globals.css
 * reads them in the hero-leap and hero-lure-slide keyframes (start, rest) and in
 * .hero-scroll-fish and .hero-scroll-lure (end). Touching a slider holds that
 * piece still at the pose (data-fish-preview, data-lure-preview on <html>).
 */
const POSES = [
  { id: "start", label: "Start", hint: "entrance begins" },
  { id: "rest", label: "Rest", hint: "static, once it has landed" },
  { id: "end", label: "End", hint: "after scrolling, from rest" },
] as const;

type Values = Record<string, number>;
type Limits = Record<string, [number, number, number]>;

/* The positions as they stand (the same numbers as the fallbacks in
 * globals.css). For the fish, start y is the drop out of sight behind the front
 * wave, and end y 614 is the dive under it. The end scale multiplies the rest
 * scale. */
const TARGETS = {
  fish: {
    label: "Fish",
    defaults: {
      "start-x": -24,
      "start-y": 485,
      "start-rot": -44,
      "start-scale": 0.97,
      "rest-x": -51,
      "rest-y": 0,
      "rest-rot": 10,
      "rest-scale": 1.16,
      "end-x": -72,
      "end-y": 614,
      "end-rot": 138,
      "end-scale": 1.47,
    } as Values,
    // Held to ranges that read as a leap or a dive, one scale so it never squashes.
    limits: {
      x: [-800, 800, 1],
      y: [-800, 1200, 1],
      rot: [-90, 90, 1],
      scale: [0.2, 1.6, 0.01],
      "end-rot": [-45, 360, 1],
    } as Limits,
  },
  lure: {
    label: "Lure",
    defaults: {
      "start-x": -93,
      "start-y": 102,
      "start-rot": 0,
      "start-scale": 0.49,
      "rest-x": 22,
      "rest-y": 32,
      "rest-rot": 19,
      "rest-scale": 1,
      "end-x": 240,
      "end-y": 0,
      "end-rot": -22,
      "end-scale": 0.43,
    } as Values,
    limits: {
      x: [-800, 800, 1],
      y: [-800, 800, 1],
      rot: [-180, 180, 1],
      scale: [0.3, 2, 0.01],
      "end-rot": [-180, 360, 1],
    } as Limits,
  },
} as const;
type Target = keyof typeof TARGETS;

const storeKey = (t: Target) => `${t}-controls-v2`;

/* The middle of the fish's bounding box, in the drawing's units. The fish turns
 * about the pivot, which starts here. */
const PIVOT = { x: 742.67, y: 554.15 };
const PIVOT_KEY = "fish-pivot-v1";

function limitsFor(t: Target, k: string): [number, number, number] {
  const l = TARGETS[t].limits;
  return l[k] ?? l[k.slice(k.indexOf("-") + 1)];
}

function unit(k: string, v: number) {
  if (k.endsWith("-rot")) return `${v}deg`;
  if (k.endsWith("-scale")) return `${v}`;
  return `${v}px`;
}

function apply(t: Target, values: Values) {
  const root = document.documentElement;
  for (const [k, v] of Object.entries(values)) {
    root.style.setProperty(`--${t}-${k}`, unit(k, v));
  }
}

function applyPivot(p: { x: number; y: number }) {
  const root = document.documentElement;
  root.style.setProperty("--fish-pivot-x", `${p.x}px`);
  root.style.setProperty("--fish-pivot-y", `${p.y}px`);
}

function replayEntrance() {
  window.scrollTo({ top: 0, behavior: "instant" });
  for (const sel of [".hero-art-fish", ".hero-art-lure"]) {
    for (const el of document.querySelectorAll<SVGElement>(sel)) {
      el.style.animation = "none";
      void el.getBoundingClientRect();
      el.style.animation = "";
    }
  }
}

export function FishControls() {
  const [all, setAll] = useState<Record<Target, Values>>({
    fish: TARGETS.fish.defaults,
    lure: TARGETS.lure.defaults,
  });
  const [target, setTarget] = useState<Target>("fish");
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [pivot, setPivot] = useState(PIVOT);
  const [spin, setSpin] = useState(0);
  const [circle, setCircle] = useState(true);

  useEffect(() => {
    // Hidden unless the address has ?controls, so it is out of the way until it is
    // wanted again. Saved values are not applied either, so the page shows the
    // defaults in globals.css.
    if (!new URLSearchParams(window.location.search).has("controls")) return;
    const loaded = {
      fish: TARGETS.fish.defaults,
      lure: TARGETS.lure.defaults,
    };
    for (const t of Object.keys(TARGETS) as Target[]) {
      try {
        const raw = window.localStorage.getItem(storeKey(t));
        if (raw) loaded[t] = { ...TARGETS[t].defaults, ...JSON.parse(raw) };
      } catch {}
      apply(t, loaded[t]);
    }
    try {
      const raw = window.localStorage.getItem(PIVOT_KEY);
      if (raw) {
        const saved = { ...PIVOT, ...JSON.parse(raw) };
        setPivot(saved);
        applyPivot(saved);
      }
    } catch {}
    setAll(loaded);
    setMounted(true);
    return () => {
      const root = document.documentElement;
      for (const k of ["pivot-x", "pivot-y", "spin"]) {
        root.style.removeProperty(`--fish-${k}`);
      }
      for (const t of Object.keys(TARGETS) as Target[]) {
        for (const k of Object.keys(TARGETS[t].defaults)) {
          root.style.removeProperty(`--${t}-${k}`);
        }
      }
    };
  }, []);

  // Holds the chosen piece still at the chosen pose, so each slider's effect is
  // on screen. Only one piece is held at a time.
  useEffect(() => {
    const root = document.documentElement;
    delete root.dataset.fishPreview;
    delete root.dataset.lurePreview;
    if (preview) {
      root.dataset[target === "fish" ? "fishPreview" : "lurePreview"] = preview;
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    return () => {
      delete root.dataset.fishPreview;
      delete root.dataset.lurePreview;
    };
  }, [preview, target]);

  // The bounding circle and pivot dot, drawn on the fish while the fish tab is open.
  useEffect(() => {
    const root = document.documentElement;
    if (mounted && circle && target === "fish") root.dataset.fishDebug = "1";
    else delete root.dataset.fishDebug;
    return () => {
      delete root.dataset.fishDebug;
    };
  }, [mounted, circle, target]);

  if (!SHOW_VERSION_TOGGLE || !mounted) return null;

  const values = all[target];
  const defaults = TARGETS[target].defaults;
  const set = (k: string, v: number) => {
    const [min, max] = limitsFor(target, k);
    const clamped = Number.isFinite(v)
      ? Math.min(max, Math.max(min, v))
      : defaults[k];
    const next = { ...values, [k]: clamped };
    setAll({ ...all, [target]: next });
    apply(target, next);
    try {
      window.localStorage.setItem(storeKey(target), JSON.stringify(next));
    } catch {}
  };
  const reset = () => {
    setAll({ ...all, [target]: defaults });
    apply(target, defaults);
    try {
      window.localStorage.removeItem(storeKey(target));
    } catch {}
  };
  const css = Object.entries(values)
    .map(([k, v]) => `--${target}-${k}: ${unit(k, v)};`)
    .join(" ");
  const name = TARGETS[target].label.toLowerCase();

  const btn =
    "rounded-full border border-rule bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:text-accent";

  /* In a portal: the page's reveal wrapper has a transform, which would make
   * "fixed" relative to it instead of the window. */
  return createPortal(
    <div
      role="group"
      aria-label="Fish and lure position controls (dev only)"
      className="fixed bottom-0 left-1/2 z-50 w-[min(960px,calc(100vw-24px))] -translate-x-1/2 rounded-t-2xl border border-b-0 border-rule bg-white p-3 text-xs text-ink shadow-lg"
    >
      <div className="flex flex-wrap items-center gap-2">
        <strong className="text-sm">Position (dev only)</strong>
        <div role="tablist" className="mr-auto flex gap-1">
          {(Object.keys(TARGETS) as Target[]).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={t === target}
              onClick={() => {
                setPreview(null);
                setTarget(t);
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                t === target
                  ? "bg-accent text-white"
                  : "border border-rule bg-white text-ink hover:text-accent"
              }`}
            >
              {TARGETS[t].label}
            </button>
          ))}
        </div>
        <button
          className={btn}
          onClick={() => {
            setPreview(null);
            replayEntrance();
          }}
        >
          Replay start
        </button>
        <button
          className={btn}
          onClick={() => {
            setPreview(null);
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        >
          Go to rest
        </button>
        <button
          className={btn}
          onClick={() => {
            setPreview(null);
            window.scrollTo({ top: 640, behavior: "instant" });
          }}
        >
          Go to end
        </button>
        <button
          className={btn}
          onClick={() => navigator.clipboard?.writeText(css)}
        >
          Copy values
        </button>
        {preview ? (
          <button className={btn} onClick={() => setPreview(null)}>
            Stop preview
          </button>
        ) : null}
        <button className={btn} onClick={reset}>
          Reset {name}
        </button>
        <button className={btn} onClick={() => setOpen(!open)}>
          {open ? "Hide" : "Show"}
        </button>
      </div>
      <p className="mt-2 text-muted">
        Touch a slider and the {name} holds still at that pose, so you can see
        the position, rotation and size as you drag.
      </p>
      {open ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {POSES.map((pose) => (
            <fieldset
              key={pose.id}
              onFocus={() => setPreview(pose.id)}
              onPointerDown={() => setPreview(pose.id)}
              className={`rounded-lg border p-2 ${
                preview === pose.id ? "border-accent" : "border-rule"
              }`}
            >
              <legend className="px-1 font-semibold">
                {pose.label}{" "}
                <span className="font-normal text-muted">({pose.hint})</span>
              </legend>
              {(["x", "y", "rot", "scale"] as const).map((axis) => {
                const k = `${pose.id}-${axis}`;
                const [min, max, step] = limitsFor(target, k);
                return (
                  <label key={k} className="mt-1 flex items-center gap-2">
                    <span className="w-9 uppercase">{axis}</span>
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={values[k]}
                      onChange={(e) => set(k, Number(e.target.value))}
                      className="min-w-0 flex-1"
                    />
                    <input
                      type="number"
                      min={min}
                      max={max}
                      step={step}
                      value={values[k]}
                      onChange={(e) => set(k, Number(e.target.value))}
                      className="w-16 rounded border border-rule px-1 py-0.5"
                    />
                  </label>
                );
              })}
            </fieldset>
          ))}
        </div>
      ) : null}
      {open && target === "fish" ? (
        <fieldset
          onFocus={() => setPreview("spin")}
          onPointerDown={() => setPreview("spin")}
          className={`mt-3 rounded-lg border p-2 ${
            preview === "spin" ? "border-accent" : "border-rule"
          }`}
        >
          <legend className="px-1 font-semibold">
            Turn point{" "}
            <span className="font-normal text-muted">
              (the fish turns about the dot; the cross is the middle of its box)
            </span>
          </legend>
          <div className="grid gap-x-4 sm:grid-cols-2">
            {(["x", "y"] as const).map((axis) => {
              const min = axis === "x" ? 575 : 333;
              const max = axis === "x" ? 910 : 775;
              const v = pivot[axis];
              const change = (n: number) => {
                const next = {
                  ...pivot,
                  [axis]: Math.min(max, Math.max(min, Number.isFinite(n) ? n : PIVOT[axis])),
                };
                setPivot(next);
                applyPivot(next);
                try {
                  window.localStorage.setItem(PIVOT_KEY, JSON.stringify(next));
                } catch {}
              };
              return (
                <label key={axis} className="mt-1 flex items-center gap-2">
                  <span className="w-12 uppercase">Pivot {axis}</span>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={0.5}
                    value={v}
                    onChange={(e) => change(Number(e.target.value))}
                    className="min-w-0 flex-1"
                  />
                  <input
                    type="number"
                    min={min}
                    max={max}
                    step={0.5}
                    value={v}
                    onChange={(e) => change(Number(e.target.value))}
                    className="w-20 rounded border border-rule px-1 py-0.5"
                  />
                </label>
              );
            })}
            <label className="mt-1 flex items-center gap-2">
              <span className="w-12">Spin</span>
              <input
                type="range"
                min={-180}
                max={180}
                step={1}
                value={spin}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  setSpin(n);
                  document.documentElement.style.setProperty("--fish-spin", `${n}deg`);
                }}
                className="min-w-0 flex-1"
              />
              <span className="w-20 px-1">{spin}°</span>
            </label>
            <div className="mt-1 flex items-center gap-3">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={circle}
                  onChange={(e) => setCircle(e.target.checked)}
                />
                Show circle
              </label>
              <button
                className={btn}
                onClick={() => {
                  setPivot(PIVOT);
                  applyPivot(PIVOT);
                  setSpin(0);
                  document.documentElement.style.setProperty("--fish-spin", "0deg");
                  try {
                    window.localStorage.removeItem(PIVOT_KEY);
                  } catch {}
                }}
              >
                Reset turn point
              </button>
            </div>
          </div>
        </fieldset>
      ) : null}
    </div>,
    document.body,
  );
}
