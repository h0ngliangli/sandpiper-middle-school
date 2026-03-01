import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Parent of a 7th Grader",
    content: "The teachers at Sandpiper truly care about every child. My son's transition here went so smoothly — he now looks forward to school every day, especially his science class and the robotics club.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: 2,
    name: "David Chen",
    role: "Current 8th Grade Student",
    content: "My favorite part of Sandpiper is the music program. Being in the orchestra gave me so much confidence. The extracurriculars here are amazing — I've learned so much and made great friends who share my interests.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Class of 2023 Honor Alumni",
    content: "My three years at Sandpiper laid a strong foundation for high school. The academic environment is wonderful — my teachers didn't just teach me how to learn, they taught me how to face challenges with confidence.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);


  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className="py-16 bg-slate-50 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* 标题部分 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Voices From Our Community</h2>
          <div className="w-16 h-1 bg-blue-800 mx-auto rounded-full"></div>
        </div>

        {/* 证言主体卡片 */}
        <div className="relative bg-white rounded-3xl shadow-xl p-8 md:p-12 min-h-[400px] flex flex-col justify-center items-center text-center">
          
          {/* 背景装饰引号 */}
          <div className="absolute top-8 left-8 text-blue-100 opacity-50">
            <Quote size={80} strokeWidth={1} />
          </div>

          {/* 切换内容 */}
          <div className={`transition-all duration-300 transform ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <p className="text-xl md:text-2xl italic text-slate-700 leading-relaxed mb-8 relative z-10">
              "{testimonials[currentIndex].content}"
            </p>

            {/* 头像与身份 */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden mb-4 bg-blue-50">
                <img 
                  src={testimonials[currentIndex].avatar} 
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-bold text-slate-900">{testimonials[currentIndex].name}</h4>
              <p className="text-blue-800 font-medium text-sm uppercase tracking-wider">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </div>

          {/* 左右导航按钮 */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
            <button
              onClick={handlePrev}
              className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white shadow-md text-slate-400 hover:text-blue-800 hover:shadow-lg transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white shadow-md text-slate-400 hover:text-blue-800 hover:shadow-lg transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* 底部指示器 */}
          <div className="absolute bottom-6 flex space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 bg-blue-800' : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 底部补充说明 */}
        <p className="text-center mt-8 text-slate-500 text-sm">
          Join the Sandpiper community and start your child's journey of exceptional growth.
        </p>
      </div>
    </section>
  );
}