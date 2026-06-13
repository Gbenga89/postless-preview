import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ProseContentProps = {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'sm' | 'lg';
};

const proseSizeClasses: Record<NonNullable<ProseContentProps['size']>, string> = {
  default: 'prose',
  sm: 'prose prose-sm',
  lg: 'prose prose-lg',
};

const ProseContent = ({ children, className, size = 'default' }: ProseContentProps) => {
  return (
    <div
      className={cn(
        proseSizeClasses[size],
        'text-muted-foreground [&_a]:text-primary [&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_h4]:text-foreground [&_h5]:text-foreground [&_h6]:text-foreground [&_li]:text-muted-foreground [&_p]:text-muted-foreground [&_strong]:text-foreground',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ProseContent;
