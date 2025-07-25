import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: 'white' | 'gray' | 'navy';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  contained?: boolean;
  children: React.ReactNode;
}

export function Section({
  background = 'white',
  size = 'lg',
  contained = true,
  children,
  className = '',
  ...props
}: SectionProps) {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-nexius-gray',
    navy: 'bg-nexius-navy',
  };

  const sizeClasses = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-24',
    xl: 'py-32',
  };

  const containerClasses = contained
    ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
    : '';

  const sectionClasses = [
    backgroundClasses[background],
    sizeClasses[size],
    className,
  ].join(' ');

  return (
    <section className={sectionClasses} {...props}>
      {contained ? (
        <div className={containerClasses}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}