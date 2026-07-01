'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Topic } from '@/types';

export default function NewTopicPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [topic, setTopic] = useState<Partial<Topic>>({
    icon: 'ti-book',
    name: '',
    sub: '',
    groups: [{ title: 'New Group', phrases: [{ de: '', en: '' }] }],
    tip: '',
    tipEN: '',
  });

  const inputClass = "w-full px-3 py-2 border border-border rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";
  const labelClass = "text-xs font-medium text-text-secondary mb-1 block";

  async function handleSave() {
    if (!topic.name) { setError('Topic name is required'); return; }
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(topic),
      });
      if (!res.ok) throw new Error('Save failed');
      router.push('/admin');
    } catch {
      setError('Failed to create topic');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-text-primary">New Topic</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-accent text-white rounded-[var(--radius)] text-sm font-medium hover:bg-accent/90 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Creating...' : 'Create'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-[var(--radius)] p-3 mb-4">{error}</div>
      )}

      <div className="bg-surface border border-border rounded-[var(--radius-lg)] p-6 shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClass}>Topic Name</label>
            <input className={inputClass} value={topic.name} onChange={e => setTopic({ ...topic, name: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Icon (Tabler class)</label>
            <input className={inputClass} value={topic.icon} onChange={e => setTopic({ ...topic, icon: e.target.value })} />
          </div>
        </div>
        <div className="mb-4">
          <label className={labelClass}>Subtitle</label>
          <input className={inputClass} value={topic.sub} onChange={e => setTopic({ ...topic, sub: e.target.value })} />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-3 border-2 border-dashed border-border-strong rounded-[var(--radius-lg)] text-sm text-text-muted hover:text-accent hover:border-accent transition-colors"
      >
        + Add groups and phrases after creating
      </button>
    </div>
  );
}
