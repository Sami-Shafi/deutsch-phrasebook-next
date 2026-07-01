'use client';

import { useApp } from '@/lib/app-data';

export default function TipBox() {
  const { selectedTopic, isBN } = useApp();

  if (!selectedTopic) return null;

  const content = isBN ? selectedTopic.tip : selectedTopic.tipEN;

  return (
    <div className="bg-accent-light border border-accent-mid border-l-[3px] border-l-accent rounded-[var(--radius)] p-3 mt-6 flex gap-2.5 items-start text-xs text-accent-text leading-relaxed">
      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v12" /><path d="M8 10v2" /><path d="M16 10v2" /><path d="M10 7V5" /><path d="M14 7V5" />
        <path d="M10 16v2a2 2 0 0 0 4 0v-2" />
      </svg>
      <span className={isBN ? 'bn-text' : ''} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
