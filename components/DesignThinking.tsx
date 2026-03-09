import React from 'react';
import { Heart, Target, Lightbulb, Wrench, CheckCircle, ChevronRight, type LucideIcon } from 'lucide-react';

const stages: { icon: LucideIcon; step: string; name: string; tagline: string }[] = [
  { icon: Heart,        step: 'Step 01', name: 'Empathize', tagline: 'Understand people and their real needs' },
  { icon: Target,       step: 'Step 02', name: 'Define',    tagline: 'Frame the right problem to solve' },
  { icon: Lightbulb,   step: 'Step 03', name: 'Ideate',    tagline: 'Generate bold, creative solutions' },
  { icon: Wrench,       step: 'Step 04', name: 'Prototype', tagline: 'Build a version to learn from' },
  { icon: CheckCircle, step: 'Step 05', name: 'Test',      tagline: 'Try it, learn, and improve' },
];

const DesignThinking: React.FC = () => {
  return (
    <>
      <section id="design-thinking" className="bg-sandpiper-blue py-10 px-6 lg:px-12">
        <div className="text-center mb-6">
          <span className="text-xs font-bold tracking-widest uppercase text-sandpiper-gold mb-4 block">
            Our Approach to Learning
          </span>
          <h2 className="section-title font-extrabold text-white uppercase tracking-tight leading-tight mb-5">
            What is Design Thinking
          </h2>
          <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto text-base">
            Design thinking is a human-centered problem-solving process used by the world&apos;s most
            innovative organizations from Apple and Google to IDEO and Stanford&apos;s d.school. At
            Sandpiper, we teach students to understand real world challenges, imagine bold solutions,
            and bring their ideas to life — building the skills no AI can replace.
          </p>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch gap-1 lg:gap-2">
          {stages.map(({ icon: Icon, step, name, tagline }, i) => (
            <React.Fragment key={name}>
              <div className="flex-1 flex flex-row lg:flex-col items-center lg:text-center gap-4 lg:gap-0 bg-white/5 border border-white/10 rounded-xl px-5 py-6 lg:py-8 hover:bg-white/10 hover:-translate-y-1 transition-all duration-200">
                <div className="w-12 h-12 rounded-full bg-midnight border border-sandpiper-gold/25 flex items-center justify-center shrink-0 lg:mb-4">
                  <Icon className="h-6 w-6 text-sandpiper-gold" />
                </div>
                <div>
                  <div className="text-sandpiper-gold text-xs font-bold tracking-widest uppercase mb-1">
                    {step}
                  </div>
                  <div className="text-white font-extrabold uppercase tracking-wide text-sm lg:text-base mb-1">
                    {name}
                  </div>
                  <div className="text-white/55 text-xs font-light leading-relaxed">
                    {tagline}
                  </div>
                </div>
              </div>

              {i < stages.length - 1 && (
                <div className="hidden lg:flex items-center text-sandpiper-gold shrink-0 self-center">
                  <ChevronRight className="h-6 w-6" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
      
    </>
  );
};

export default DesignThinking;
