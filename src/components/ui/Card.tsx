import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'testimonial';
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Card({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  ...props
}: CardProps) {
  const baseClasses = [
    'bg-white rounded-xl',
    'transition-all duration-300',
  ];

  const variantClasses = {
    default: [
      'border border-nexius-gray',
      'hover:border-nexius-teal/30 hover:shadow-lg hover:-translate-y-1',
    ],
    elevated: [
      'shadow-lg border border-nexius-gray/50',
      'hover:shadow-xl hover:-translate-y-2',
    ],
    bordered: [
      'border-2 border-nexius-gray',
      'hover:border-nexius-teal hover:shadow-md',
    ],
    testimonial: [
      'border border-nexius-gray',
      'hover:border-nexius-teal/30 hover:shadow-lg',
      'overflow-hidden',
    ],
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const allClasses = [
    ...baseClasses,
    ...variantClasses[variant],
    paddingClasses[padding],
    className,
  ].join(' ');

  return (
    <div className={allClasses} {...props}>
      {children}
    </div>
  );
}