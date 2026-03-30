'use client';
import SectionTitle from './SectionTitle';
import { fetchEvents } from '@/lib/sheets';
import { SchoolEvent } from '@/types';
import { X, Calendar, Tag } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CATEGORY_COLORS: Record<string, string> = {
  Academic:
    'bg-blue-50 text-sandpiper-blue dark:bg-blue-900/30 dark:text-blue-300',
  Sports: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Community:
    'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Arts: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
};

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function filterUpcoming(all: SchoolEvent[]): SchoolEvent[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return all.filter((e) => {
    const expiration = new Date(e.expirationDate + 'T00:00:00');
    return expiration >= today;
  });
}

const EventCard: React.FC<{ event: SchoolEvent; onClick: () => void }> = ({
  event,
  onClick,
}) => {
  const categoryClass =
    CATEGORY_COLORS[event.category] ?? 'bg-slate-100 text-slate-600';
  return (
    <button
      onClick={onClick}
      className="group flex w-full cursor-pointer flex-col gap-4 rounded-2xl
        border border-slate-500 bg-white p-6 text-left shadow-sm transition-all
        duration-200 hover:-translate-y-0.5 hover:shadow-md
        dark:border-slate-600 dark:bg-slate-800"
    >
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-40 w-full rounded-xl object-cover"
        />
      )}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1
            text-xs font-bold tracking-wide ${categoryClass}`}
        >
          <Tag className="h-3 w-3" />
          {event.category}
        </span>
        <span
          className="inline-flex items-center gap-1 text-xs font-medium
            text-slate-400"
        >
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(event.eventDate)}
        </span>
      </div>
      <div>
        <h3
          className="mb-1 text-base font-extrabold text-midnight
            transition-colors group-hover:text-sandpiper-blue dark:text-white
            dark:group-hover:text-blue-400"
        >
          {event.title}
        </h3>
        <p
          className="line-clamp-3 text-sm leading-relaxed text-slate-500
            dark:text-slate-400"
        >
          {event.summary}
        </p>
      </div>
      <span
        className="mt-auto text-xs font-semibold text-sandpiper-blue
          dark:text-blue-300"
      >
        View details →
      </span>
    </button>
  );
};

const EventModal: React.FC<{ event: SchoolEvent; onClose: () => void }> = ({
  event,
  onClose,
}) => {
  const categoryClass =
    CATEGORY_COLORS[event.category] ?? 'bg-slate-100 text-slate-600';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-midnight/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative flex max-h-[90vh] w-full max-w-lg flex-col gap-5
          overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-800"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 transition-colors
            hover:text-slate-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-48 w-full rounded-xl object-cover"
          />
        )}

        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1
              text-xs font-bold tracking-wide ${categoryClass}`}
          >
            <Tag className="h-3 w-3" />
            {event.category}
          </span>
          <span
            className="inline-flex items-center gap-1 text-xs font-medium
              text-slate-400"
          >
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(event.eventDate)}
          </span>
        </div>

        <h2
          className="pr-6 text-xl font-extrabold leading-tight text-midnight
            dark:text-white"
        >
          {event.title}
        </h2>
        <div
          className="prose prose-sm prose-headings:text-midnight
            dark:prose-headings:text-white prose-a:text-sandpiper-blue
            prose-strong:text-slate-800 dark:prose-strong:text-slate-200
            max-w-none text-sm leading-relaxed text-slate-600
            dark:text-slate-300"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" />
              ),
            }}
          >
            {event.description}
          </ReactMarkdown>
        </div>

        <button
          onClick={onClose}
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5
            text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50
            dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const RecentNews: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<SchoolEvent | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<SchoolEvent[]>([]);

  useEffect(() => {
    fetchEvents()
      .then((all) => setUpcomingEvents(filterUpcoming(all)))
      .catch(console.error);
  }, []);

  if (upcomingEvents.length === 0) return null;

  return (
    <section id="news" className="section-p bg-light-2 flex flex-col gap-3">
      <SectionTitle small="What's Coming Up" title="NEWS & EVENTS" />
      <p className="section-text">
        Stay up to date with what&apos;s happening at Sandpiper. Click any event
        for full details.
      </p>
      <div className="lg:grid-cols-3q grid grid-cols-1 gap-3 sm:grid-cols-2">
        {upcomingEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      <h3 className="section-title text-lg">FEATURED HIGHLIGHTS</h3>

      <div
        className="flex flex-col gap-4 rounded-2xl border border-slate-500
          bg-white p-6 shadow-sm dark:border-slate-600 dark:bg-slate-800"
      >
        <h3 className="text-base font-extrabold text-midnight dark:text-white">
          Congratulations to Sandpiper Middle Students at the 2026 San Mateo
          STEM Fair
        </h3>
        <div className="section-text">
          <p>
            4 Sandpiper Middle School students just took home 1st and 2nd place
            awards at the 2026 San Mateo County STEM Fair, placing us #4 out of
            24 competing schools countywide.🏆
          </p>
          <ul className="list-inside list-disc">
            <li>
              Lyra Bloom &mdash; &ldquo;BinBuddy: AI Trash-Sorting Robot For
              Kids&rdquo; &mdash; Environmental: 1st Place
            </li>
            <li>
              Louis Guo &mdash; &ldquo;Affordable Rapid Prototyping&rdquo;
              &mdash; Physical Sciences: 2nd Place
            </li>
            <li>
              Andrew Park &mdash; &ldquo;Interactive 3D Sound Antenna for
              Real-Time Sound Localization and Visualization&rdquo; &mdash;
              Physical Sciences: 1st Place
            </li>
            <li>
              Christopher Lorilla &mdash; &ldquo;Can Public Market Sentiment
              Predict Stock Market Returns?&rdquo; &mdash;
              Mathematical/Computational: 2nd Place
            </li>
          </ul>
          <p>
            Our first-place winners have been invited to the{' '}
            <strong>California State Science and Engineering Fair</strong> and
            nominated for the
            <strong> Thermo Fisher Junior Innovators Challenge</strong>. Please
            join us in congratulating these amazing students!{' '}
            <a
              href="https://stemfair.net/results/2026/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sandpiper-blue underline
                hover:opacity-80 dark:text-blue-300"
            >
              See all 2026 STEM Fair Results here.
            </a>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-extrabold text-midnight dark:text-white">
          2026-2027 Middle School Information Night
        </h3>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 h-full w-full rounded-2xl shadow-md"
            src="https://www.youtube.com/embed/V9b1lj6JO1w?si=R9YumkvADugWeRGD"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default RecentNews;
