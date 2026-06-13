'use client';

import Link from 'next/link';
import { routes } from '@/lib/routes';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="mb-2 text-sm uppercase tracking-[0.14em] text-primary">Something went wrong</p>
      <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
        We hit an unexpected error
      </h1>
      <p className="mb-8 max-w-xl text-muted-foreground">
        Try again. If the issue continues, go back to the homepage and retry your action.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Try again
        </button>
        <Link
          href={routes.page('home')}
          className="inline-flex items-center rounded-md border border-border/40 px-4 py-2 text-sm font-semibold text-foreground"
        >
          Back to home
        </Link>
      </div>
      <p className="mt-6 max-w-xl break-words text-xs text-muted-foreground/70">{error.message}</p>
    </div>
  );
};

export default ErrorPage;
