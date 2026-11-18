import { Brand } from './Brand.jsx';

export function PageShell({ children, headerAction }) {
  return (
    <div className="flex h-dvh max-h-dvh flex-col justify-between overflow-hidden">
      <a href="#main" className="sr-only z-50 rounded bg-forest p-3 text-on-forest focus:not-sr-only focus:absolute">
        Skip to content
      </a>
      <header className="mx-auto flex w-full max-w-[1360px] shrink-0 items-center justify-between gap-4 px-6 py-3 sm:px-10 sm:py-4 lg:px-14">
        <Brand />
        {headerAction || <span className="hidden text-xs text-muted sm:block">A little less noise. A lot more possibility.</span>}
      </header>
      <main id="main" className="mx-auto flex w-full max-w-[1360px] flex-1 min-h-0 flex-col justify-center px-6 py-2 sm:px-10 lg:px-14 overflow-y-auto sm:overflow-hidden">
        {children}
      </main>
      <footer className="mx-auto flex w-full max-w-[1360px] shrink-0 flex-col justify-between gap-2 px-6 py-2 text-xs text-muted sm:flex-row sm:px-10 sm:py-3 lg:px-14">
        <p>A calmer place for your next big idea.</p>
        <p>Downbot <span aria-hidden="true">&middot;</span> Your space to think</p>
      </footer>
    </div>
  );
}
