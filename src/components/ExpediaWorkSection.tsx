import Image from "next/image";
import type { ExpediaWorkItem } from "@/lib/expedia-work";

/** No image displays taller than this, however narrow it is (CSS px). */
const MAX_IMAGE_HEIGHT = 1000;
/** Taller than this height-to-width ratio counts as a portrait image. */
const PORTRAIT_RATIO = 1.2;

/**
 * One piece of Expedia work: title and description above, images beneath, each
 * with its own caption. Images keep their natural aspect ratio — these are
 * screenshots, and cropping them would cut off the thing being shown.
 */
export function ExpediaWorkSection({ item }: { item: ExpediaWorkItem }) {
  const multiple = item.images.length > 1 && !item.stacked;

  return (
    <article
      aria-labelledby={`${item.id}-title`}
      className="flex w-full flex-col gap-8 border-t border-rule pt-10"
    >
      <header className="flex w-full max-w-[640px] flex-col gap-4">
        <h3
          id={`${item.id}-title`}
          className="font-extrabold text-2xl leading-8 tracking-[-0.24px] text-heading sm:text-[30px] sm:leading-10"
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          {item.title}
        </h3>
        {item.description ? (
          <p
            className="text-base leading-7 text-ink"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            {item.description}
          </p>
        ) : null}
        {item.points && item.points.length > 0 ? (
          // No bullets: each point is a line of its own. list-none drops the
          // list role in some screen readers, so it is put back.
          <ul
            role="list"
            className="flex w-full list-none flex-col gap-2 text-base leading-7 text-ink"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            {item.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        ) : null}
      </header>

      {/* Two-up only from lg: below that MarketingPage caps this column at
       * 640px, which would leave each image about 300px wide. */}
      <ul
        className={`grid w-full grid-cols-1 gap-8 ${multiple ? "lg:grid-cols-2" : ""}`}
      >
        {item.images.map((image, index) => {
          // A portrait image at full column width would run to well over a
          // screen tall. Cap its height, which narrows it, and center it on the
          // panel; landscape images never reach the cap and stay full width.
          // `bare` opts out of all of it: no panel, no cap.
          const bare = image.bare === true;
          const portrait = !bare && image.height / image.width > PORTRAIT_RATIO;
          const maxWidth = Math.round(
            (MAX_IMAGE_HEIGHT * image.width) / image.height,
          );

          return (
            <li
              key={`${image.src}-${index}`}
              // A rule between stacked sub-projects; side by side they sit in
              // their own columns and need none.
              className={
                index > 0 && !multiple ? "border-t border-rule pt-8" : ""
              }
            >
              <figure className="flex flex-col gap-2">
                {image.heading ? (
                  <h4
                    className="mb-1 font-bold text-lg leading-7 text-heading"
                    style={{ fontFeatureSettings: '"liga" 0' }}
                  >
                    {image.heading}
                  </h4>
                ) : null}
                {image.heading && image.caption ? (
                  <p
                    className="mb-2 max-w-[640px] text-base leading-7 text-ink"
                    style={{ fontFeatureSettings: '"liga" 0' }}
                  >
                    {image.caption}
                  </p>
                ) : null}
                <div
                  className={
                    bare
                      ? ""
                      : `overflow-clip rounded-lg bg-mat ${
                          portrait
                            ? "flex justify-center px-4 py-6 sm:p-10"
                            : ""
                        }`
                  }
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="block h-auto w-full"
                    style={bare ? undefined : { maxWidth: `${maxWidth}px` }}
                    sizes={
                      multiple
                        ? "(min-width: 1024px) 480px, calc(100vw - 40px)"
                        : "(min-width: 1140px) 980px, calc(100vw - 40px)"
                    }
                    unoptimized
                  />
                </div>
                {image.caption && !image.heading ? (
                  <figcaption
                    className="text-sm leading-6 text-muted"
                    // A percentage margin is relative to the figure's width,
                    // which is the image's width.
                    style={
                      image.captionPull
                        ? { marginTop: `-${image.captionPull}%` }
                        : undefined
                    }
                  >
                    {image.caption}
                  </figcaption>
                ) : null}
              </figure>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
