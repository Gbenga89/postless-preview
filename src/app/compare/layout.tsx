import type { ReactNode } from 'react';

const CompareLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-[75vh] overflow-hidden pt-20 md:pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-[-140px] h-[min(560px,58vh)] w-[min(780px,110vw)] rounded-full bg-primary/[0.11] blur-[110px]" />
        <div className="absolute bottom-[-100px] right-[-80px] h-[420px] w-[min(520px,85vw)] rounded-full bg-primary/[0.07] blur-[100px]" />
        <div className="absolute bottom-1/4 left-[-120px] h-64 w-72 rounded-full bg-primary/[0.04] blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, hsl(var(--border) / 0.5) 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>
      <div className="container relative max-w-6xl pb-20 md:pb-28">{children}</div>
    </div>
  );
};

export default CompareLayout;
