type IconProps = {
  className?: string;
};

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
      <path
        d="M4 18C3.71667 18 3.47917 17.9042 3.2875 17.7125C3.09583 17.5208 3 17.2833 3 17C3 16.7167 3.09583 16.4792 3.2875 16.2875C3.47917 16.0958 3.71667 16 4 16H20C20.2833 16 20.5208 16.0958 20.7125 16.2875C20.9042 16.4792 21 16.7167 21 17C21 17.2833 20.9042 17.5208 20.7125 17.7125C20.5208 17.9042 20.2833 18 20 18H4ZM4 13C3.71667 13 3.47917 12.9042 3.2875 12.7125C3.09583 12.5208 3 12.2833 3 12C3 11.7167 3.09583 11.4792 3.2875 11.2875C3.47917 11.0958 3.71667 11 4 11H20C20.2833 11 20.5208 11.0958 20.7125 11.2875C20.9042 11.4792 21 11.7167 21 12C21 12.2833 20.9042 12.5208 20.7125 12.7125C20.5208 12.9042 20.2833 13 20 13H4ZM4 8C3.71667 8 3.47917 7.90417 3.2875 7.7125C3.09583 7.52083 3 7.28333 3 7C3 6.71667 3.09583 6.47917 3.2875 6.2875C3.47917 6.09583 3.71667 6 4 6H20C20.2833 6 20.5208 6.09583 20.7125 6.2875C20.9042 6.47917 21 6.71667 21 7C21 7.28333 20.9042 7.52083 20.7125 7.7125C20.5208 7.90417 20.2833 8 20 8H4Z"
        fill="currentColor"
      />
    </svg>
  );
}

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
        d="M12 13.4L7.1 18.3C6.91667 18.4833 6.68333 18.575 6.4 18.575C6.11667 18.575 5.88333 18.4833 5.7 18.3C5.51667 18.1167 5.425 17.8833 5.425 17.6C5.425 17.3167 5.51667 17.0833 5.7 16.9L10.6 12L5.7 7.1C5.51667 6.91667 5.425 6.68333 5.425 6.4C5.425 6.11667 5.51667 5.88333 5.7 5.7C5.88333 5.51667 6.11667 5.425 6.4 5.425C6.68333 5.425 6.91667 5.51667 7.1 5.7L12 10.6L16.9 5.7C17.0833 5.51667 17.3167 5.425 17.6 5.425C17.8833 5.425 18.1167 5.51667 18.3 5.7C18.4833 5.88333 18.575 6.11667 18.575 6.4C18.575 6.68333 18.4833 6.91667 18.3 7.1L13.4 12L18.3 16.9C18.4833 17.0833 18.575 17.3167 18.575 17.6C18.575 17.8833 18.4833 18.1167 18.3 18.3C18.1167 18.4833 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4833 16.9 18.3L12 13.4Z"
        fill="currentColor"
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

/** A solid map pin, heavy enough to sit beside extra-bold type. */
export function LocationIcon({ className }: IconProps) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
        fill="currentColor"
      />
    </svg>
  );
}
