import React from 'react';

interface SectionTitleProps {
  className?: string;
  small: string;
  title: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  className = '',
  small,
  title,
}) => {
  return (
    <div className={`flex flex-col gap-3 ${className ?? ''}`}>
      <div
        className="text-xs font-bold uppercase tracking-widest
          text-sandpiper-gold"
      >
        {small}
      </div>
      <h2 className="section-title uppercase">{title}</h2>
    </div>
  );
};

export default SectionTitle;
