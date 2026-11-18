import { ArrowDown, Sparkles } from 'lucide-react';
import { PageShell } from './PageShell.jsx';

function ConversationArtwork() {
  return (
    <div aria-hidden="true" className="relative mx-auto mt-4 w-full max-w-[360px] px-3 pb-2 pt-4 xl:mt-6">
      <div className="absolute inset-x-8 top-0 h-24 rounded-2xl border border-art-line bg-art-back" />
      <div className="absolute inset-x-5 top-2 h-24 rounded-2xl border border-art-line bg-art-mid" />
      <div className="relative rounded-2xl border border-art-line bg-art-card p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-forest">
            <Sparkles size={16} /> A fresh perspective
          </div>
          <span className="size-6 rounded-full bg-sage p-1 text-forest"><ArrowDown size={16} /></span>
        </div>
        <div className="space-y-2">
          <div className="h-1.5 w-[88%] rounded-full bg-bar-strong" />
          <div className="h-1.5 w-[96%] rounded-full bg-bar-soft" />
          <div className="h-1.5 w-[62%] rounded-full bg-bar-soft" />
        </div>
        <div className="mt-5 flex gap-2">
          {['Explore', 'Reflect', 'Create'].map((label) => (
            <span key={label} className="rounded-full border border-line px-2.5 py-0.5 text-[10px] text-muted">{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AuthLayout({ children }) {
  return (
    <PageShell>
      <div className="my-auto grid items-center gap-8 lg:grid-cols-[1.08fr_1fr] lg:gap-12 xl:gap-20">
        <section className="hidden max-h-[min(580px,calc(100dvh-120px))] flex-col justify-between rounded-[24px] bg-sage p-6 lg:flex xl:p-8 2xl:p-10">
          <div>
            <p className="eyebrow flex items-center gap-2"><span className="size-1.5 rounded-full bg-forest" /> Your space to think</p>
            <h1 className="mt-4 max-w-[400px] font-display text-[30px] leading-[1.16] font-semibold tracking-[-1.5px] xl:text-[38px] 2xl:text-[44px]">
              Good ideas start with a little space.
            </h1>
            <p className="mt-3 max-w-sm text-xs leading-6 text-muted sm:text-sm">
              A quieter home for curious minds. We&apos;re building a place to explore ideas with your favorite AI models, all together.
            </p>
          </div>
          <ConversationArtwork />
          <div className="mt-4 flex items-center gap-3 text-[11px] text-muted xl:mt-6">
            <span className="h-px w-8 bg-bar-strong" />
            A little room for what comes next.
          </div>
        </section>
        <section className="mx-auto w-full max-w-[400px] py-1 sm:py-2 lg:py-4">
          {children}
        </section>
      </div>
    </PageShell>
  );
}
