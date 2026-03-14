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
        className="text-xs font-bold uppercase tracking-widest
          text-sandpiper-gold pb-2"
      >
        {small}
      </div>
      <h2 className="section-title uppercase">{title}</h2>
    </div>
  );
};

export default SectionTitle;
