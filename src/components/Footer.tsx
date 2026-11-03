import Link from "next/link";
import { LinkedInLink } from "@/components/LinkedInLink";
import { MAILTO } from "@/lib/site";

const fade = "transition-opacity duration-200 ease-out hover:opacity-60";

/** Flip to true to show the site footer again. */
const SHOW_FOOTER = false;

export function Footer() {
  if (!SHOW_FOOTER) return null;

  return (
    <footer className="mt-10 w-full bg-footer-bg">
      <div className="mx-auto flex w-full max-w-[1140px] flex-col items-start gap-16 px-5 pb-24 pt-20 sm:gap-20 sm:px-10 sm:pb-28 sm:pt-[100px] lg:px-20 lg:pt-[120px]">
        <div className="flex w-full flex-col items-start gap-8">
          <p
            className="w-full font-extrabold text-[36px] leading-[44px] tracking-[-0.9px] text-footer-fg sm:text-[48px] sm:leading-[58px] sm:tracking-[-1.2px] lg:text-[60px] lg:leading-[72px] lg:tracking-[-1.5px]"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            Let’s chat
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="/contact"
              className={`flex items-center justify-center rounded-full bg-primary-600 px-6 py-4 font-semibold text-sm leading-none text-on-primary ${fade}`}
            >
              START A DISCUSSION
            </Link>
            <a
              href={MAILTO}
              className={`font-semibold text-sm leading-none text-footer-muted ${fade}`}
            >
              EMAIL ME
            </a>
            <LinkedInLink
              className={`font-semibold text-sm leading-none text-footer-muted ${fade}`}
            >
              LINKEDIN
            </LinkedInLink>
          </div>
        </div>
        <div className="flex w-full border-t border-footer-border pt-8 text-sm leading-none">
          <p className="text-footer-fg sm:w-[152px]">AJ Marksberry</p>
        </div>
      </div>
    </footer>
  );
}
