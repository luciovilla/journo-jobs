type TopperProps = {
  lastFetched: string | null;
};

export const Topper = ({ lastFetched }: TopperProps) => {
  return (
    <section className="px-6 py-10 md:px-10 md:pt-20 max-w-237.5 mx-auto">
      <p className="text-xs font-medium uppercase text-(--brand)">
        Updated daily
      </p>
      <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
        Journalism Jobs
      </h1>
      {lastFetched && (
        <p className="mt-2 text-sm text-(--muted)">
          Last updated {lastFetched}
        </p>
      )}
      <p className="mt-5 text-base text-(--muted) md:text-lg ">
        Jobs from multiple sources in one place, with extra focus on DC,
        Maryland, Virginia and New York.
      </p>
    </section>
  );
};
