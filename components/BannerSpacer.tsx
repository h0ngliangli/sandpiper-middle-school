'use client';

// Pushes page content down when the breaking news banner is visible.
// Height matches BANNER_H in BreakingNewsBanner.tsx (44 px).
export default function BannerSpacer() {
  return <div style={{ height: 'var(--banner-h, 0px)' }} />;
}
