import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4 md:p-6',
  lg: 'p-6 md:p-8',
};

export default function Card({
  children,
  className = '',
  hover = false,
  onClick,
  padding = 'md',
}: CardProps) {
  const baseStyles = 'bg-white rounded-xl shadow-sm border border-black/5';
  const hoverStyles = hover ? 'hover:shadow-md transition-shadow duration-200 cursor-pointer' : '';

  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      className={`${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`}
      onClick={onClick}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </Component>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'wide';
  className?: string;
}

export function CardImage({ src, alt, aspectRatio = 'video', className = '' }: CardImageProps) {
  const aspectStyles = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[2/1]',
  };

  return (
    <div className={`${aspectStyles[aspectRatio]} overflow-hidden rounded-t-xl ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
}

export function CardTitle({ children, className = '', as: Tag = 'h3' }: CardTitleProps) {
  return <Tag className={`text-lg font-semibold ${className}`}>{children}</Tag>;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={className}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return <div className={`mt-4 pt-4 border-t border-black/5 ${className}`}>{children}</div>;
}
