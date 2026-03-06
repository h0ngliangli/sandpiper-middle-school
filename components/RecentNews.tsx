'use client';
import React, { useState } from 'react';
import { X, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { events, type SchoolEvent } from '@/data/events';

const CATEGORY_COLORS: Record<string, string> = {
  Academic:  'bg-blue-50 text-sandpiper-blue',
  Sports:    'bg-green-50 text-green-700',
  Community: 'bg-amber-50 text-amber-700',
  Arts:      'bg-purple-50 text-purple-700',
};

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getUpcomingEvents(): SchoolEvent[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return events.filter((e) => {
    const expiration = new Date(e.expirationDate + 'T00:00:00');
    return expiration >= today;
  });
}

const EventCard: React.FC<{ event: SchoolEvent; onClick: () => void }> = ({ event, onClick }) => {
  const categoryClass = CATEGORY_COLORS[event.category] ?? 'bg-slate-100 text-slate-600';
  return (
    <button
      onClick={onClick}
      className="group text-left bg-white rounded-2xl shadow-sm border border-slate-500 p-6 flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer w-full"
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
        <h3 className="text-base font-extrabold text-midnight mb-1 group-hover:text-sandpiper-blue transition-colors">
          {event.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{event.summary}</p>
      </div>
      <span className="text-xs font-semibold text-sandpiper-blue mt-auto">
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
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
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

        <h2 className="text-xl font-extrabold text-midnight leading-tight pr-6">{event.title}</h2>
        <div className="text-sm text-slate-600 leading-relaxed prose prose-sm max-w-none prose-headings:text-midnight prose-a:text-sandpiper-blue prose-strong:text-slate-800">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{event.description}</ReactMarkdown>
        </div>

        <button
          onClick={onClose}
          className="mt-2 w-full py-2.5 px-4 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const RecentNews: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<SchoolEvent | null>(null);
  const upcomingEvents = getUpcomingEvents();

  if (upcomingEvents.length === 0) return null;

  return (
    <section id="recent-news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-sandpiper-blue uppercase bg-blue-50 rounded-full">
            What&apos;s Coming Up
          </div>
          <h2 className="section-title">
            Recent News &amp; Events
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Stay up to date with what&apos;s happening at Sandpiper. Click any event for full details.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
          ))}
        </div>
      </div>

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </section>
  );
};

export default RecentNews;
