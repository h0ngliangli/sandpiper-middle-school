'use client';
import { X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// ─── Edit this to update the breaking news ───────────────────────────────────
const BREAKING_NEWS = {
  id: 'stem-fair-2026',
  text: 'Congratulations to Sandpiper Middle students at the 2026 San Mateo County STEM Fair!',
  link: '#news',
};
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = `breaking-news-dismissed-${BREAKING_NEWS.id}`;

export default function BreakingNewsBanner() {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  // Set --banner-h to the actual rendered height so Navbar and BannerSpacer stay in sync.
  useEffect(() => {
    if (!visible) return;

    const update = () => {
      const h = bannerRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty('--banner-h', `${h}px`);
    };

    update();
    const ro = new ResizeObserver(update);
    if (bannerRef.current) ro.observe(bannerRef.current);
    return () => ro.disconnect();
  }, [visible]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
    document.documentElement.style.setProperty('--banner-h', '0px');
  };

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      className="fixed left-1/2 z-[60] flex w-full max-w-6xl -translate-x-1/2 items-center
        bg-sandpiper-blue shadow-md"
      style={{ top: 0 }}
    >
      {/* NEWS badge */}
      <div
        className="flex h-full shrink-0 items-center bg-sandpiper-gold px-3 py-2 text-sandpiper-blue"
      >
        <span className="text-[10px] font-black tracking-widest italic">BREAKING NEWS</span>
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1 px-4 py-2">
        <p className="text-xs font-medium text-white lg:text-sm">
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
  );
}
