'use client';

import { useApp } from '@/lib/app-data';

export default function TopicGrid() {
  const { topics, selectedTopic, selectTopic } = useApp();

  return (
    <>
      <div className="text-[11px] font-semibold tracking-widest uppercase text-text-muted mb-2.5 pl-0.5">
        Choose a topic
      </div>
      <div className="grid gap-2 mb-7"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}>
        {topics.map(t => {
          const active = selectedTopic?.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => selectTopic(t)}
              className={`topic-btn group relative flex flex-col items-center gap-1.5 p-3.5 px-2.5 pb-3 rounded-[var(--radius)] cursor-pointer text-center transition-all duration-150 overflow-hidden ${
                active
                  ? 'bg-accent-light border-accent shadow-[0_0_0_3px_rgba(45,106,79,0.1)]'
                  : 'bg-surface border-border shadow-sm hover:border-border-strong hover:-translate-y-0.5 hover:shadow-md'
              } border`}
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
