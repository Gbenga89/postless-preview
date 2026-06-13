'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { routes } from '@/lib/routes';

export type FaqItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  faqs: FaqItem[];
  title?: string;
  intro?: string;
};

const FAQ = ({
  faqs,
  title = 'Frequently asked questions',
  intro = 'Everything you need to know before getting started',
}: FAQProps) => {
  return (
    <div className="container max-w-2xl">
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">{title}</h2>
        <p className="text-lg text-muted-foreground">{intro}</p>
      </div>

      <div className="mt-14">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map(({ question, answer }) => (
            <AccordionItem
              key={question}
              value={question}
              className="mb-3 overflow-hidden rounded-xl border border-border/20 bg-card/10"
            >
              <AccordionTrigger className="px-5 py-4 text-left text-foreground hover:bg-card/20 hover:no-underline">
                {question}
              </AccordionTrigger>
              <AccordionContent className="px-5 pt-1 text-muted-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm font-medium text-foreground">Still have questions?</p>
        <Link
          href={routes.page('contact')}
          className="mt-2 inline-flex text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Contact us →
        </Link>
      </div>
    </div>
  );
};

export default FAQ;
