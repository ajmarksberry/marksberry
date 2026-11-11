type IconProps = {
  className?: string;
};

/** Three heavy bars (3 thick in a 24 box), so the menu button holds its own beside extra-bold type. */
export function MenuIcon({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="2.5"
        y="4.5"
        width="19"
        height="3"
        rx="1.5"
        fill="currentColor"
      />
      <rect
        x="2.5"
        y="10.5"
        width="19"
        height="3"
        rx="1.5"
        fill="currentColor"
      />
      <rect
        x="2.5"
        y="16.5"
        width="19"
        height="3"
        rx="1.5"
        fill="currentColor"
      />
    </svg>
  );
}

/** The close X, drawn as heavy as the menu bars. */
export function CloseIcon({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5.5 5.5L18.5 18.5M18.5 5.5L5.5 18.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M16.175 13H5C4.71667 13 4.47917 12.9042 4.2875 12.7125C4.09583 12.5208 4 12.2833 4 12C4 11.7167 4.09583 11.4792 4.2875 11.2875C4.47917 11.0958 4.71667 11 5 11H16.175L11.275 6.1C11.075 5.9 10.9792 5.66667 10.9875 5.4C10.9958 5.13333 11.1 4.9 11.3 4.7C11.5 4.51667 11.7333 4.42083 12 4.4125C12.2667 4.40417 12.5 4.5 12.7 4.7L19.3 11.3C19.4 11.4 19.4708 11.5083 19.5125 11.625C19.5542 11.7417 19.575 11.8667 19.575 12C19.575 12.1333 19.5542 12.2583 19.5125 12.375C19.4708 12.4917 19.4 12.6 19.3 12.7L12.7 19.3C12.5167 19.4833 12.2875 19.575 12.0125 19.575C11.7375 19.575 11.5 19.4833 11.3 19.3C11.1 19.1 11 18.8625 11 18.5875C11 18.3125 11.1 18.075 11.3 17.875L16.175 13Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ArrowUpIcon({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M16.175 13H5C4.71667 13 4.47917 12.9042 4.2875 12.7125C4.09583 12.5208 4 12.2833 4 12C4 11.7167 4.09583 11.4792 4.2875 11.2875C4.47917 11.0958 4.71667 11 5 11H16.175L11.275 6.1C11.075 5.9 10.9792 5.66667 10.9875 5.4C10.9958 5.13333 11.1 4.9 11.3 4.7C11.5 4.51667 11.7333 4.42083 12 4.4125C12.2667 4.40417 12.5 4.5 12.7 4.7L19.3 11.3C19.4 11.4 19.4708 11.5083 19.5125 11.625C19.5542 11.7417 19.575 11.8667 19.575 12C19.575 12.1333 19.5542 12.2583 19.5125 12.375C19.4708 12.4917 19.4 12.6 19.3 12.7L12.7 19.3C12.5167 19.4833 12.2875 19.575 12.0125 19.575C11.7375 19.575 11.5 19.4833 11.3 19.3C11.1 19.1 11 18.8625 11 18.5875C11 18.3125 11.1 18.075 11.3 17.875L16.175 13Z"
        fill="currentColor"
        transform="rotate(-90 12 12)"
      />
    </svg>
  );
}

export function DownloadIcon({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 3.5v11m0 0 4.5-4.5M12 14.5 7.5 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 16.5v2a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SunIcon({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function MoonIcon({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/**
 * The state of Minnesota as a solid silhouette, for the homepage location line.
 * The outline is the Census boundary (us-atlas, 10m) in an Albers projection,
 * simplified to about 100 points, fitted to a 24 x 24 box (19.5 wide, 22 tall).
 */
export function MinnesotaIcon({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.3 2.4L7.4 2.4L7.4 1.0L7.7 1.1L7.9 1.0L8.2 1.3L8.6 2.8L8.6 3.2L8.7 3.4L9.2 3.5L9.7 3.5L9.8 3.7L10.7 3.8L10.9 4.2L11.7 4.0L11.7 3.9L12.0 3.7L12.9 3.7L13.5 4.0L13.8 4.0L13.8 4.1L13.6 4.2L13.6 4.3L13.7 4.4L14.1 4.3L14.5 5.1L14.7 5.1L14.6 4.8L14.7 4.6L15.2 4.6L15.5 5.1L16.1 5.2L16.1 5.5L16.5 5.5L16.5 5.7L17.3 5.5L17.7 5.2L18.2 4.9L18.3 4.9L18.3 5.1L18.5 5.2L18.5 5.4L20.1 5.3L20.4 5.3L20.5 5.6L20.8 5.7L21.1 5.5L21.6 5.6L21.8 5.5L20.6 6.3L19.2 6.9L18.7 7.2L17.8 8.1L16.9 9.1L15.4 10.5L15.6 10.8L15.4 10.6L15.1 10.8L15.2 10.8L15.1 11.0L14.9 10.9L15.0 13.1L14.8 13.4L14.6 13.4L14.5 13.5L14.4 13.5L13.9 13.9L13.7 14.3L13.5 14.5L13.5 15.1L13.9 15.2L14.1 15.5L13.9 16.1L13.9 16.8L13.8 17.0L13.9 17.4L13.9 18.2L14.5 18.8L15.1 18.9L15.4 19.2L16.1 19.5L16.2 19.6L16.4 20.1L17.2 20.7L17.6 20.8L18.1 21.7L18.1 22.0L18.3 22.7L10.8 22.9L4.1 23.0L4.1 16.2L4.0 16.0L3.5 15.8L3.1 15.1L3.8 14.3L3.9 13.4L3.8 12.4L3.5 12.0L3.3 11.2L3.3 10.5L3.4 10.1L3.2 10.0L3.1 7.6L2.5 5.6L2.4 4.1L2.6 3.6Z"
        fill="currentColor"
      />
    </svg>
  );
}
