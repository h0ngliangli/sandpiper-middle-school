'use client';
import { Star, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// ─── Edit this to update the breaking news ───────────────────────────────────
const BREAKING_NEWS = {
  id: 'stem-fair-2026',
  text: 'Congratulations to Sandpiper Middle students at the 2026 San Mateo County STEM Fair!',
  link: '#news',
};
// ─────────────────────────────────────────────────────────────────────────────

const BANNER_H = 32; // px — keep in sync with BannerSpacer
const STORAGE_KEY = `breaking-news-dismissed-${BREAKING_NEWS.id}`;

export default function BreakingNewsBanner() {
  const [visible, setVisible] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
      document.documentElement.style.setProperty('--banner-h', `${BANNER_H}px`);
    }
  }, []);

  // Check if text overflows the track and enable scrolling if so.
  // Re-checks on resize.
  useEffect(() => {
    if (!visible) return;

    const check = () => {
      if (trackRef.current && textRef.current) {
        setShouldScroll(textRef.current.scrollWidth > trackRef.current.clientWidth);
      }
    };

    check();
    const ro = new ResizeObserver(check);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [visible]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
    document.documentElement.style.setProperty('--banner-h', '0px');
  };

  if (!visible) return null;

  return (
    <>
      {shouldScroll && (
        <style>{`
          @keyframes breaking-ticker {
            0%   { transform: translateX(110%); }
            100% { transform: translateX(-100%); }
          }
          .breaking-ticker-text {
            animation: breaking-ticker 30s linear infinite;
          }
          .breaking-ticker-track:hover .breaking-ticker-text {
            animation-play-state: paused;
          }
        `}</style>
      )}

      <div
        className="fixed left-1/2 z-[60] flex w-full max-w-6xl -translate-x-1/2 items-center
          overflow-hidden bg-sandpiper-blue shadow-md"
        style={{ top: 0, height: BANNER_H }}
      >
        {/* NEWS badge */}
        <div
          className="flex h-full shrink-0 items-center gap-1.5 bg-sandpiper-gold
            px-3 text-sandpiper-blue"
        >
          {/* <Star className="h-3 w-3 fill-current" /> */}
          <span className="text-[10px] font-black tracking-widest italic">BREAKING NEWS</span>
        </div>

        {/* Text + inline Read more */}
        <div
          ref={trackRef}
          className={`breaking-ticker-track min-w-0 flex-1 overflow-hidden px-4`}
        >
          <p
            ref={textRef}
            className={`breaking-ticker-text text-xs font-medium text-white lg:text-sm ${
              shouldScroll ? 'inline-block whitespace-nowrap' : 'truncate'
            }`}
          >
            {BREAKING_NEWS.text}{' '}
            <a
              href={BREAKING_NEWS.link}
              className="font-semibold text-sandpiper-gold underline-offset-2 hover:underline"
            >
              Read more →
            </a>
          </p>
        </div>

        {/* Close */}
        <div className="shrink-0 pr-3">
          <button
            onClick={dismiss}
            aria-label="Close breaking news"
            className="text-white/50 transition-colors hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
