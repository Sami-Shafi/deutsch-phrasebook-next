'use client';

import { useApp } from '@/lib/app-data';

export default function T({ k }: { k: string }) {
  const { t } = useApp();
  return t(k);
}
