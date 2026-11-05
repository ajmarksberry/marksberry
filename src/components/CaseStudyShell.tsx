import { BackToTop } from "@/components/BackToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SectionNav } from "@/components/SectionNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TopBar } from "@/components/TopBar";
import { SHOW_THEME_TOGGLE } from "@/lib/site";

export function CaseStudyShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full w-full">
      <ScrollProgress />
      <TopBar />
      <SectionNav />
      <div className="mx-auto w-full min-w-0 max-w-[1140px] bg-background">
        {children}
      </div>
      {SHOW_THEME_TOGGLE ? <ThemeToggle /> : null}
      <BackToTop />
    </div>
  );
}
