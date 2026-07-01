import LanguageToggle from './LanguageToggle';

interface HeroProps {
  topicCount: number;
  phraseCount: number;
}

export default function Hero({ topicCount, phraseCount }: HeroProps) {
  return (
    <div className="bg-surface border border-border rounded-[var(--radius-lg)] p-8 pb-7 mb-6 relative overflow-hidden shadow-sm">
      <div
        className="absolute top-0 right-0 w-[220px] h-[220px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, #d4edde 0%, transparent 70%)',
        }}
      />
      <div className="inline-flex items-center gap-1.5 bg-accent-light text-accent-text border border-accent-mid rounded-full px-2.5 py-[3px] text-[11px] font-semibold tracking-wider uppercase mb-3">
        <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 9L12 5L2 9L12 13L22 9Z" /><path d="M6 10.6V16a6 6 0 0 0 12 0v-5.4" />
        </svg>
        Goethe Institut A1
      </div>
      <h1 className="text-[26px] font-semibold text-text-primary tracking-tight leading-tight mb-1.5">
        Deutsch <span className="text-accent">Phrasebook</span>
      </h1>
      <p className="text-sm text-text-secondary leading-relaxed max-w-[480px]">
        14 essential topics for the Goethe A1 exam — real phrases, grammar tips, and natural fluency practice.
      </p>
      <div className="flex items-center gap-4 mt-5 pt-5 border-t border-border flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
          <svg className="w-[15px] h-[15px] text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <strong className="text-text-primary">{topicCount}</strong> topics
        </div>
        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
          <svg className="w-[15px] h-[15px] text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <strong className="text-text-primary">{phraseCount}+</strong> phrases
        </div>
        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
          <svg className="w-[15px] h-[15px] text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v12" /><path d="M8 10v2" /><path d="M16 10v2" /><path d="M10 7V5" /><path d="M14 7V5" />
            <path d="M10 16v2a2 2 0 0 0 4 0v-2" />
          </svg>
          Grammar tips
        </div>
        <LanguageToggle />
      </div>
    </div>
  );
}
