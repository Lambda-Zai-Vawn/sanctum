
export default function TempleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <div className="absolute top-0 left-0 -z-10 h-full w-full">
        <div className="absolute inset-0 -z-10 h-full w-full bg-aurora [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>
      {children}
    </div>
  );
}
