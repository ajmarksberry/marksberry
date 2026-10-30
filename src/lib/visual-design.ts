import type { ExpediaWorkItem } from "@/lib/expedia-work";

/**
 * Content for the "Visual design" page. Same shape, and the same renderer, as
 * the Expedia work page (see expedia-work.ts for what each field does). These
 * are single-image entries with a caption; `description` is left out.
 *
 * Images live in public/images/visual-design/, exported from the "other
 * designs" frame in the AJM Portfolio 2026 - 2027 Figma file (node 8110:3453).
 */
export const visualDesign: readonly ExpediaWorkItem[] = [
  {
    id: "security-workbench",
    title: "Security analytics workbench",
    images: [
      {
        src: "/images/visual-design/workbench.webp",
        alt: "A dark analytics workbench: a search bar and filters above an activity histogram, with a table of devices listing type, operating system, activity, and a notable-artifacts count",
        width: 2000,
        height: 1172,
        bare: true,
        captionPull: 3.4,
        caption:
          "A workbench for investigating the devices, domains, and activity on a network.",
      },
    ],
  },
  {
    id: "rockin-refuel",
    title: "Rockin’ Refuel",
    images: [
      {
        src: "/images/visual-design/rockin-refuel.webp",
        alt: "The Rockin’ Refuel homepage: a rotating banner of athletes and protein milk bottles, upcoming events, a product locator, and a featured team member",
        width: 1380,
        height: 2000,
        bare: true,
        captionPull: 4.2,
        caption:
          "Homepage for a protein milk brand, built around its athletes, events, and a product locator.",
      },
    ],
  },
  {
    id: "cowtown-skateboards",
    title: "Cowtown Skateboards",
    images: [
      {
        src: "/images/visual-design/cowtown.webp",
        alt: "The Cowtown Skateboards homepage: a bold navigation header, a skater hero photo, featured products, news and events, and store locations",
        width: 982,
        height: 2000,
        bare: true,
        caption:
          "Ecommerce homepage for a skate shop, with featured products, news and events, and store locations.",
      },
    ],
  },
  {
    id: "millennium-three",
    title: "Millennium Three snowboards",
    images: [
      {
        src: "/images/visual-design/m3-snowboards.webp",
        alt: "A Millennium Three product page for women’s snowboards: each board shown with its graphics, a short description, and a table of construction features",
        width: 790,
        height: 2000,
        bare: true,
        captionPull: 2.1,
        caption:
          "The women’s snowboard line, with each board’s graphics and construction features side by side.",
      },
    ],
  },
  {
    id: "revolution-parts",
    title: "Revolution Parts",
    stacked: true,
    images: [
      {
        src: "/images/visual-design/revolution-logo.webp",
        alt: "The Revolution Parts logo: the main logo at the top, with four smaller versions below, in black, black with a gray accent, white on black, and white on red",
        width: 1478,
        height: 860,
        bare: true,
        captionPull: 2.9,
        caption: "The Revolution Parts logo and its color variations.",
      },
    ],
  },
];
