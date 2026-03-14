'use client';
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
    <section id="testimonials" className="section-p bg-light-1">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 text-center">
          <h2 className="section-title text-sky-500">
            Hear from Our Students, Parents, and Alumni
          </h2>
          <div className="mx-auto h-0.5 w-16 rounded-full bg-sky-500"></div>
        </div>

        {/* Testimonial Card */}
        <div
          className="relative flex min-h-[300px] flex-col items-center
            justify-center rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-700
            md:p-12"
        >
          {/* Background Quote */}
          <div className="absolute left-8 top-8 text-blue-200">
            <Quote size={30} strokeWidth={1} />
          </div>

          {/* Switching Content */}
          <div
            className={`transform transition-all duration-300
              ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
          >
            <p
              className="relative z-10 mb-8 px-6 italic leading-relaxed
                text-slate-700 dark:text-slate-200 md:text-lg"
            >
              "{items[currentIndex].content}"
            </p>

            {/* Avatar and Role */}
            <div className="flex flex-col items-center">
              <div
                className={`mb-4 h-20 w-20 overflow-hidden rounded-full border-4
                  border-white bg-blue-50 shadow-lg dark:bg-slate-700
                  ${items[currentIndex].avatar ? '' : 'hidden'}`}
              >
                <img
                  src={items[currentIndex].avatar}
                  alt={items[currentIndex].name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h4 className="text-lg font-bold text-amber-700 dark:text-white">
                {items[currentIndex].name}
              </h4>
              <p
                className="text-sm font-medium uppercase tracking-wider
                  text-amber-700 dark:text-blue-400"
              >
                {items[currentIndex].role}
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 right-0
              flex items-center justify-between px-4"
          >
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

          {/* Bottom Indicators */}
          <div className="absolute bottom-6 flex space-x-2">
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
          </div>
        </div>

        {/* Bottom Note */}
        <p
          className="mt-8 text-center text-sm text-slate-500
            dark:text-slate-400"
        >
          Join the Sandpiper community and start your child's journey of
          exceptional growth.
        </p>
      </div>
    </section>
  );
}
