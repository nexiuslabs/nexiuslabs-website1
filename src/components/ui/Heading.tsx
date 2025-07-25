import React from 'react';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  variant?: 'primary' | 'white' | 'muted';
  children: React.ReactNode;
}

export function Heading({
  level,
  size,
  variant = 'primary',
  children,
  className = '',
  ...props
}: HeadingProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  // Default sizes based on heading level if not specified
  const defaultSizes = {
    1: '3xl',
    2: '2xl',
    3: 'xl',
    4: 'lg',
    5: 'md',
    6: 'sm',
  };

  const actualSize = size || defaultSizes[level];

  const baseClasses = [
    'font-heading font-bold tracking-tight',
  ];

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    '2xl': 'text-4xl',
    '3xl': 'text-5xl md:text-6xl',
  };

  const variantClasses = {
    primary: 'text-nexius-navy',
    white: 'text-white',
    muted: 'text-nexius-charcoal',
  };

  const allClasses = [
    ...baseClasses,
    sizeClasses[actualSize],
    variantClasses[variant],
    className,
  ].join(' ');

  return (
    <Component className={allClasses} {...props}>
      {children}
    </Component>
  );
}