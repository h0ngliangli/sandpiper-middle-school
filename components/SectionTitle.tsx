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
    <div className={`py-4 ${className ?? ''}`}>
      <div
        className="pb-3 text-xs font-bold uppercase tracking-widest
          text-sandpiper-gold"
      >
        {small}
      </div>
      <h2 className="section-title uppercase">{title}</h2>
    </div>
  );
};

export default SectionTitle;
