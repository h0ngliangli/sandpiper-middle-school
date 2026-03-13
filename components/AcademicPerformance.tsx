import React from 'react';

// ── SVG Gauge helpers ──────────────────────────────────────────────────────
function pt(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function arc(cx: number, cy: number, r: number, from: number, to: number) {
  const s = pt(cx, cy, r, from);
  const e = pt(cx, cy, r, to);
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 0 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}

// 5 segments across 180° (each 36°), 2° gap between
const SEGMENTS = [
  { from: 179, to: 145, color: '#ef4444' },
  { from: 143, to: 109, color: '#f97316' },
  { from: 107, to: 73, color: '#eab308' },
  { from: 71, to: 37, color: '#22c55e' },
  { from: 35, to: 1, color: '#3b82f6' },
];

function GaugeCard({ subject, points }: { subject: string; points: string }) {
  const cx = 130,
    cy = 125,
    r = 96,
    sw = 20;
  const needleAngle = 18;
  // Unit vectors along and perpendicular to needle (SVG screen coords)
  const rad = (needleAngle * Math.PI) / 180;
  const ndx = Math.cos(rad),
    ndy = -Math.sin(rad);
  const pdx = -ndy,
    pdy = ndx;
  // Needle line ends before the arrowhead base
  const needleLineEnd = pt(cx, cy, r - sw / 2 - 20, needleAngle);
  // Arrowhead: tip just inside arc, base 12px behind, wings ±5px perpendicular
  const arrowTip = pt(cx, cy, r - sw / 2 - 4, needleAngle);
  const arrowW1 = {
    x: arrowTip.x - 12 * ndx + 5 * pdx,
    y: arrowTip.y - 12 * ndy + 5 * pdy,
  };
  const arrowW2 = {
    x: arrowTip.x - 12 * ndx - 5 * pdx,
    y: arrowTip.y - 12 * ndy - 5 * pdy,
  };

  return (
    <div className="max-w-md rounded-2xl overflow-hidden bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Card header */}
      <div className="flex items-center justify-between bg-sandpiper-blue px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-white/20">
            <div className="h-2 w-2 rounded-sm bg-sandpiper-gold" />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-white">
            {subject}
          </span>
        </div>
        <span className="text-xs font-bold uppercase italic text-sandpiper-gold">
          Highest
        </span>
      </div>

      {/* Gauge SVG */}
      <svg viewBox="15 18 230 118" className="mx-auto mt-5 max-w-48 px-2">
        {SEGMENTS.map((seg) => (
          <path
            key={seg.from}
            d={arc(cx, cy, r, seg.from, seg.to)}
            stroke={seg.color}
            strokeWidth={sw}
            fill="none"
            strokeLinecap="butt"
          />
        ))}
        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={needleLineEnd.x.toFixed(2)}
          y2={needleLineEnd.y.toFixed(2)}
          stroke="#0f172a"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <polygon
          points={`${arrowTip.x.toFixed(2)},${arrowTip.y.toFixed(2)} ${arrowW1.x.toFixed(2)},${arrowW1.y.toFixed(2)} ${arrowW2.x.toFixed(2)},${arrowW2.y.toFixed(2)}`}
          fill="#0f172a"
        />
        <circle cx={cx} cy={cy} r={8} fill="#0f172a" />
        <circle cx={cx} cy={cy} r={4} fill="white" />
      </svg>

      {/* Level label */}
      <div className="px-5 pb-3 text-center">
        <div className="text-base font-extrabold tracking-wide text-sandpiper-blue dark:text-sandpiper-gold">
          BLUE
        </div>
        <div className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
          Highest performance level in CA
        </div>
      </div>

      {/* Bottom stat bar */}
      <div className="mx-4 mb-4 flex items-center justify-between rounded-xl bg-green-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
          <span className="text-xs font-bold uppercase tracking-wide text-slate-700">
            Above Standard
          </span>
        </div>
        <span className="text-sm font-extrabold text-sandpiper-blue">
          {points} pts
        </span>
      </div>
    </div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────
const stats = [
  {
    value: '+60.2',
    label: 'Points Above Standard',
    subject: 'English Language Arts',
  },
  { value: '+60', label: 'Points Above Standard', subject: 'Mathematics' },
];

const AcademicPerformance: React.FC = () => {
  return (
    <section
      id="academic-performance"
      className="bg-slate-100 dark:bg-slate-900"
    >
      <div className="px-6 py-10 lg:px-12">
        <div className="mb-3 block text-xs font-bold uppercase tracking-widest text-sandpiper-gold">
          Student Performance
        </div>

        {/* Top row: heading + summary stats */}
        <div className="mb-5 flex flex-col lg:items-center lg:flex-row lg:gap-5">
          {/* Left: heading */}
          <div>
            <h2 className="section-title mb-4 uppercase whitespace-nowrap">
              Academic Excellence,
              <br />
              <span className="text-sandpiper-gold">By the Numbers</span>
            </h2>
            <p className="max-w-lg leading-relaxed text-slate-500 dark:text-slate-400">
              Sandpiper students consistently perform{' '}
              <strong className="font-semibold text-sandpiper-blue dark:text-white">
                above state standards
              </strong>{' '}
              in both English Language Arts and Mathematics — proof that design
              thinking and academic rigor go hand in hand.
            </p>
          </div>

          {/* Right: summary stat cards */}
          <div className="my-3 flex shrink-0 flex-row gap-4">
            {stats.map(({ value, label, subject }) => (
              <div
                key={subject}
                className="min-w-[160px] rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-2 font-extrabold leading-none text-sandpiper-blue dark:text-blue-400">
                  {value}
                </div>
                <div className="text-xs uppercase text-slate-500 dark:text-slate-400">
                  {label}
                  <br />
                  {subject}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gauge cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <GaugeCard subject="English Language Arts" points="+60.2" />
          <GaugeCard subject="Mathematics" points="+60" />
        </div>

        {/* Source footnote */}
        <p className="mt-6 text-center text-xs italic text-slate-400 dark:text-slate-500">
          Source:{' '}
          <a
            href="https://www.caschooldashboard.org/reports/41688666114771/2025"
            target="_blank"
            rel="noopener noreferrer"
            className="text-midnight underline dark:text-slate-300"
          >
            California School Dashboard
          </a>{' '}
          · Data reflects most recent reporting period.
        </p>
      </div>
    </section>
  );
};

export default AcademicPerformance;
