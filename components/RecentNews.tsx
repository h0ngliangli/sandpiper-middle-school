'use client';
import React, { useState, useEffect } from 'react';
import { X, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fetchEvents } from '@/lib/sheets';
import { SchoolEvent } from '@/types';

const CATEGORY_COLORS: Record<string, string> = {
  Academic:  'bg-blue-50 text-sandpiper-blue dark:bg-blue-900/30 dark:text-blue-300',
  Sports:    'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Community: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Arts:      'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
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

const EventCard: React.FC<{ event: SchoolEvent; onClick: () => void }> = ({ event, onClick }) => {
  const categoryClass = CATEGORY_COLORS[event.category] ?? 'bg-slate-100 text-slate-600';
  return (
    <button
      onClick={onClick}
      className="group text-left bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-500 dark:border-slate-600 p-6 flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer w-full"
    >
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-40 object-cover rounded-xl"
        />
      )}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${categoryClass}`}>
          <Tag className="h-3 w-3" />
          {event.category}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(event.eventDate)}
        </span>
      </div>
      <div>
        <h3 className="text-base font-extrabold text-midnight dark:text-white mb-1 group-hover:text-sandpiper-blue dark:group-hover:text-blue-400 transition-colors">
          {event.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">{event.summary}</p>
      </div>
      <span className="text-xs font-semibold text-sandpiper-blue mt-auto dark:text-blue-300">
        View details →
      </span>
    </button>
  );
};

const EventModal: React.FC<{ event: SchoolEvent; onClose: () => void }> = ({ event, onClose }) => {
  const categoryClass = CATEGORY_COLORS[event.category] ?? 'bg-slate-100 text-slate-600';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-midnight/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-48 object-cover rounded-xl"
          />
        )}

        <div className="flex items-center gap-3 flex-wrap">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${categoryClass}`}>
            <Tag className="h-3 w-3" />
            {event.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(event.eventDate)}
          </span>
        </div>

        <h2 className="text-xl font-extrabold text-midnight dark:text-white leading-tight pr-6">{event.title}</h2>
        <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed prose prose-sm max-w-none prose-headings:text-midnight dark:prose-headings:text-white prose-a:text-sandpiper-blue prose-strong:text-slate-800 dark:prose-strong:text-slate-200">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />
            }}
          >
            {event.description}
          </ReactMarkdown>
        </div>

        <button
          onClick={onClose}
          className="mt-2 w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm"
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
    fetchEvents().then((all) => setUpcomingEvents(filterUpcoming(all))).catch(console.error);
  }, []);

  if (upcomingEvents.length === 0) return null;

  return (
    <section id="news" className="bg-slate-100 dark:bg-slate-700 max-w-6xl mx-auto py-10 px-6 lg:px-12">
      <div className="mb-6">
        <div className="text-xs font-bold tracking-widest uppercase text-sandpiper-gold mb-3 block">
          What&apos;s Coming Up
        </div>
        <h2 className="section-title uppercase tracking-tight leading-tight">
          NEWS & EVENTS
        </h2>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
          Stay up to date with what&apos;s happening at Sandpiper. Click any event for full details.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.map((event) => (
          <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
        ))}
      </div>

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}

      {/* Special Event Section */}
      <div className="mt-6">
        <h3 className="section-title text-lg uppercase tracking-tight leading-tight mb-4">
          FEATURED HIGHLIGHTS
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* YouTube Video */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-extrabold text-midnight dark:text-white">2026-2027 Middle School Information Night</h3>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full rounded-2xl shadow-md"
                src="https://www.youtube.com/embed/V9b1lj6JO1w?si=R9YumkvADugWeRGD"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentNews;
