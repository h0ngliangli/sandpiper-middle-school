'use client';
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { siWhatsapp } from 'simple-icons';
import { fetchGradeGroups } from '@/lib/sheets';
import { GradeGroup, RoomParent } from '@/types';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d={siWhatsapp.path} />
  </svg>
);

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

const avatarColors = [
  'bg-sandpiper-blue text-white',
  'bg-sandpiper-gold text-midnight',
];

const RoomParentCard: React.FC<{ parent: RoomParent; colorIndex: number }> = ({
  parent,
  colorIndex,
}) => (
  <div className="flex flex-col items-center gap-2">
    {parent.imageUrl ? (
      <img
        src={parent.imageUrl}
        alt={parent.name}
        className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-600"
      />
    ) : (
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold ring-2 ring-slate-200 dark:ring-slate-600 ${avatarColors[colorIndex % avatarColors.length]}`}
      >
        {getInitials(parent.name)}
      </div>
    )}
    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 text-center leading-tight">
      {parent.name}
    </span>
  </div>
);

const WhatsAppGroups: React.FC = () => {
  const [groups, setGroups] = useState<GradeGroup[]>([]);
  const [confirmGroup, setConfirmGroup] = useState<GradeGroup | null>(null);

  useEffect(() => {
    fetchGradeGroups().then(setGroups).catch(console.error);
  }, []);

  const handleConfirm = () => {
    if (confirmGroup) {
      window.open(confirmGroup.whatsappUrl, '_blank', 'noopener,noreferrer');
      setConfirmGroup(null);
    }
  };

  return (
    <section id="whatsapp-groups" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-sandpiper-blue dark:text-blue-300 uppercase bg-blue-50 dark:bg-blue-900/30 rounded-full">
            Stay Connected
          </div>
          <h2 className="section-title">
            WhatsApp Groups &amp; Room Parents
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Join your grade&apos;s WhatsApp group to stay in the loop. Your room parents are here
            to help and answer questions throughout the year.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {groups.map((group) => (
            <div
              key={group.grade}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col"
            >
              {/* Grade header */}
              <div className="relative h-20 w-full overflow-hidden">
                <div className="absolute inset-0 bg-midnight/60" />
                <div className="absolute bottom-0 left-0 px-6 py-5 flex items-center gap-3">
                  <img
                    src={group.groupImageUrl}
                    alt={`Grade ${group.grade}`}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0 ring-2 ring-sandpiper-gold"
                  />
                  <div>
                    <h3 className="text-xl font-extrabold text-white leading-tight">
                      {group.grade}th Grade
                    </h3>
                  </div>
                </div>
              </div>

              <div className="px-6 py-6 flex flex-col flex-grow gap-6">
                {/* Room parents */}
                <div>
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">
                    Room Parents
                  </p>
                  <div className="flex gap-6 justify-center flex-wrap">
                    {group.roomParents.map((parent, i) => (
                      <RoomParentCard key={parent.name} parent={parent} colorIndex={i} />
                    ))}
                  </div>
                </div>

                {/* WhatsApp button */}
                <div className="mt-auto pt-2">
                  <button
                    onClick={() => setConfirmGroup(group)}
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                    style={{ backgroundColor: '#25D366' }}
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Join Grade {group.grade} Group
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation modal */}
      {confirmGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-midnight/60 backdrop-blur-sm" onClick={() => setConfirmGroup(null)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-sm w-full p-6 flex flex-col gap-4">
            <button
              onClick={() => setConfirmGroup(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#25D366' }}>
                <WhatsAppIcon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-extrabold text-midnight dark:text-white">Join Grade {confirmGroup.grade} Group?</h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              You are about to open WhatsApp and join the <span className="font-semibold text-slate-700">Grade {confirmGroup.grade} parent group</span>. Are you sure?
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setConfirmGroup(null)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2.5 px-4 rounded-xl font-bold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#25D366' }}
              >
                Join Group
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhatsAppGroups;
