'use client';
import SectionTitle from './SectionTitle';
import { fetchTestimonials } from '@/lib/sheets';
import { Testimonial } from '@/types';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    fetchTestimonials().then(setItems).catch(console.error);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const timer = setInterval(() => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
        isAnimatingRef.current = false;
        setIsAnimating(false);
      }, 300);
    }, 8000);
    return () => clearInterval(timer);
  }, [items.length]);

  const handleNext = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, 300);
  };

  if (items.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="section-p bg-light-1 flex flex-col items-center gap-3"
    >
      <SectionTitle
        title={
          <>
            <div className="text-center text-sky-500">
              Hear from Our Students, Parents, and Alumni
            </div>
          </>
        }
      />
      {/* Testimonial Card */}
      <div
        className="bg-light-0 flex w-full min-h-96 flex-col justify-between gap-2
          rounded-3xl p-4 shadow-xl md:min-h-80 md:p-3 lg:p-5"
      >
        {/* Background Quote */}
        <div className="section-text-annotation-light">
          <Quote size={`20`} strokeWidth={1} />
        </div>

        {/* Switching Content */}
        <div
          className={`transform transition-all duration-300
            ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
        >
          <p className="section-text italic lg:text-lg">
            "{items[currentIndex].content}"
          </p>

          {/* Name and Role */}
          <div className="flex flex-col items-center gap-1">
            <h4 className="font-bold text-amber-700 dark:text-white">
              {items[currentIndex].name}
            </h4>
            <p
              className="text-xs font-medium uppercase tracking-wider
                text-amber-700 dark:text-blue-400"
            >
              {items[currentIndex].role}
            </p>
          </div>
        </div>

        {/* Bottom Indicators */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handlePrev}
            className="pointer-events-auto flex h-10 w-10 items-center
              justify-center rounded-full bg-white text-slate-400 shadow-md
              transition-all hover:text-blue-800 hover:shadow-lg
              dark:bg-slate-700 dark:text-slate-300 dark:hover:text-blue-400
              md:h-12 md:w-12"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 w-2 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-6 bg-blue-800'
                  : `bg-slate-300 hover:bg-slate-400 dark:bg-slate-600
                    dark:hover:bg-slate-500`
              }`}
            />
          ))}

          <button
            onClick={handleNext}
            className="pointer-events-auto flex h-10 w-10 items-center
              justify-center rounded-full bg-white text-slate-400 shadow-md
              transition-all hover:text-blue-800 hover:shadow-lg
              dark:bg-slate-700 dark:text-slate-300 dark:hover:text-blue-400
              md:h-12 md:w-12"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
