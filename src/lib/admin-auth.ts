'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SESSION_COOKIE = 'admin_session';
const SESSION_VALUE = 'authenticated';

export async function login(password: string): Promise<boolean> {
  if (password !== ADMIN_PASSWORD) return false;
  const c = await cookies();
  c.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/admin',
  });
  return true;
}

export async function logout(): Promise<void> {
  const c = await cookies();
  c.delete(SESSION_COOKIE);
  redirect('/admin/login');
}

export async function isAuthenticated(): Promise<boolean> {
  const c = await cookies();
  return c.get(SESSION_COOKIE)?.value === SESSION_VALUE;
}

export async function requireAuth(): Promise<void> {
  if (!(await isAuthenticated())) {
    redirect('/admin/login');
  }
}
