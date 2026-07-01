'use client';

import { useApp } from '@/lib/app-data';
import PhraseGroup from './PhraseGroup';
import TipBox from './TipBox';

export default function ContentPanel() {
  const { selectedTopic, isBN } = useApp();

  if (!selectedTopic) return null;

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-lg)] overflow-hidden shadow-sm">
      <div className="p-6 pb-5 border-b border-border bg-gradient-to-br from-white to-[#f7faf8] flex items-start gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-accent-light border border-accent-mid flex items-center justify-center flex-shrink-0">
          <i className={`ti ${selectedTopic.icon} text-[22px] text-accent`} />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-text-primary mb-0.5">{selectedTopic.name}</h2>
          <div className="text-xs text-text-secondary">{selectedTopic.sub}</div>
        </div>
      </div>
      <div className="p-6">
        {selectedTopic.groups.map((group, i) => (
          <PhraseGroup key={i} group={group} />
        ))}
        <TipBox />
      </div>
    </div>
  );
}
