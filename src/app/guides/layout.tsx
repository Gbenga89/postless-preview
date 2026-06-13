import type { ReactNode } from 'react';

const GuidesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container max-w-4xl py-24">
      <div className="mx-auto w-full">{children}</div>
    </div>
  );
};

export default GuidesLayout;
