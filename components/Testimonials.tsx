'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { fetchTestimonials } from '@/lib/sheets';
import { Testimonial } from '@/types';


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
    <section id="testimonials" className="py-16 bg-slate-50 dark:bg-slate-900 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Voices From Our Community</h2>
          <div className="w-16 h-1 bg-blue-800 mx-auto rounded-full"></div>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 md:p-12 min-h-[400px] flex flex-col justify-center items-center text-center">
          
          {/* Background Quote */}
          <div className="absolute top-8 left-8 text-blue-100 opacity-50">
            <Quote size={80} strokeWidth={1} />
          </div>

          {/* Switching Content */}
          <div className={`transition-all duration-300 transform ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <p className="text-xl md:text-2xl italic text-slate-700 dark:text-slate-200 leading-relaxed mb-8 relative z-10">
              "{items[currentIndex].content}"
            </p>

            {/* Avatar and Role */}
            <div className="flex flex-col items-center">
              <div className={`w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden mb-4 bg-blue-50 ${items[currentIndex].avatar ? '' : 'hidden'}`} >
                <img 
                  src={items[currentIndex].avatar} 
                  alt={items[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">{items[currentIndex].name}</h4>
              <p className="text-blue-800 font-medium text-sm uppercase tracking-wider dark:text-blue-400">
                {items[currentIndex].role}
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
            <button
              onClick={handlePrev}
              className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 shadow-md text-slate-400 dark:text-slate-300 hover:text-blue-800 dark:hover:text-blue-400 hover:shadow-lg transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 shadow-md text-slate-400 dark:text-slate-300 hover:text-blue-800 dark:hover:text-blue-400 hover:shadow-lg transition-all"
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
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 bg-blue-800' : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <p className="text-center mt-8 text-slate-500 dark:text-slate-400 text-sm">
          Join the Sandpiper community and start your child's journey of exceptional growth.
        </p>
      </div>
    </section>
  );
}