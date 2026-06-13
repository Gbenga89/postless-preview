'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { routes } from '@/lib/routes';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href={routes.page('home')} aria-label="postless home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href={routes.page('compare')}
            className="text-sm text-slate-400 transition-colors hover:text-foreground"
          >
            Comparisons
          </a>
          <a
            href="#features"
            className="text-sm text-slate-400 transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-slate-400 transition-colors hover:text-foreground"
          >
            How it works
          </a>
          <Button asChild variant="hero" size="sm">
            <a href="#top">Join waitlist</a>
          </Button>
        </div>

        <button
          type="button"
          className="text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-controls="mobile-navigation"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="space-y-3 border-t border-border/50 bg-background/95 p-4 backdrop-blur-xl md:hidden"
        >
          <a
            href="#features"
            className="block text-sm text-slate-400 hover:text-foreground"
            onClick={() => setOpen(false)}
          >
            Features
          </a>
          <a
            href="#use-cases"
            className="block text-sm text-slate-400 hover:text-foreground"
            onClick={() => setOpen(false)}
          >
            Use cases
          </a>
          <a
            href="#how-it-works"
            className="block text-sm text-slate-400 hover:text-foreground"
            onClick={() => setOpen(false)}
          >
            How it works
          </a>
          <Button asChild variant="hero" size="sm" className="w-full">
            <a
              href="#top"
              onClick={() => {
                setOpen(false);
              }}
            >
              Join waitlist
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
