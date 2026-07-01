import { getTopics, getTopicCount, getPhraseCount, getTranslations, getGroupTitles } from '@/lib/data';
import Link from 'next/link';

export default function AdminDashboard() {
  const topics = getTopics();
  const topicCount = getTopicCount();
  const phraseCount = getPhraseCount();
  const translations = getTranslations();
  const groupTitles = getGroupTitles();
  const translatedPhrases = Object.keys(translations).length;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Topics', value: topicCount, color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { label: 'Phrases', value: phraseCount, color: 'bg-green-50 text-green-700 border-green-200' },
          { label: 'BN Translations', value: translatedPhrases, color: 'bg-purple-50 text-purple-700 border-purple-200' },
          { label: 'Group Titles (BN)', value: Object.keys(groupTitles).length, color: 'bg-amber-50 text-amber-700 border-amber-200' },
        ].map(stat => (
          <div key={stat.label} className={`border rounded-[var(--radius-lg)] p-5 ${stat.color}`}>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-[var(--radius-lg)] overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-text-primary">All Topics</h2>
          <Link
            href="/admin/topics/new"
            className="px-3 py-1.5 bg-accent text-white rounded-[var(--radius)] text-xs font-medium hover:bg-accent/90 transition-colors"
          >
            + New Topic
          </Link>
        </div>
        <div className="divide-y divide-border">
          {topics.map(t => (
            <Link
              key={t.id}
              href={`/admin/topics/${t.id}`}
              className="flex items-center gap-3 px-6 py-3.5 hover:bg-surface-2 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-accent-light border border-accent-mid flex items-center justify-center flex-shrink-0">
                <i className={`ti ${t.icon} text-sm text-accent`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary">{t.name}</div>
                <div className="text-xs text-text-muted">{t.groups.length} groups · {t.groups.reduce((s, g) => s + g.phrases.length, 0)} phrases</div>
              </div>
              <span className="text-xs text-text-muted">#{String(t.id).padStart(2, '0')}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
