import { Link } from 'react-router';
import { PageShell } from '../features/auth/UI/components/PageShell.jsx';

export function NotFoundPage() {
  return (
    <PageShell>
      <div className="my-auto space-y-4 py-8 text-center">
        <p className="eyebrow">404 / A little off track</p>
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">This space doesn&apos;t exist.</h1>
        <Link to="/" className="text-link inline-flex items-center">Back to Downbot</Link>
      </div>
    </PageShell>
  );
}
