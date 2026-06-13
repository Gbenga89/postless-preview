import type { ReactNode } from 'react';

const BlogLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container max-w-4xl py-24">
      <div className="mx-auto w-full">{children}</div>
    </div>
  );
};

export default BlogLayout;
