// Abstract healthcare technology composition — pure SVG, no stock photography.
// Layered dashboard panels + EKG pulse + analytics ring.

export function HeroVisual() {
  return (
    <div className="relative aspect-5/6 lg:aspect-6/7 w-full lg:-translate-y-36">
      {/* Main dashboard card */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-140">
          {/* Analytics ring behind */}
          <svg
            viewBox="0 0 200 200"
            className="absolute -top-8 -right-8 h-40 w-40 lg:h-52 lg:w-52"
            aria-hidden
          >
            <circle
              cx="100"
              cy="100"
              r="86"
              fill="none"
              stroke="var(--hairline)"
              strokeWidth="1.5"
            />
            <circle
              cx="100"
              cy="100"
              r="86"
              fill="none"
              stroke="var(--royal)"
              strokeWidth="3"
              strokeDasharray="540"
              strokeDashoffset="180"
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />
            <text
              x="100"
              y="96"
              textAnchor="middle"
              className="fill-navy"
              fontSize="28"
              fontWeight="700"
              fontFamily="Manrope"
            >
              68%
            </text>
            <text
              x="100"
              y="118"
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize="9"
              letterSpacing="1.5"
              fontFamily="Inter"
            >
              CONVERSION
            </text>
          </svg>

          {/* Main card */}
          <div className="relative bg-white border border-hairline rounded-xl shadow-[0_30px_80px_-30px_rgba(10,29,61,0.25)] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-hairline">
              <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
              <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
              <span className="h-2.5 w-2.5 rounded-full bg-hairline" />
              <div className="ml-3 text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                Clinic · Dashboard
              </div>
              <span className="ml-auto inline-flex items-center gap-1.5 text-[10.5px] text-teal font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" /> Live
              </span>
            </div>

            <div className="p-5 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    Patient visits · 30d
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-display text-3xl lg:text-4xl">1,284</span>
                    <span className="text-[12px] font-medium text-teal">+18.4%</span>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end">
                  <div className="text-[11px] text-muted-foreground">Revenue</div>
                  <div className="font-display text-lg text-navy">$48,210</div>
                </div>
              </div>

              {/* EKG chart */}
              <svg viewBox="0 0 400 120" className="mt-5 w-full h-24 lg:h-28" aria-hidden>
                <defs>
                  <linearGradient id="hv-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--royal)" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="var(--royal)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[20, 40, 60, 80, 100].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2="400"
                    y1={y}
                    y2={y}
                    stroke="var(--hairline)"
                    strokeDasharray="2 4"
                  />
                ))}
                <path
                  d="M0 80 L40 78 L70 60 L95 62 L120 55 L145 42 L170 58 L190 20 L210 90 L235 45 L265 50 L295 32 L330 40 L365 25 L400 30 L400 120 L0 120 Z"
                  fill="url(#hv-fill)"
                />
                <path
                  className="ekg-line"
                  d="M0 80 L40 78 L70 60 L95 62 L120 55 L145 42 L170 58 L190 20 L210 90 L235 45 L265 50 L295 32 L330 40 L365 25 L400 30"
                  fill="none"
                  stroke="var(--royal)"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { l: "New patients", v: "312" },
                  { l: "Retention", v: "92%" },
                  { l: "NPS", v: "74" },
                ].map((s) => (
                  <div key={s.l} className="rounded-md bg-secondary p-3">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {s.l}
                    </div>
                    <div className="mt-1 font-display font-semibold text-navy text-lg">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating payment card */}
          <div className="absolute -bottom-6 -left-4 lg:-left-10 w-55 bg-white border border-hairline rounded-lg shadow-[0_20px_50px_-20px_rgba(10,29,61,0.3)] p-4 hidden sm:block">
            <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Payment received
            </div>
            <div className="mt-1.5 font-display font-semibold text-navy text-xl">$1,240.00</div>
            <div className="mt-3 h-1.5 rounded-full bg-secondary overflow-hidden">
              <div className="h-full w-[82%] bg-linear-to-r from-royal to-teal" />
            </div>
            <div className="mt-2 flex items-center justify-between text-[10.5px] text-muted-foreground">
              <span>Cleared</span>
              <span className="text-teal font-medium">Success</span>
            </div>
          </div>

          {/* Floating course card */}
          <div className="absolute lg:top-24 lg:-right-20 hidden lg:block w-45 bg-navy text-white rounded-lg p-4 shadow-[0_20px_50px_-20px_rgba(10,29,61,0.5)]">
            <div className="text-[10px] uppercase tracking-[0.16em] text-teal">Course · Live</div>
            <div className="mt-1 font-display font-semibold text-[15px] leading-tight">
              Advanced Clinical Ultrasound
            </div>
            <div className="mt-3 flex -space-x-1.5">
              {["#00B2A9", "#1B4ED8", "#7ABDFF", "#F3F6F9"].map((c) => (
                <span
                  key={c}
                  className="h-5 w-5 rounded-full border border-navy"
                  style={{ background: c }}
                />
              ))}
              <span className="ml-2 text-[11px] text-white/70">+248</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
