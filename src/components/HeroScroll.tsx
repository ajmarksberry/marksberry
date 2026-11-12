"use client";

import { useEffect } from "react";

/** How far the page scrolls (px) before the fish is completely under the waves. */
const SCROLL_RANGE = 420;

/**
 * Drives the hero scene from scrolling.
 *
 * Scrolling down writes a 0 to 1 progress to --hero-scroll on <html>; the
 * artwork reads it in CSS to turn and lower the fish and slide the lure.
 *
 * Once the fish is completely hidden, scrolling back up does not run that in
 * reverse. It replays the fish's entrance instead (leaping up from behind the
 * front wave, turning and growing, with the lure sliding in), then the fish is
 * at rest again and scrolling down lowers it from there.
 *
 * Does nothing for visitors who ask for reduced motion.
 */
export function HeroScroll() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // The entrance again, a little quicker than on load: the fish starts at
    // once.
    const entrance: [string, string][] = [
      [".hero-art-fish", "hero-leap 0.45s ease-in-out 0s both"],
      [
        ".hero-art-lure",
        "hero-lure-slide 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0s both, hero-lure-fade 0.2s linear 0s both",
      ],
    ];
    let settle = 0;
    const replay = () => {
      root.classList.add("hero-replaying");
      window.clearTimeout(settle);
      settle = window.setTimeout(
        () => root.classList.remove("hero-replaying"),
        900,
      );
      const els = entrance.map(([selector, animation]) => ({
        animation,
        nodes: document.querySelectorAll<SVGElement>(selector),
      }));
      for (const { nodes } of els) {
        nodes.forEach((node) => (node.style.animation = "none"));
      }
      void root.offsetWidth; // let the "none" take hold so the animation restarts
      for (const { animation, nodes } of els) {
        nodes.forEach((node) => (node.style.animation = animation));
      }
    };

    // Scroll position (as 0 to 1) the fish is at rest from. It drops as the
    // visitor scrolls back up, so at the very top it is 0 again.
    let rest = 0;
    let hidden = false;
    let lastY = window.scrollY;
    let frame = 0;

    // As the fish goes under, the page below the front wave fades to that
    // wave's blue. The blue starts at the bottom of the hero drawing, whose own
    // cover fill is blue too (see .hero-blue in globals.css).
    // The blue fades in with the scroll (--hero-blue in globals.css); the
    // class only switches the rules on while the hero is on the page.
    root.classList.add("hero-blue");
    const placeBlue = () => {
      for (const svg of document.querySelectorAll(".hero-art")) {
        const box = svg.getBoundingClientRect();
        if (box.width > 0) {
          const top = box.bottom + window.scrollY - 1;
          root.style.setProperty("--hero-blue-top", `${top}px`);
        }
      }
    };

    // How far the case studies have travelled up through the window, 0 (their top
    // at the window's bottom) to 1 (their bottom at its top): drives their parallax.
    const placeCases = () => {
      const el = document.querySelector("[data-showcase-body]");
      if (!el) return;
      const box = el.getBoundingClientRect();
      const t =
        (window.innerHeight - box.top) / (window.innerHeight + box.height);
      root.style.setProperty(
        "--case-t",
        Math.min(1, Math.max(0, t)).toFixed(4),
      );
    };

    const update = () => {
      frame = 0;
      placeBlue();
      placeCases();
      const y = window.scrollY;
      const p = Math.min(1, Math.max(0, y / SCROLL_RANGE));

      if (hidden && y < lastY && p < 1) {
        replay();
        hidden = false;
        rest = p;
      }
      // The "Minneapolis, MN" line goes as soon as the page scrolls down and
      // comes back as soon as it scrolls up.
      if (y > lastY) root.classList.add("hero-location-hidden");
      else if (y < lastY) root.classList.remove("hero-location-hidden");
      lastY = y;

      let progress = 1;
      if (!hidden) {
        rest = Math.min(rest, p);
        progress = rest >= 1 ? 0 : (p - rest) / (1 - rest);
        if (progress >= 1) hidden = true;
      }
      root.style.setProperty("--hero-scroll", progress.toFixed(4));
      // The case studies are only there (visible, clickable) once they have begun
      // to fade in; see [data-showcase-body] in globals.css.
      root.classList.toggle("hero-cases", progress > 0.5);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.classList.remove("hero-blue", "hero-cases", "hero-location-hidden");
      root.style.removeProperty("--hero-blue-top");
      root.style.removeProperty("--case-t");
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      root.classList.remove("hero-replaying");
      root.style.removeProperty("--hero-scroll");
    };
  }, []);

  return null;
}
