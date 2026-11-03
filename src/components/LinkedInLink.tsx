"use client";

import type { ReactNode } from "react";
import { LINKEDIN_URL } from "@/lib/site";

/**
 * A link to the LinkedIn profile that opens in its own browser window. Asking
 * for a window size is what makes browsers open a window rather than a tab; if
 * the script is off or the popup is blocked, the plain link still opens a tab.
 */
export function LinkedInLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(event) => {
        const width = Math.min(1100, window.screen.availWidth);
        const height = Math.min(800, window.screen.availHeight);
        const left = Math.max(0, (window.screen.availWidth - width) / 2);
        const top = Math.max(0, (window.screen.availHeight - height) / 2);
        const opened = window.open(
          LINKEDIN_URL,
          "_blank",
          `popup=yes,width=${width},height=${height},left=${left},top=${top}`,
        );
        if (opened) {
          opened.opener = null;
          event.preventDefault();
        }
      }}
    >
      {children}
    </a>
  );
}
