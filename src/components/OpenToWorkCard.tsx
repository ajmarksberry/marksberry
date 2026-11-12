import { ContactLinks } from "@/components/ContactLinks";

/** The "Open to work" box, on the About page and in the Contact dropdown. */
export function OpenToWorkCard() {
  return (
    <div className="flex w-full max-w-[640px] flex-col items-start gap-4 rounded-lg bg-white p-6 sm:p-8 lg:max-w-[760px]">
      <p className="font-extrabold text-xs uppercase leading-none text-accent">
        Open to work
      </p>
      <p
        className="text-base leading-7 text-heading sm:text-lg sm:leading-8"
        style={{ fontFeatureSettings: '"liga" 0' }}
      >
        I&rsquo;m currently open to Senior Product Designer, Lead Product
        Designer, Principal Product Designer, and UX Leadership opportunities.
      </p>
      <ContactLinks />
    </div>
  );
}
