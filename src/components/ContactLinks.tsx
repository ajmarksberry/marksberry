import { DownloadIcon } from "@/components/Icons";
import { LinkedInLink } from "@/components/LinkedInLink";
import { EMAIL, MAILTO, RESUME_FILENAME, RESUME_PATH } from "@/lib/site";

const linkClass =
  "font-semibold text-base leading-7 text-ink transition-opacity duration-200 ease-out hover:opacity-60";

/** The email, LinkedIn and résumé links under "Let's work together", on the homepage and
 * in the Contact dropdown. */
export function ContactLinks() {
  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
      <a href={MAILTO} className={`${linkClass} underline underline-offset-4`}>
        {EMAIL}
      </a>
      <LinkedInLink className={`${linkClass} underline underline-offset-4`}>
        LinkedIn
      </LinkedInLink>
      <a
        href={RESUME_PATH}
        download={RESUME_FILENAME}
        className={`group inline-flex items-center gap-2 ${linkClass}`}
      >
        <DownloadIcon className="size-5 shrink-0" />
        <span className="underline underline-offset-4">Resume</span>
      </a>
    </div>
  );
}
