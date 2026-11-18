import { ArrowRight, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router';
import { useAuthForm } from '../../Hooks/useAuthForm.js';
import { useAuth } from '../../Hooks/useAuth.js';
import { AuthLayout } from '../components/AuthLayout.jsx';
import { FormField } from '../components/FormField.jsx';
import { ErrorMessage, Spinner } from '../components/Feedback.jsx';

export function LoginPage() {
  const form = useAuthForm('login');
  const { sessionError } = useAuth();
  return (
    <AuthLayout>
      <p className="eyebrow mb-2">A fresh start, familiar space</p>
      <h2 className="font-display text-2xl font-semibold tracking-[-1px] sm:text-3xl">
        Welcome back.
      </h2>
      <p className="mt-1 text-xs leading-5 text-muted sm:text-sm">Sign in and pick up where possibility begins.</p>

      <form noValidate onSubmit={form.submit} className="mt-5 space-y-3.5 sm:mt-6 sm:space-y-4" aria-busy={form.pending}>
        <ErrorMessage>{form.error || sessionError}</ErrorMessage>
        <fieldset disabled={form.pending} className="space-y-3.5 sm:space-y-4 disabled:opacity-70">
          <legend className="sr-only">Sign in</legend>
          <FormField
            label="Email address" name="email" type="email" autoComplete="email" autoCapitalize="none"
            spellCheck={false} placeholder="you@example.com" required
            value={form.values.email} onChange={form.updateField} error={form.fieldErrors.email}
          />
          <FormField
            label="Password" name="password" type={form.showPassword ? 'text' : 'password'}
            autoComplete="current-password" placeholder="Enter your password" required
            value={form.values.password} onChange={form.updateField} error={form.fieldErrors.password}
            showPassword={form.showPassword} onToggle={form.togglePassword}
          />
          <button type="submit" className="button-primary mt-1 w-full" disabled={form.pending}>
            {form.pending ? <><Spinner /> Signing in...</> : <>Sign in <ArrowRight size={17} /></>}
          </button>
        </fieldset>
      </form>

      <p className="mt-4 text-center text-xs text-muted sm:mt-5 sm:text-[13px]">
        New to Downbot?{' '}
        <Link to="/register" className="text-link inline-flex items-center">Create an account</Link>
      </p>
      <div className="mt-4 flex items-center justify-center gap-2 border-t border-line pt-3 text-[11px] text-muted sm:mt-5 sm:pt-4">
        <LockKeyhole size={13} aria-hidden="true" />
        Your space starts with a secure sign-in.
      </div>
    </AuthLayout>
  );
}
