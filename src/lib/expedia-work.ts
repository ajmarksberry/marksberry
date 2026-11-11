/**
 * Content for the "Expedia work" page. Add, remove, or reorder entries here —
 * the page renders whatever this array holds, in order.
 *
 * Each entry is one piece of work: a title, a description, and one or more
 * images, each with its own caption. One image renders full width; two or more
 * render two-up on desktop.
 *
 * Images live under public/. `width` and `height` are the file's pixel size
 * (they set the aspect ratio so nothing jumps while loading) — they are not a
 * display size. Check them with: `file public/images/<path>` or Preview ▸ Tools
 * ▸ Show Inspector.
 *
 * Entry layouts to copy from (the placeholders that used to live here):
 *
 * - Single image: a title, a description, and one image on a `bg-mat` panel with
 *   a caption. Landscape images fill the column; portrait ones are capped at
 *   1000px tall and centered on the panel. Add `bare: true` to drop the panel
 *   and cap (as the itinerary entries do).
 * - Two images: a title, a description, and two images side by side on
 *   desktop (one column below `lg`), each on its own panel with its own
 *   caption. Add `stacked: true` to keep them in one column instead.
 * - Also available: `points` for bullets under the description, and `heading`
 *   for a small heading above an individual image.
 */
export type ExpediaWorkImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional; leave it out for an image that needs no caption. */
  caption?: string;
  /** A small heading above the image. */
  heading?: string;
  /**
   * Pulls the caption up over empty transparent space at the bottom of the
   * image (a soft shadow's margin), as a percentage of the image's width.
   * Measure it as the transparent rows under the image divided by its width.
   */
  captionPull?: number;
  /**
   * Show the image straight on the page: no panel behind it, and no cap on how
   * tall it can get. It fills the column (up to the page's own max width). For
   * images that carry their own backdrop or are meant to be read at size.
   */
  bare?: boolean;
};

export type ExpediaWorkItem = {
  id: string;
  title: string;
  /** A sentence or two of framing. Put the detail in `points`. */
  description?: string;
  /** Optional bullets, shown under the description. */
  points?: readonly string[];
  /** Keep the images in one column, even with several. Default is two-up on desktop. */
  stacked?: boolean;
  images: readonly ExpediaWorkImage[];
};

export const expediaWork: readonly ExpediaWorkItem[] = [
  {
    id: "checkout",
    title: "Checkout",
    stacked: true,
    images: [
      {
        src: "/images/expedia-work/checkout.webp",
        alt: "The Expedia TAAP checkout, Finish booking your trip: three desktop screens stepping through traveler information, payment, and review, with a price summary on the right",
        width: 1800,
        height: 2506,
        bare: true,
        captionPull: 2,
        caption: "Sprint explorations.",
      },
    ],
  },
  {
    id: "placeholder-one",
    title: "Expedia itinerary redesign",
    description:
      "A redesign of the booked itinerary pages for flights and packages.",
    points: [
      "The original flight page was one long scroll of details and fine print.",
      "Both layouts lead with the trip name, traveler, and itinerary number.",
      "Flight actions sit beside the flight they apply to.",
      "Packages get an overview of everything booked, with a tab for each part.",
      "Policies and support move into tabs, and mobile follows the same structure.",
    ],
    stacked: true,
    images: [
      {
        heading: "Flight itinerary",
        src: "/images/expedia-work/itinerary-redesign.webp",
        alt: "The Expedia TAAP itinerary page redesigned: the original page grayed out behind, the new desktop layout in front, and the new mobile screen at the lower right",
        width: 1800,
        height: 3150,
        bare: true,
      },
      {
        heading: "Package itinerary",
        src: "/images/expedia-work/package-itinerary.webp",
        alt: "The package itinerary page for an NYC Getaway trip: a desktop overview of the hotel, flight, car, and golf lessons in the package, the flight tab with booking details, and the mobile version of the overview",
        width: 1800,
        height: 2289,
        bare: true,
        captionPull: 2.6,
      },
    ],
  },
  {
    id: "placeholder-five",
    title: "Features for travel advisors",
    description:
      "A range of features and functionality for travel advisors, from merging itineraries on the Trips page to making changes after booking.",
    stacked: true,
    images: [
      {
        heading: "Change your stay",
        src: "/images/expedia-work/reservation-changes.webp",
        alt: "Mobile screens for changing a hotel reservation: the booking details for a Las Vegas stay, then the change-your-stay, change-your-date, and change-your-room steps",
        width: 1800,
        height: 3494,
        bare: true,
        captionPull: 1.9,
        caption: "Make changes to an itinerary.",
      },
      {
        heading: "Multi-LOB quote",
        src: "/images/expedia-work/quote-multiple.webp",
        alt: "The Expedia TAAP quote builder: a quote page with airport transfers and hotels, a send-to-traveler view with the agency's branding, and a mobile panel listing flights, transfers, cars, hotels, and activities by day",
        width: 1800,
        height: 2567,
        bare: true,
        captionPull: 2.5,
        caption:
          "Quote flights, hotels, cars, transfers, and activities together in one quote.",
      },
    ],
  },
];
