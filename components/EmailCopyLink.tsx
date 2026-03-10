'use client';

import { useMemo, useState } from 'react';

interface EmailCopyLinkProps {
  href: string;
  label: string;
}

function extractEmail(href: string): string {
  if (!href.toLowerCase().startsWith('mailto:')) {
    return href;
  }

  const withoutScheme = href.slice(7);
  const [address] = withoutScheme.split('?');
  return decodeURIComponent(address || '').trim();
}

export default function EmailCopyLink({ href, label }: EmailCopyLinkProps) {
  const [copied, setCopied] = useState(false);
  const email = useMemo(() => extractEmail(href), [href]);

  const handleCopy = async () => {
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="inline-flex flex-col items-start gap-2 text-sm">
      <span className="text-slate-700 dark:text-slate-200">{label}</span>
      <div className="inline-flex items-center gap-3">
        <code className="rounded bg-blue-50 px-2 py-1 text-sandpiper-blue dark:bg-slate-800 dark:text-blue-300">
          {email}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded border border-blue-200 px-2.5 py-1 text-xs font-semibold text-sandpiper-blue transition-colors hover:bg-blue-50 dark:border-slate-600 dark:text-blue-300 dark:hover:bg-slate-800"
          aria-label="Copy email address"
        >
          {copied ? 'Copied' : 'Copy email'}
        </button>
      </div>
    </div>
  );
}
