import Image from "next/image";
import { Fragment } from "react";
import { Divider } from "@/components/Divider";
import { SectionHeader } from "@/components/SectionHeader";
import {
  TaapCheckItem,
  TaapClockItem,
  TaapXItem,
} from "@/components/taap/TaapListItems";

type Img = { src: string; alt: string; width: number; height: number };
type Group = { heading: string; items: string[] };

export type StoryBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | {
      type: "image";
      image: Img;
      rounded?: boolean;
      /** Sits the image on the grey mat, for transparent PNGs. */
      mat?: boolean;
      caption?: string;
    }
  /** Image beside a list. Items get an X (a problem) unless `bullets` is set. */
  | { type: "split"; image: Img; items: string[]; bullets?: boolean }
  /** Headed lists side by side, e.g. Frustrations and Goals. */
  | { type: "groups"; groups: Group[] }
  /** A round portrait, with an optional quote and lists beside it. */
  | { type: "persona"; image: Img; quote?: string; groups: Group[] }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "checks"; items: string[]; pending?: string }
  | {
      type: "metrics";
      items: { value: string; label: string; description: string }[];
    };

export type StorySectionData = {
  overline: string;
  title: string;
  subtitle?: string;
  blocks: StoryBlock[];
};

const font = { fontFeatureSettings: '"liga" 0' } as const;
const column = "w-full max-w-[620px] lg:max-w-[640px]";

