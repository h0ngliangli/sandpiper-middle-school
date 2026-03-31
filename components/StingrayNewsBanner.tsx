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

export default function StingrayNewsBanner() {
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
      className="fixed left-1/2 z-[60] flex w-full max-w-6xl -translate-x-1/2
        items-center bg-sandpiper-muted-blue shadow-md"
      style={{ top: 0 }}
    >
      {/* NEWS badge */}
      <div
        className="flex shrink-0 items-center self-stretch bg-sandpiper-gold
          px-2"
      >
        <span className="text-xs font-black tracking-widest text-sandpiper-blue">
          STINGRAY NEWS
        </span>
      </div>

      {/* Text */}
      <div
        className="min-w-0 flex-1 px-4 py-2 text-xs font-medium
          lg:text-sm"
      >
        <span className="text-white mr-2">{BREAKING_NEWS.text}</span>
        <a
          href={BREAKING_NEWS.link}
          className="whitespace-nowrap font-semibold text-sandpiper-gold underline 
            underline-offset-2"
        >
          Read more
        </a>
      </div>

      {/* Close */}
      <div className="shrink-0 self-stretch border-l border-white/20">
        <button
          onClick={dismiss}
          aria-label="Close breaking news"
          className="flex h-full items-center px-3 text-white/50
            transition-colors hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
