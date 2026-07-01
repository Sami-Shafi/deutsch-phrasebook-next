'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import type { Topic, PhraseGroup, Phrase } from '@/types';

export default function EditTopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/topics/${id}`)
      .then(r => r.json())
      .then(d => { setTopic(d); setLoading(false); })
      .catch(() => { setError('Failed to load topic'); setLoading(false); });
  }, [id]);

  function updateField<K extends keyof Topic>(key: K, value: Topic[K]) {
    if (!topic) return;
    setTopic({ ...topic, [key]: value });
  }

  function updateGroup(index: number, group: PhraseGroup) {
    if (!topic) return;
    const groups = [...topic.groups];
    groups[index] = group;
    setTopic({ ...topic, groups });
  }

  function addGroup() {
    if (!topic) return;
    setTopic({
      ...topic,
      groups: [...topic.groups, { title: 'New Group', phrases: [{ de: '', en: '' }] }],
    });
  }

  function removeGroup(index: number) {
    if (!topic) return;
    setTopic({ ...topic, groups: topic.groups.filter((_, i) => i !== index) });
  }

  function addPhrase(groupIndex: number) {
    if (!topic) return;
    const groups = [...topic.groups];
    groups[groupIndex] = {
      ...groups[groupIndex],
      phrases: [...groups[groupIndex].phrases, { de: '', en: '' }],
    };
    setTopic({ ...topic, groups });
  }

  function updatePhrase(groupIndex: number, phraseIndex: number, phrase: Phrase) {
    if (!topic) return;
    const groups = [...topic.groups];
    const phrases = [...groups[groupIndex].phrases];
    phrases[phraseIndex] = phrase;
    groups[groupIndex] = { ...groups[groupIndex], phrases };
    setTopic({ ...topic, groups });
  }

  function removePhrase(groupIndex: number, phraseIndex: number) {
    if (!topic) return;
    const groups = [...topic.groups];
    groups[groupIndex] = {
      ...groups[groupIndex],
      phrases: groups[groupIndex].phrases.filter((_, i) => i !== phraseIndex),
    };
    setTopic({ ...topic, groups });
  }

  async function handleSave() {
    if (!topic) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(topic),
      });
      if (!res.ok) throw new Error('Save failed');
      router.push('/admin');
    } catch {
      setError('Failed to save topic');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!topic || !confirm('Delete this topic and all its phrases?')) return;
    setSaving(true);
    try {
      await fetch(`/api/topics/${id}`, { method: 'DELETE' });
      router.push('/admin');
    } catch {
      setError('Failed to delete topic');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="text-text-secondary p-8 text-center">Loading...</div>;
  if (!topic) return <div className="text-red-500 p-8 text-center">{error || 'Topic not found'}</div>;

  const inputClass = "w-full px-3 py-2 border border-border rounded-[var(--radius)] text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent";
  const labelClass = "text-xs font-medium text-text-secondary mb-1 block";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-text-primary">Edit Topic</h1>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="px-4 py-2 border border-red-300 text-red-600 rounded-[var(--radius)] text-sm hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-accent text-white rounded-[var(--radius)] text-sm font-medium hover:bg-accent/90 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-[var(--radius)] p-3 mb-4">
          {error}
        </div>
      )}

      <div className="bg-surface border border-border rounded-[var(--radius-lg)] p-6 shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelClass}>Topic Name</label>
            <input className={inputClass} value={topic.name} onChange={e => updateField('name', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Icon (Tabler class, e.g. ti-user)</label>
            <input className={inputClass} value={topic.icon} onChange={e => updateField('icon', e.target.value)} />
          </div>
        </div>
        <div className="mb-4">
          <label className={labelClass}>Subtitle</label>
          <input className={inputClass} value={topic.sub} onChange={e => updateField('sub', e.target.value)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Tip (Bangla)</label>
            <textarea className={inputClass + ' h-20'} value={topic.tip} onChange={e => updateField('tip', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Tip (English)</label>
            <textarea className={inputClass + ' h-20'} value={topic.tipEN} onChange={e => updateField('tipEN', e.target.value)} />
          </div>
        </div>
      </div>

      {topic.groups.map((group, gi) => (
        <div key={gi} className="bg-surface border border-border rounded-[var(--radius-lg)] p-6 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-4">
            <input
              className={inputClass + ' font-medium max-w-md'}
              value={group.title}
              onChange={e => updateGroup(gi, { ...group, title: e.target.value })}
              placeholder="Group title"
            />
            <button
              onClick={() => removeGroup(gi)}
              className="text-xs text-red-500 hover:text-red-700 transition-colors"
            >
              Remove group
            </button>
          </div>

          <div className="space-y-2">
            {group.phrases.map((phrase, pi) => (
              <div key={pi} className="flex gap-2 items-start">
                <input
                  className={inputClass + ' flex-1'}
                  value={phrase.de}
                  onChange={e => updatePhrase(gi, pi, { ...phrase, de: e.target.value })}
                  placeholder="German"
                />
                <input
                  className={inputClass + ' flex-1'}
                  value={phrase.en}
                  onChange={e => updatePhrase(gi, pi, { ...phrase, en: e.target.value })}
                  placeholder="English"
                />
                <button
                  onClick={() => removePhrase(gi, pi)}
                  className="p-2 text-text-muted hover:text-red-500 transition-colors flex-shrink-0"
                  title="Remove phrase"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18" /><path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => addPhrase(gi)}
            className="mt-3 text-xs text-accent font-medium hover:text-accent-text transition-colors"
          >
            + Add phrase
          </button>
        </div>
      ))}

      <button
        onClick={addGroup}
        className="w-full py-3 border-2 border-dashed border-border-strong rounded-[var(--radius-lg)] text-sm text-text-muted hover:text-accent hover:border-accent transition-colors"
      >
        + Add group
      </button>
    </div>
  );
}
