import { SchoolEvent } from '@/types';

/**
 * Upcoming school events.
 * - Events past their `expirationDate` are considered "past events" and will be
 *   shown in a dedicated Past Events section in the future.
 * - Replace this static array with a database query once the backend is ready.
 */
export const events: SchoolEvent[] = [
  {
    id: 'middle-school-info-night-2026',
    title: 'Middle School Information Night',
    summary:
      'Join us for an evening of presentations and Q&A about our middle school programs.',
    description: `Last night's Sandpiper Middle School presentation recording is now available on 👉[YouTube](https://www.youtube.com/watch?v=V9b1lj6JO1w)`,
    eventDate: '2026-03-03',
    expirationDate: '2026-03-31',
    category: 'Academic',
    imageUrl: '',
  },
  {
    id: 'sandpiper-tour-20260312',
    title: 'Sandpiper Middle School School Tour',
    summary:
      'Sandpiper Middle School school tour on Thursday, March 12, 2026 at 9:00 am.',
    description: `Thank you for signing up for a Sandpiper Middle School tour.
      Your tour is confirmed for Thursday, March 12, 2026 at 9:00 am.
      Our school is located at 801 Redwood Shores Parkway, Redwood City. 
      Please arrive a few minutes early to check in at the office.
      We're excited to share what makes our middle schools such dynamic places for learning!`,
    eventDate: '2026-03-12',
    expirationDate: '2026-03-13',
    category: 'Community',
    imageUrl: '',
  },
  {
    id: 'psa-video-contest-20260327',
    title: 'PSA VIDEO CONTEST',
    summary:
      'Got something to say? Use your creativity to create a short video that prompts people to think differently about nicotine, vaping, and stress.',
    description:
      'For details, 👉 [Guidelines & Deadline](https://docs.google.com/document/d/1rZJJb4RL2TaA6fYqYDbEfPixg-L3dEDb/edit)',
    eventDate: '2026-03-27',
    expirationDate: '2026-03-28',
    category: 'Community',
  },
];
