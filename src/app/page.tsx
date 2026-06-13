import WaitlistForm from '@/components/WaitlistForm';

const HomePage = () => {
  return (
    <div className="container flex min-h-screen items-center justify-center pt-16">
      <div className="flex max-w-xl flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">Postless</h1>
        <p className="text-lg text-muted-foreground">
          Postless is for building social media brand.
        </p>
        <WaitlistForm />
      </div>
    </div>
  );
};

export default HomePage;
