'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/lib/admin-auth';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/topics', label: 'Topics' },
  ];

  async function handleLogout() {
    await logout();
    router.push('/admin/login');
  }

  return (
    <nav className="bg-surface border-b border-border shadow-sm">
      <div className="max-w-5xl mx-auto px-4 flex items-center h-14 gap-6">
        <span className="text-sm font-semibold text-accent">Phrasebook CRM</span>
        <div className="flex gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                pathname === l.href
                  ? 'bg-accent-light text-accent-text font-medium'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="ml-auto">
          <button
            onClick={handleLogout}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
