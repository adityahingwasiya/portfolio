type SectionHeadingProps = {
  index: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  index,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-3 font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">
        {index}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-300">
          {description}
        </p>
      ) : null}
    </div>
  );
}
