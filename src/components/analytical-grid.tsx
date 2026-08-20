export function AnalyticalGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg className="absolute inset-0 h-full w-full text-zinc-400 opacity-[0.28] dark:text-zinc-500 dark:opacity-[0.2]">
        <defs>
          <pattern
            id="analytical-grid"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 56 0 L 0 0 0 56"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
            />
            <circle cx="0" cy="0" r="1" fill="currentColor" />
          </pattern>
          <radialGradient id="analytical-grid-fade" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="analytical-grid-mask">
            <rect width="100%" height="100%" fill="url(#analytical-grid-fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#analytical-grid)"
          mask="url(#analytical-grid-mask)"
        />
      </svg>
    </div>
  );
}
