'use client';

import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch {}
  }

  return (
    <button
      onClick={toggle}
      className="dark-mode-toggle w-[34px] h-[34px] rounded-[10px] flex items-center justify-center cursor-pointer transition-colors duration-200 bg-surface-2 border border-border hover:border-border-strong"
      aria-label="Toggle dark mode"
    >
      {dark ? (
        <svg className="w-[17px] h-[17px] text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ) : (
        <svg className="w-[17px] h-[17px] text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
