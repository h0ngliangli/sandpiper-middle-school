'use client';
import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface Props {
  href: string;
  label: string;
  icon?: string;
  title: string;
  confirmMessage: string;
}

export default function CTAConfirmButton({ href, label, icon, title, confirmMessage }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cta-hint inline-flex items-center text-sandpiper-blue dark:text-blue-400 font-bold hover:text-blue-800 dark:hover:text-blue-300 transition-colors group"
      >
        {label}
        {icon === 'WhatsApp' && <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-midnight dark:text-white">{title}</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">{confirmMessage}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-sandpiper-blue text-white hover:bg-blue-900 transition-colors"
              >
                {label}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
