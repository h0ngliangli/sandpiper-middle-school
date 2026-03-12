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
  { from: 107, to:  73, color: '#eab308' },
  { from:  71, to:  37, color: '#22c55e' },
  { from:  35, to:   1, color: '#3b82f6' },
];

function GaugeCard({ subject, points }: { subject: string; points: string }) {
  const cx = 130, cy = 125, r = 96, sw = 20;
  const needleAngle = 18;
  // Unit vectors along and perpendicular to needle (SVG screen coords)
  const rad = (needleAngle * Math.PI) / 180;
  const ndx = Math.cos(rad), ndy = -Math.sin(rad);
  const pdx = -ndy, pdy = ndx;
  // Needle line ends before the arrowhead base
  const needleLineEnd = pt(cx, cy, r - sw / 2 - 20, needleAngle);
  // Arrowhead: tip just inside arc, base 12px behind, wings ±5px perpendicular
  const arrowTip = pt(cx, cy, r - sw / 2 - 4, needleAngle);
  const arrowW1 = { x: arrowTip.x - 12 * ndx + 5 * pdx, y: arrowTip.y - 12 * ndy + 5 * pdy };
  const arrowW2 = { x: arrowTip.x - 12 * ndx - 5 * pdx, y: arrowTip.y - 12 * ndy - 5 * pdy };

  return (
    <div id="academics" className="flex-1 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
      {/* Card header */}
      <div className="bg-sandpiper-blue flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-white/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-sm bg-sandpiper-gold" />
          </div>
          <span className="text-white font-extrabold text-xs uppercase tracking-widest">{subject}</span>
        </div>
        <span className="bg-sandpiper-gold text-midnight text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Highest
        </span>
      </div>

      {/* Gauge SVG */}
      <svg viewBox="15 18 230 118" className="max-w-48 px-2 mx-auto mt-5">
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
        <line x1={cx} y1={cy} x2={needleLineEnd.x.toFixed(2)} y2={needleLineEnd.y.toFixed(2)}
          stroke="#0f172a" strokeWidth={3} strokeLinecap="round" />
        <polygon
          points={`${arrowTip.x.toFixed(2)},${arrowTip.y.toFixed(2)} ${arrowW1.x.toFixed(2)},${arrowW1.y.toFixed(2)} ${arrowW2.x.toFixed(2)},${arrowW2.y.toFixed(2)}`}
          fill="#0f172a"
        />
        <circle cx={cx} cy={cy} r={8} fill="#0f172a" />
        <circle cx={cx} cy={cy} r={4} fill="white" />
      </svg>

      {/* Level label */}
      <div className="text-center pb-3 px-5">
        <div className="text-base font-extrabold text-sandpiper-blue dark:text-sandpiper-gold tracking-wide">BLUE</div>
        <div className="text-xs mt-0.5 text-slate-400 dark:text-slate-500">Highest performance level in CA</div>
      </div>

      {/* Bottom stat bar */}
      <div className="mx-4 mb-4 bg-green-50 rounded-xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wide text-slate-700">Above Standard</span>
        </div>
        <span className="text-sandpiper-blue font-extrabold text-sm">{points} pts</span>
      </div>
    </div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────
const stats = [
  { value: '+60.2', label: 'Points Above Standard', subject: 'English Language Arts' },
  { value: '+60',   label: 'Points Above Standard', subject: 'Mathematics' },
];

const AcademicPerformance: React.FC = () => {
  return (
    <section className="bg-slate-100 dark:bg-slate-900 max-w-6xl mx-auto">
      <div className="py-10 px-6 lg:px-12">
        <div className="text-xs font-bold tracking-widest uppercase text-sandpiper-gold mb-3 block">
          Student Performance
        </div>

        {/* Top row: heading + summary stats */}
        <div className="flex flex-col lg:flex-row mb-10 items-start">
          {/* Left: heading */}
          <div className="flex-1">
            <h2 className="section-title uppercase mb-4">
              Academic Excellence,<br/>
              <span className="text-sandpiper-gold">By the Numbers</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
              Sandpiper students consistently perform{' '}
              <strong className="text-sandpiper-blue dark:text-white font-semibold">above state standards</strong>{' '}
              in both English Language Arts and Mathematics — proof that design thinking
              and academic rigor go hand in hand.
            </p>
          </div>

          {/* Right: summary stat cards */}
          <div className="flex flex-row gap-4 shrink-0 m-3">
            {stats.map(({ value, label, subject }) => (
              <div key={subject}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-5 min-w-[160px] text-center shadow-sm">
                <div className="font-extrabold text-sandpiper-blue dark:text-blue-400 leading-none mb-2">
                  {value}
                </div>
                <div className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 leading-snug">
                  {label}
                  <br />
                  {subject}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gauge cards */}
        <div className="flex flex-col sm:flex-row gap-5">
          <GaugeCard subject="English Language Arts" points="+60.2" />
          <GaugeCard subject="Mathematics"           points="+60" />
        </div>

        {/* Source footnote */}
        <p className="text-center mt-6 text-xs text-slate-400 dark:text-slate-500 italic">
          Source:{' '}
          <a href="https://www.caschooldashboard.org/reports/41688666114771/2025"
            target="_blank" rel="noopener noreferrer"
            className="underline text-midnight dark:text-slate-300">
            California School Dashboard
          </a>
          {' '}· Data reflects most recent reporting period.
        </p>

      </div>
    </section>
  );
};

export default AcademicPerformance;
