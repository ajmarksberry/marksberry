import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

type TaapGenerationBlockProps = {
  id?: string;
  overline: string;
  title: string;
  subtitle?: string;
  description: string;
  bullets: readonly string[];
  image: { src: string; alt: string; width: number; height: number };
  /** Rounds the screenshot, for images that are a flat canvas rather than a UI on the page. */
  roundedImage?: boolean;
};

/** One generation (or the handoff): a short paragraph, bullets, then the screens. */
export function TaapGenerationBlock({
  id,
  overline,
  title,
  subtitle,
  description,
  bullets,
  image,
  roundedImage = false,
}: TaapGenerationBlockProps) {
  return (
    <section
      id={id}
      className="section-reveal flex w-full scroll-mt-24 flex-col items-center gap-10 lg:items-start"
    >
      <div className="flex w-full max-w-[620px] flex-col gap-6 lg:max-w-full">
        <SectionHeader
          overline={overline}
          title={title}
          subtitle={subtitle}
          description={description}
          className="w-full"
        />
        <ul
          className="w-full max-w-[640px] list-disc ps-6 text-base leading-7 text-ink"
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      <div
        className={`w-full min-w-0 max-w-[620px] lg:max-w-full ${roundedImage ? "overflow-clip rounded-lg" : ""}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className={`block h-auto w-full ${roundedImage ? "rounded-lg" : ""}`}
          sizes="(min-width: 1140px) 980px, calc(100vw - 40px)"
          unoptimized
        />
      </div>
    </section>
  );
}
