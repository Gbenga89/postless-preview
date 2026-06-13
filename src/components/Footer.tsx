import Logo from '@/components/Logo';

const footerLinks = [
  /* { label: 'Docs', href: '#' },
  { label: 'API', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Privacy', href: '#' }, */
];

const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-8">
      <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Logo />
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            Postless is for building social media brand.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {footerLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>

        <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} Postless</span>
      </div>
    </footer>
  );
};

export default Footer;
