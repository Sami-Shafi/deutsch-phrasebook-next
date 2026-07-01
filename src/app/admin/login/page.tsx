'use client';

import { useState, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/admin-auth';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError('');
    try {
      const ok = await login(password);
      if (ok) {
        router.push('/admin');
      } else {
        setError('Invalid password');
      }
    } catch {
      setError('An error occurred');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-[var(--radius-lg)] p-8 w-full max-w-sm shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-text-primary">Admin Login</h1>
          <p className="text-sm text-text-secondary mt-1">Deutsch Phrasebook CRM</p>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-[var(--radius)] p-3 mb-4">
            {error}
          </div>
        )}
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter admin password"
          className="w-full px-4 py-2.5 border border-border rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent mb-4"
          autoFocus
        />
        <button
          type="submit"
          disabled={pending}
          className="w-full py-2.5 bg-accent text-white rounded-[var(--radius)] text-sm font-medium hover:bg-accent/90 disabled:opacity-50 transition-colors"
        >
          {pending ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
