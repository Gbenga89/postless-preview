'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type WaitlistFormProps = {
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  buttonSize?: 'sm' | 'default' | 'lg';
  submitLabel?: string;
  successMessage?: string;
  endpoint?: string;
};

type WaitlistSubmissionPayload = {
  email: string;
  host: string;
};

type WaitlistSubmissionResponse = {
  success: boolean;
  message?: string;
};

const WaitlistForm = ({
  className,
  inputClassName,
  buttonClassName,
  buttonSize = 'default',
  submitLabel = 'Join the waitlist',
  successMessage = "You're on the list! We'll be in touch.",
  endpoint = process.env.NEXT_PUBLIC_WAITLIST_API_URL ?? routes.api('waitlist'),
}: WaitlistFormProps) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim();
    if (!normalizedEmail || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: WaitlistSubmissionPayload = {
        email: normalizedEmail,
        host: location.hostname,
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      const data = (await response.json()) as WaitlistSubmissionResponse;
      if (data.success === false) {
        throw new Error(data.message ?? 'Waitlist submission failed');
      }

      setSubmitted(true);
      setEmail('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes('409')) {
          toast.success("You're already on the waitlist!");
          return;
        }
      }
      toast.error("We couldn't submit right now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={cn('flex items-center gap-2 text-primary', className)}>
        <CheckCircle size={20} />
        <span className="font-medium">{successMessage}</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex w-full flex-col items-start gap-3 sm:flex-row', className)}
    >
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        id="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isSubmitting}
        className={cn(
          'w-full flex-1 rounded-lg border border-border/30 bg-accent/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30',
          inputClassName,
        )}
      />
      <Button
        type="submit"
        variant="hero"
        size={buttonSize}
        disabled={isSubmitting}
        className={cn('w-full sm:w-auto', buttonClassName)}
      >
        {isSubmitting ? 'Submitting...' : submitLabel} <ArrowRight size={14} />
      </Button>
    </form>
  );
};

export default WaitlistForm;
