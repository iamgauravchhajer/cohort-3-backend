import { ArrowRight, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router';
import { useAuthForm } from '../../Hooks/useAuthForm.js';
import { useAuth } from '../../Hooks/useAuth.js';
import { AuthLayout } from '../components/AuthLayout.jsx';
import { FormField } from '../components/FormField.jsx';
import { ErrorMessage, Spinner } from '../components/Feedback.jsx';

export function RegisterPage() {
  const form = useAuthForm('register');
  const { sessionError } = useAuth();
  return (
    <AuthLayout>
      <p className="eyebrow mb-1.5 sm:mb-2">Make yourself at home</p>
      <h2 className="font-display text-2xl font-semibold tracking-[-1px] sm:text-3xl">
        A little space for you.
      </h2>
      <p className="mt-1 text-xs leading-5 text-muted sm:text-sm">Create your account. Make room for what comes next.</p>

      <form noValidate onSubmit={form.submit} className="mt-4 space-y-3 sm:mt-5 sm:space-y-3.5" aria-busy={form.pending}>
        <ErrorMessage>{form.error || sessionError}</ErrorMessage>
        <fieldset disabled={form.pending} className="space-y-3 sm:space-y-3.5 disabled:opacity-70">
          <legend className="sr-only">Create an account</legend>
          <FormField
            label="Your name" name="name" type="text" autoComplete="name" placeholder="Alex Morgan"
            maxLength={50} required value={form.values.name} onChange={form.updateField} error={form.fieldErrors.name}
          />
          <FormField
            label="Email address" name="email" type="email" autoComplete="email" autoCapitalize="none"
            spellCheck={false} placeholder="you@example.com" required
            value={form.values.email} onChange={form.updateField} error={form.fieldErrors.email}
          />
          <FormField
            label="Password" name="password" type={form.showPassword ? 'text' : 'password'}
            autoComplete="new-password" placeholder="Create a strong password" required
            value={form.values.password} onChange={form.updateField} error={form.fieldErrors.password}
            hint="At least 8 characters, with a letter and a number."
            showPassword={form.showPassword} onToggle={form.togglePassword}
          />
          <button type="submit" className="button-primary mt-1 w-full" disabled={form.pending}>
            {form.pending ? <><Spinner /> Creating your account...</> : <>Create account <ArrowRight size={17} /></>}
          </button>
        </fieldset>
      </form>

      <p className="mt-3.5 text-center text-xs text-muted sm:mt-4 sm:text-[13px]">
        Already have an account?{' '}
        <Link to="/login" className="text-link inline-flex items-center">Sign in</Link>
      </p>
      <div className="mt-3.5 flex items-center justify-center gap-2 border-t border-line pt-3 text-[11px] text-muted sm:mt-4 sm:pt-3.5">
        <LockKeyhole size={13} aria-hidden="true" />
        Your space starts with a secure sign-in.
      </div>
    </AuthLayout>
  );
}
