import { SectionHeader } from "@/components/SectionHeader";

const stats = [
  { value: "52", label: "Participants" },
  { value: "3", label: "Questions" },
] as const;

const questions = [
  "How do you feel about the design?",
  "How would you improve the design?",
  "What features are most important to you, visited most?",
] as const;

export function InterviewBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center pb-16 lg:pb-20">
      <SectionHeader
        overline="Discovery"
        title="Interviews"
        description="Because we couldn’t afford to do user testing or interviews, we offered the customer success team a list of questions to ask consumers during sales and support calls."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="flex w-full flex-col items-center gap-8 pt-8">
        <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-start">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex w-full max-w-[620px] flex-col items-start border-t border-ink pt-6 lg:max-w-none lg:min-w-0 lg:flex-1"
            >
              <p
                className="w-full font-extrabold text-[48px] leading-[60px] tracking-[-1.2px] text-accent sm:text-[60px] sm:leading-[72px] lg:text-[72px] lg:leading-[90px] lg:tracking-[-1.8px]"
                style={{ fontFeatureSettings: '"liga" 0' }}
              >
                {stat.value}
              </p>
              <p
                className="w-full font-bold text-2xl leading-8 tracking-[-0.24px] text-heading sm:text-[30px] sm:leading-10 lg:text-[36px] lg:leading-[48px] lg:tracking-[-0.9px]"
                style={{ fontFeatureSettings: '"liga" 0' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex w-full max-w-[620px] flex-col gap-10 rounded-lg bg-panel-dark p-6 text-white sm:p-8 lg:max-w-full lg:flex-row lg:items-start lg:gap-10 lg:p-10">
          <div className="flex w-full flex-col gap-6 lg:min-w-0 lg:flex-1">
            <h3
              className="w-full font-extrabold text-2xl leading-8 sm:text-[30px] sm:leading-10"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              What we asked
            </h3>
            <ol
              className="w-full list-decimal text-base leading-5"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              {questions.map((question) => (
                <li key={question} className="ms-6 mb-6 last:mb-0">
                  {question}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex w-full flex-col gap-6 lg:min-w-0 lg:flex-1">
            <h3
              className="w-full font-extrabold text-2xl leading-8 sm:text-[30px] sm:leading-10"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              What we heard
            </h3>
            <div
              className="flex w-full flex-col gap-6 text-base leading-5"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              <p>
                “There is a lot of information on the dashboard.”
                <br />
                <br />
                “I can’t find what I’m looking for.”
              </p>
              <p>“My staff shouldn’t need a tutorial to check in a walk-up.”</p>
              <p>“It’s difficult to change locations.”</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
