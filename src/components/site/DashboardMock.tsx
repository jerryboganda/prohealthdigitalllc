// Small self-contained healthcare UI mockups used in the Featured Projects grid.
// Each variant is pure SVG/HTML so no stock imagery is needed.

interface Props {
  variant: "clinic" | "education" | "commerce";
}

export function DashboardMock({ variant }: Props) {
  if (variant === "clinic") {
    return (
      <div className="aspect-16/11 w-full bg-secondary rounded-lg overflow-hidden border border-hairline">
        <div className="h-full flex">
          <div className="w-16 bg-navy flex flex-col items-center py-4 gap-3">
            <span className="h-6 w-6 rounded bg-teal" />
            <span className="h-1 w-6 bg-white/20 rounded" />
            <span className="h-1 w-6 bg-white/20 rounded" />
            <span className="h-1 w-6 bg-white/20 rounded" />
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 rounded bg-navy/20" />
              <div className="h-3 w-16 rounded bg-royal/30" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-hairline rounded p-2">
                  <div className="h-1.5 w-8 rounded bg-navy/20" />
                  <div className="mt-1.5 h-4 w-12 rounded bg-navy/70" />
                </div>
              ))}
            </div>
            <svg viewBox="0 0 200 60" className="mt-3 w-full h-16">
              <path
                d="M0 40 L30 30 L60 35 L90 15 L120 25 L150 10 L180 20 L200 15"
                fill="none"
                stroke="var(--royal)"
                strokeWidth="2"
              />
              <path
                d="M0 40 L30 30 L60 35 L90 15 L120 25 L150 10 L180 20 L200 15 L200 60 L0 60Z"
                fill="var(--royal)"
                fillOpacity="0.1"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
  if (variant === "education") {
    return (
      <div className="aspect-16/11 w-full bg-navy rounded-lg overflow-hidden p-5">
        <div className="text-[9px] uppercase tracking-[0.2em] text-teal">Course platform</div>
        <div className="mt-2 h-3 w-40 rounded bg-white/80" />
        <div className="mt-1 h-2 w-28 rounded bg-white/30" />
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white/8 border border-white/10 rounded p-2">
              <div className="h-8 rounded bg-linear-to-br from-teal/40 to-royal/40" />
              <div className="mt-2 h-1.5 w-16 rounded bg-white/60" />
              <div className="mt-1 h-1 w-10 rounded bg-white/25" />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-2/3 bg-teal" />
          </div>
          <span className="text-[9px] text-teal">64%</span>
        </div>
      </div>
    );
  }
  return (
    <div className="aspect-16/11 w-full bg-white rounded-lg overflow-hidden border border-hairline p-5">
      <div className="flex items-center justify-between">
        <div className="text-[9px] uppercase tracking-[0.2em] text-royal">
          E-commerce · Storefront
        </div>
        <div className="h-4 w-10 rounded bg-teal/20 text-teal grid place-items-center text-[8px] font-semibold">
          LIVE
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded border border-hairline overflow-hidden">
            <div className="aspect-square bg-linear-to-br from-secondary to-white" />
            <div className="p-1.5">
              <div className="h-1.5 w-12 rounded bg-navy/70" />
              <div className="mt-1 h-1.5 w-8 rounded bg-royal" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded bg-secondary px-2.5 py-2">
        <div>
          <div className="h-1.5 w-14 rounded bg-navy/50" />
          <div className="mt-1 h-2.5 w-20 rounded bg-navy" />
        </div>
        <div className="h-6 w-16 rounded bg-navy text-white grid place-items-center text-[9px] font-medium">
          Checkout
        </div>
      </div>
    </div>
  );
}
