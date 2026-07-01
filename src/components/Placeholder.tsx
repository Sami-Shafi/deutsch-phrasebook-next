export default function Placeholder({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="bg-surface border-2 border-dashed border-border-strong rounded-[var(--radius-lg)] text-center py-16 px-8 text-text-muted">
      <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-border flex items-center justify-center mx-auto mb-4">
        <svg className="w-[30px] h-[30px] text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      </div>
      <p className="text-base mb-1.5">Wähle ein Thema</p>
      <span className="text-xs text-text-muted">Select a topic above to explore phrases and vocabulary</span>
    </div>
  );
}