function Figure({
  image,
  rounded,
  mat,
  caption,
}: {
  image: Img;
  rounded?: boolean;
  mat?: boolean;
  caption?: string;
}) {
  const clip = rounded || mat;
  return (
    <figure className="flex w-full min-w-0 max-w-[620px] flex-col gap-2 lg:max-w-full">
      <div
        className={`w-full min-w-0 ${clip ? "overflow-clip rounded-lg" : ""} ${mat ? "bg-mat" : ""}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className={`block h-auto w-full ${clip ? "rounded-lg" : ""}`}
          sizes="(min-width: 1140px) 980px, calc(100vw - 40px)"
          unoptimized
        />
      </div>
      {caption ? (
        <figcaption className="text-sm leading-6 text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function GroupList({ group }: { group: Group }) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <h4
        className="font-extrabold text-xl leading-7 text-heading"
        style={font}
      >
        {group.heading}
      </h4>
      <ul className="list-disc ps-6 text-base leading-7 text-ink" style={font}>
        {group.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function Block({ block }: { block: StoryBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className={`${column} text-base leading-7 text-ink`} style={font}>
          {block.text}
        </p>
      );
    case "h":
      return (
        <h3
          className={`${column} pt-2 font-extrabold text-2xl leading-8 text-heading sm:text-[30px] sm:leading-10`}
          style={font}
        >
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul
          className={`${column} list-disc ps-6 text-base leading-7 text-ink`}
          style={font}
        >
          {block.items.map((item) => (
            <li key={item} className="pb-1">
              {item}
            </li>
          ))}
        </ul>
      );
    case "image":
      return (
        <Figure
          image={block.image}
          rounded={block.rounded}
          mat={block.mat}
          caption={block.caption}
        />
      );
    case "groups":
      return (
        <div className="grid w-full max-w-[620px] gap-8 sm:grid-cols-2 lg:max-w-full lg:gap-10">
          {block.groups.map((g) => (
            <GroupList key={g.heading} group={g} />
          ))}
        </div>
      );
    case "persona":
      return (
        <div className="flex w-full max-w-[620px] flex-col items-start gap-8 lg:max-w-full lg:flex-row lg:items-center lg:gap-12">
          <div className="size-[200px] shrink-0 overflow-clip rounded-full">
            <Image
              src={block.image.src}
              alt={block.image.alt}
              width={block.image.width}
              height={block.image.height}
              className="size-full rounded-full object-cover"
              sizes="200px"
              unoptimized
            />
          </div>
          <div className="flex min-w-0 flex-col gap-6 lg:flex-1">
            {block.quote ? (
              <blockquote
                className="font-semibold italic text-[20px] leading-8 text-ink sm:text-[22px] sm:leading-9"
                style={font}
              >
                {block.quote}
              </blockquote>
            ) : null}
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-10">
              {block.groups.map((g) => (
                <GroupList key={g.heading} group={g} />
              ))}
            </div>
          </div>
        </div>
      );
    case "split":
      return (
        <div className="flex w-full min-w-0 max-w-[620px] flex-col gap-10 lg:max-w-full lg:flex-row lg:items-center">
          <div className="w-full min-w-0 lg:w-[66.64%] lg:shrink-0">
            <Image
              src={block.image.src}
              alt={block.image.alt}
              width={block.image.width}
              height={block.image.height}
              className="block h-auto w-full"
              sizes="(min-width: 1140px) 653px, calc(100vw - 40px)"
              unoptimized
            />
          </div>
          {block.bullets ? (
            <ul
              className="w-full min-w-0 list-disc ps-6 text-base leading-7 text-ink lg:flex-1"
              style={font}
            >
              {block.items.map((item) => (
                <li key={item} className="pb-1">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex w-full min-w-0 flex-col items-start gap-3 lg:flex-1">
              {block.items.map((item) => (
                <TaapXItem key={item}>{item}</TaapXItem>
              ))}
            </div>
          )}
        </div>
      );
    case "stats":
      return (
        <dl className="grid w-full max-w-[620px] gap-6 border-t border-rule pt-8 sm:grid-cols-3 lg:max-w-full lg:gap-10">
          {block.items.map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <dt className="order-2 text-base leading-7 text-ink" style={font}>
                {s.label}
              </dt>
              <dd
                className="order-1 font-extrabold text-[36px] leading-[44px] tracking-[-0.9px] text-accent sm:text-[48px] sm:leading-[58px] sm:tracking-[-1.2px]"
                style={font}
              >
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      );
    case "metrics":
      return (
        <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-start">
          {block.items.map((m) => (
            <div
              key={m.label}
              className="flex w-full max-w-[620px] flex-col items-start gap-4 border-t border-ink pt-6 lg:max-w-none lg:min-w-0 lg:flex-1"
            >
              <p
                className="font-extrabold text-[48px] leading-[60px] tracking-[-1.2px] text-accent sm:text-[60px] sm:leading-[72px] lg:text-[72px] lg:leading-[90px] lg:tracking-[-1.8px]"
                style={font}
              >
                {m.value}
              </p>
              <p className="font-bold text-base leading-none text-ink">
                {m.label}
              </p>
              <p className="w-full text-base leading-6 text-ink" style={font}>
                {m.description}
              </p>
            </div>
          ))}
        </div>
      );
    case "checks":
      return (
        <div className="flex w-full max-w-[620px] flex-col items-start gap-3 lg:max-w-[564px] lg:mr-auto">
          {block.items.map((item) => (
            <TaapCheckItem key={item}>{item}</TaapCheckItem>
          ))}
          {block.pending ? (
            <TaapClockItem>{block.pending}</TaapClockItem>
          ) : null}
        </div>
      );
  }
}

/** One of the six sections of a short-form case study. */
export function StorySection({ data }: { data: StorySectionData }) {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-8 lg:items-start">
      <SectionHeader
        overline={data.overline}
        title={data.title}
        subtitle={data.subtitle}
        className="w-full max-w-[620px] lg:max-w-full"
      />
      {data.blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </section>
  );
}

/**
 * The body of a short-form case study: the sections in order, divided by rules.
 * `lead` is the space under the hero, which differs by hero block.
 */
export function StorySections({
  sections,
  lead = "h-16",
}: {
  sections: StorySectionData[];
  lead?: string;
}) {
  return (
    <>
      {sections.map((section, i) => (
        <Fragment key={section.title}>
          {i === 0 ? <div className={lead} aria-hidden /> : <Divider padded />}
          <StorySection data={section} />
        </Fragment>
      ))}
    </>
  );
}
