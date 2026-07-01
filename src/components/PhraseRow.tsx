'use client';

import type { Phrase } from '@/types';
import { useApp } from '@/lib/app-data';

interface PhraseRowProps {
  phrase: Phrase;
}

export default function PhraseRow({ phrase }: PhraseRowProps) {
  const { isBN, translations } = useApp();
  const right = isBN
    ? <span className="bn-text">{translations[phrase.en] || phrase.en}</span>
    : phrase.en;

  return (
    <tr className="border-b border-border last:border-none hover:bg-de-bg transition-colors duration-100">
      <td className="w-1/2 py-2 px-2 pl-2.5 text-sm leading-relaxed align-top relative text-text-primary font-medium before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-[65%] before:rounded-sm before:bg-accent-mid">
        {phrase.de}
      </td>
      <td className="w-1/2 py-2 px-2 text-sm leading-relaxed align-top text-text-secondary">
        {right}
      </td>
    </tr>
  );
}
