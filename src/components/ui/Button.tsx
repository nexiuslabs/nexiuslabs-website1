import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  href?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  fullWidth = false,
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = [
    'inline-flex items-center justify-center',
    'font-heading font-semibold tracking-wide',
    'rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ];

  const variantClasses = {
    primary: [
      'bg-nexius-teal text-white',
      'hover:bg-nexius-teal/90 hover:shadow-md hover:-translate-y-0.5',
      'focus:ring-nexius-teal/50',
    ],
    secondary: [
      'bg-nexius-navy text-white',
      'hover:bg-nexius-navy/90 hover:shadow-md hover:-translate-y-0.5',
      'focus:ring-nexius-navy/50',
    ],
    outline: [
      'bg-transparent border-2 border-white text-white',
      'hover:bg-white/10 hover:shadow-md',
      'focus:ring-white/50',
    ],
    ghost: [
      'bg-transparent text-nexius-navy',
      'hover:bg-nexius-gray hover:shadow-sm',
      'focus:ring-nexius-teal/50',
    ],
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const allClasses = [
    ...baseClasses,
    ...variantClasses[variant],
    sizeClasses[size],
    widthClass,
    className,
  ].join(' ');

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${allClasses} group`}>
        {content}
      </a>
    );
  }

  return (
    <button className={`${allClasses} group`} {...props}>
      {content}
    </button>
  );
}