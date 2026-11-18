import { ArrowUpRight, Check, LogOut, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';
import { useAccount } from '../../Hooks/useAuth.js';
import { PageShell } from '../components/PageShell.jsx';
import { ErrorMessage, Spinner } from '../components/Feedback.jsx';

export function AccountPage() {
  const { user, pending, error, notice, logout, reloadProfile } = useAccount();
  const firstName = user.name.split(' ')[0];
  return (
    <PageShell headerAction={
      <button onClick={logout} disabled={Boolean(pending)} className="button-secondary gap-2 px-4 text-xs">
        {pending === 'logout' ? <Spinner /> : <LogOut size={15} />}
        {pending === 'logout' ? 'Signing out...' : 'Sign out'}
      </button>
    }>
      <div className="mx-auto my-auto w-full max-w-[960px] py-1 sm:py-3 lg:py-5">
        <div className="mb-4 sm:mb-6">
          <p className="eyebrow mb-1.5 flex items-center gap-2 sm:mb-2"><span className="size-1.5 rounded-full bg-forest" /> Your personal space</p>
          <h1 className="font-display text-2xl leading-tight font-semibold tracking-[-1px] sm:text-3xl lg:text-4xl">You&apos;re home, {firstName}.</h1>
          <p className="mt-1.5 text-xs text-muted sm:text-sm">A little space of your own. A world of possibility ahead.</p>
        </div>
        <div className="mb-3"><ErrorMessage>{error}</ErrorMessage></div>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-[1fr_1.15fr]">
          <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6 lg:p-7">
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-full bg-sage font-display text-lg font-semibold text-forest sm:size-11 sm:text-xl">
                {user.name.slice(0, 1).toUpperCase()}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-sage px-3 py-1 text-[11px] font-medium text-forest">
                <Check size={12} /> Signed in
              </span>
            </div>
            <h2 className="mt-4 font-display text-lg font-semibold sm:mt-5 sm:text-xl">Your account</h2>
            <dl className="mt-3.5 space-y-3 text-xs sm:mt-4 sm:space-y-4 sm:text-sm">
              <div><dt className="mb-1 text-[11px] text-muted sm:text-xs">Name</dt><dd className="break-words font-medium">{user.name}</dd></div>
              <div><dt className="mb-1 text-[11px] text-muted sm:text-xs">Email address</dt><dd className="break-all font-medium">{user.email}</dd></div>
              <div><dt className="mb-1 text-[11px] text-muted sm:text-xs">Member since</dt><dd>{new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</dd></div>
            </dl>
            <button disabled={Boolean(pending)} onClick={reloadProfile} className="text-link mt-4 inline-flex items-center gap-2 text-xs sm:mt-5">
              {pending === 'profile' ? <Spinner /> : <RefreshCw size={13} />}
              {pending === 'profile' ? 'Refreshing...' : 'Refresh account details'}
            </button>
            {notice && <p role="status" className="mt-2 text-xs leading-5 text-forest">{notice}</p>}
          </section>
          <section className="flex flex-col justify-between rounded-2xl bg-sage p-5 sm:p-6 lg:p-7">
            <div>
              <div className="flex items-center justify-between">
                <Sparkles className="text-forest" size={22} strokeWidth={1.5} />
                <span className="rounded-full border border-chip-line px-2.5 py-1 text-[10px] font-medium tracking-wide text-forest uppercase">On the horizon</span>
              </div>
              <h2 className="mt-4 max-w-xs font-display text-xl leading-tight font-semibold tracking-[-0.8px] sm:mt-6 sm:text-2xl lg:text-3xl">One space.<br />More perspectives.</h2>
              <p className="mt-2.5 max-w-sm text-xs leading-5 text-muted sm:mt-3.5 sm:text-sm sm:leading-6">
                We&apos;re imagining a calmer way to work with AI. Your favorite models, thoughtful conversations, and room for your next big idea.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                {['Gemini', 'ChatGPT', 'Claude'].map((model) => (
                  <span key={model} className="rounded-full border border-chip-line px-2.5 py-1 text-xs text-forest">{model}</span>
                ))}
              </div>
            </div>
            <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-muted sm:mt-6 sm:leading-6">
              <ArrowUpRight size={15} className="mt-1 shrink-0" />
              Chat is not available yet. For now, your account is ready.
            </p>
          </section>
        </div>
        <p className="mt-3.5 flex items-center justify-center gap-2 text-[11px] text-muted sm:mt-5">
          <ShieldCheck size={14} /> Signed in securely. This space is yours.
        </p>
      </div>
    </PageShell>
  );
}
