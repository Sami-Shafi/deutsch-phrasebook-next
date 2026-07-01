'use client';

import type { PhraseGroup as PhraseGroupType } from '@/types';
import { useApp } from '@/lib/app-data';
import PhraseRow from './PhraseRow';

interface PhraseGroupProps {
  group: PhraseGroupType;
}

export default function PhraseGroup({ group }: PhraseGroupProps) {
  const { isBN, groupTitles } = useApp();
  const groupTitle = isBN ? (groupTitles[group.title] || group.title) : group.title;

  return (
    <div className="mb-7 last:mb-0">
      <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-border">
        <div className="w-[6px] h-[6px] rounded-full bg-accent flex-shrink-0" />
        <div className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          {groupTitle}
        </div>
      </div>
      <table className="w-full border-collapse">
        <tbody>
          {group.phrases.map((phrase, i) => (
            <PhraseRow key={i} phrase={phrase} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
