'use client';

import { useState } from 'react';
import { getToken } from 'firebase/app-check';
import { appCheck } from '@/lib/firebase';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    childName: '',
    childGrade: '',
    childSchool: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    let appCheckToken: string | undefined;
    try {
      if (appCheck) {
        const result = await getToken(appCheck, false);
        appCheckToken = result.token;
      }
    } catch {
      // In development the debug token flow may fail silently; continue without it.
    }

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (appCheckToken) headers['X-Firebase-AppCheck'] = appCheckToken;

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers,
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '', childName: '', childGrade: '', childSchool: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
        <p className="font-semibold">Message sent!</p>
        <p className="mt-1 text-sm">Thank you for reaching out. Our Parent Ambassadors will get back to you soon.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm underline hover:no-underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Required fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Your name <span className="text-red-500">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-sandpiper-blue focus:outline-none focus:ring-1 focus:ring-sandpiper-blue dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Your email <span className="text-red-500">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-sandpiper-blue focus:outline-none focus:ring-1 focus:ring-sandpiper-blue dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            placeholder="jane@example.com"
          />
        </div>
      </div>

      {/* Optional child info */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="cf-childName" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Child&apos;s name <span className="text-slate-400 text-xs">(optional)</span>
          </label>
          <input
            id="cf-childName"
            name="childName"
            type="text"
            value={form.childName}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-sandpiper-blue focus:outline-none focus:ring-1 focus:ring-sandpiper-blue dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            placeholder="Alex"
          />
        </div>
        <div>
          <label htmlFor="cf-childGrade" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Grade <span className="text-slate-400 text-xs">(optional)</span>
          </label>
          <input
            id="cf-childGrade"
            name="childGrade"
            type="text"
            value={form.childGrade}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-sandpiper-blue focus:outline-none focus:ring-1 focus:ring-sandpiper-blue dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            placeholder="e.g. 5th, 6th"
          />
        </div>
        <div>
          <label htmlFor="cf-childSchool" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Current school <span className="text-slate-400 text-xs">(optional)</span>
          </label>
          <input
            id="cf-childSchool"
            name="childSchool"
            type="text"
            value={form.childSchool}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-sandpiper-blue focus:outline-none focus:ring-1 focus:ring-sandpiper-blue dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            placeholder="e.g. Sandpiper Elementary"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-sandpiper-blue focus:outline-none focus:ring-1 focus:ring-sandpiper-blue dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          placeholder="What would you like to know?"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded-md bg-sandpiper-blue px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
