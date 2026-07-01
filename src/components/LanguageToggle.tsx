'use client';

import { useApp } from '@/lib/app-data';

export default function LanguageToggle() {
  const { isBN, toggleLang, t } = useApp();

  return (
    <div className={`lang-toggle flex items-center gap-1.5 ${isBN ? 'bn-mode' : 'en-mode'}`}>
      <span className="text-xs font-medium text-text-secondary">{t('Translation:')}</span>
      <div className="flex items-center gap-1 text-xs font-medium">
        <span className={isBN ? 'text-text-secondary' : 'text-accent font-semibold'}>EN</span>
        <span style={{ color: 'var(--color-border-strong)' }}>·</span>
        <span className={isBN ? 'text-accent font-semibold' : 'text-text-secondary'}>বাংলা</span>
      </div>
      <button
        onClick={toggleLang}
        className={`relative w-[52px] h-[26px] rounded-full cursor-pointer transition-colors duration-200 flex-shrink-0 ${
          isBN ? 'bg-accent border-accent' : 'bg-surface-2 border-border-strong'
        } border`}
        aria-label="Toggle language"
      >
        <span
          className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full bg-white shadow transition-transform duration-200 ${
            isBN ? 'translate-x-[26px]' : ''
          }`}
        />
      </button>
    </div>
  );
}
