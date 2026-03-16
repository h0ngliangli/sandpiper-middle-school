import SectionTitle from './SectionTitle';
import {
  Heart,
  Target,
  Lightbulb,
  Wrench,
  CheckCircle,
  ChevronRight,
  type LucideIcon,
  ChevronDown,
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
      <section id="design-thinking" className="">
        <div
          className="flex flex-col gap-4 bg-sandpiper-dark px-6 py-10
            text-center lg:px-12"
        >
          <SectionTitle
            className="text-center"
            small="Our Approach to Learning"
            title={
              <>
                <div className="text-white lg:text-4xl">
                  WHAT IS DESIGN THINKING?
                </div>
              </>
            }
          />
          <p
            className="section-text-light-2 mx-auto max-w-2xl text-left
              text-base leading-relaxed md:text-center md:text-lg"
          >
            Design thinking is a human-centered problem-solving process used by
            the world&apos;s most innovative organizations from Apple and Google
            to IDEO and Stanford&apos;s d.school. At Sandpiper, we teach
            students to understand real world challenges, imagine bold
            solutions, and bring their ideas to life — building the skills no AI
            can replace.
          </p>
        </div>
      </section>
      <section className="section-p-sm bg-midnight">
        <div className="mx-auto flex w-fit flex-col items-stretch md:flex-row">
          {stages.map(({ icon: Icon, step, name, tagline }, i) => (
            <React.Fragment key={name}>
              <div
                className="card-1 flex flex-1 flex-row items-center gap-4
                  rounded-xl md:flex-col md:text-center lg:gap-0"
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
                    className="flex flex-row items-center gap-2 md:flex-col
                      md:gap-0"
                  >
                    <div
                      className="text-xs font-bold uppercase tracking-widest
                        text-sandpiper-gold"
                    >
                      {step}
                    </div>
                    <div
                      className="font-extrabold uppercase tracking-wide
                        text-white lg:text-lg"
                    >
                      {name}
                    </div>
                  </div>
                  <div className="leading-relaxed text-white/55">{tagline}</div>
                </div>
              </div>

              {i < stages.length - 1 && (
                <div
                  className="hidden shrink-0 items-center self-center
                    text-sandpiper-gold md:flex"
                >
                  <ChevronRight className="h-6 w-6" />
                </div>
              )}

              {i < stages.length - 1 && (
                <div
                  className="flex shrink-0 items-center self-center
                    text-sandpiper-gold md:hidden"
                >
                  <ChevronDown className="h-6 w-6" />
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
