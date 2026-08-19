export default function PolicyLayout({
  title,
  subtitle,
  lastUpdated,
  children,
}) {
  return (
    <div>
      <div className="border-b border-ink-100 bg-ink-100/50">
        <div className="container-app py-10">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-600">
            chicher
          </p>
          <h1 className="mt-1 font-display text-4xl font-bold text-ink-900">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 max-w-2xl text-ink-600">{subtitle}</p>
          )}
          {lastUpdated && (
            <p className="mt-3 text-xs text-ink-400">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
      </div>
      <div className="container-app py-10">
        <div className="mx-auto max-w-3xl space-y-6 text-ink-700 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
