'use client';

import { useApp } from '@/lib/app-data';
import T from './T';

export default function TopicGrid() {
  const { topics, selectedTopic, selectTopic } = useApp();

  return (
    <>
      <div className="text-[11px] font-semibold tracking-widest uppercase text-text-muted mb-2.5 pl-0.5">
        <T k="Choose a topic" />
      </div>
      <div className="grid gap-2 mb-7 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {topics.map((t, i) => {
          const active = selectedTopic?.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => selectTopic(t)}
              className={`topic-btn animate-fade-in-up group relative flex flex-col items-center gap-1.5 p-3.5 px-2 pb-3 rounded-[var(--radius)] cursor-pointer text-center overflow-hidden ${
                active
                  ? 'bg-accent-light border-accent shadow-[0_0_0_3px_rgba(45,106,79,0.1)]'
                  : 'bg-surface border-border shadow-sm hover:border-border-strong'
              } border`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="text-[9.5px] font-semibold tracking-wider text-text-muted">
                {String(t.id).padStart(2, '0')}
              </span>
              <div className={`w-[38px] h-[38px] rounded-[10px] flex items-center justify-center transition-colors duration-150 ${
                active ? 'bg-accent-mid' : 'bg-surface-2 group-hover:bg-de-bg'
              }`}>
                <i className={`ti ${t.icon} text-[19px] transition-colors duration-150 ${
                  active ? 'text-accent-text' : 'text-text-secondary'
                }`} />
              </div>
              <span className={`text-[11.5px] font-medium leading-tight transition-colors duration-150 ${
                active ? 'text-accent-text' : 'text-text-primary'
              }`}>
                {t.name}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
