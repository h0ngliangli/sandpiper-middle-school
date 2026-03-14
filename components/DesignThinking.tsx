import {
  Heart,
  Target,
  Lightbulb,
  Wrench,
  CheckCircle,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import React from 'react';

const stages: {
  icon: LucideIcon;
  step: string;
  name: string;
  tagline: string;
}[] = [
  {
    icon: Heart,
    step: 'Step 01',
    name: 'Empathize',
    tagline: 'Understand people and their real needs',
  },
  {
    icon: Target,
    step: 'Step 02',
    name: 'Define',
    tagline: 'Frame the right problem to solve',
  },
  {
    icon: Lightbulb,
    step: 'Step 03',
    name: 'Ideate',
    tagline: 'Generate bold, creative solutions',
  },
  {
    icon: Wrench,
    step: 'Step 04',
    name: 'Prototype',
    tagline: 'Build a version to learn from',
  },
  {
    icon: CheckCircle,
    step: 'Step 05',
    name: 'Test',
    tagline: 'Try it, learn, and improve',
  },
];

const DesignThinking: React.FC = () => {
  return (
    <>
      <section id="design-thinking" className="mx-auto max-w-6xl">
        <div className="bg-sandpiper-dark px-6 py-10 text-center lg:px-12">
          <span
            className="mb-4 block text-xs font-bold uppercase tracking-widest
              text-sandpiper-gold"
          >
            Our Approach to Learning
          </span>
          <h2
            className="section-title mb-5 font-extrabold uppercase leading-tight
              tracking-tight text-white lg:text-4xl"
          >
            What is Design Thinking?
          </h2>
          <p
            className="mx-auto max-w-2xl text-base leading-relaxed
              text-gray-400"
          >
            Design thinking is a human-centered problem-solving process used by
            the world&apos;s most innovative organizations from Apple and Google
            to IDEO and Stanford&apos;s d.school. At Sandpiper, we teach
            students to understand real world challenges, imagine bold
            solutions, and bring their ideas to life — building the skills no AI
            can replace.
          </p>
        </div>

        <div
          className="mx-auto flex max-w-6xl flex-col items-stretch gap-1
            bg-midnight px-6 py-10 md:flex-row md:gap-2 md:px-12"
        >
          {stages.map(({ icon: Icon, step, name, tagline }, i) => (
            <React.Fragment key={name}>
              <div
                className="flex flex-1 flex-row items-center gap-4 rounded-xl
                  border border-white/10 bg-white/5 px-5 py-6 transition-all
                  duration-200 hover:-translate-y-1 hover:bg-white/10
                  md:flex-col md:py-8 md:text-center lg:gap-0"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center
                    rounded-full border border-sandpiper-gold/25 bg-midnight
                    lg:mb-4"
                >
                  <Icon className="h-6 w-6 text-sandpiper-gold" />
                </div>
                <div>
                  <div
                    className="mb-1 text-xs font-bold uppercase tracking-widest
                      text-sandpiper-gold"
                  >
                    {step}
                  </div>
                  <div
                    className="mb-1 font-extrabold uppercase tracking-wide
                      text-white lg:text-lg"
                  >
                    {name}
                  </div>
                  <div className="leading-relaxed text-white/55">{tagline}</div>
                </div>
              </div>

              {i < stages.length - 1 && (
                <div
                  className="hidden shrink-0 items-center self-center
                    text-sandpiper-gold lg:flex"
                >
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
