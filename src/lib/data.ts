import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { Topic, TranslationMap, GroupTitleMap } from '@/types';

let cachedTopics: Topic[] | null = null;
let cachedTranslations: TranslationMap | null = null;
let cachedGroupTitles: GroupTitleMap | null = null;

function dataDir() {
  return join(process.cwd(), 'src', 'data');
}

export function getTopics(): Topic[] {
  if (cachedTopics) return cachedTopics;
  const path = join(dataDir(), 'topics.json');
  cachedTopics = JSON.parse(readFileSync(path, 'utf-8'));
  return cachedTopics!;
}

export function getTopic(id: number): Topic | undefined {
  return getTopics().find(t => t.id === id);
}

export function getTopicCount(): number {
  return getTopics().length;
}

export function getPhraseCount(): number {
  return getTopics().reduce((sum, t) =>
    sum + t.groups.reduce((s, g) => s + g.phrases.length, 0), 0);
}

export function getTranslations(): TranslationMap {
  if (cachedTranslations) return cachedTranslations;
  const path = join(dataDir(), 'bn-translations.json');
  cachedTranslations = JSON.parse(readFileSync(path, 'utf-8'));
  return cachedTranslations!;
}

export function getGroupTitles(): GroupTitleMap {
  if (cachedGroupTitles) return cachedGroupTitles;
  const path = join(dataDir(), 'bn-group-titles.json');
  cachedGroupTitles = JSON.parse(readFileSync(path, 'utf-8'));
  return cachedGroupTitles!;
}

export function saveTopics(topics: Topic[]): void {
  const path = join(dataDir(), 'topics.json');
  writeFileSync(path, JSON.stringify(topics, null, 2));
  cachedTopics = topics;
}

export function saveTranslations(translations: TranslationMap): void {
  const path = join(dataDir(), 'bn-translations.json');
  writeFileSync(path, JSON.stringify(translations, null, 2));
  cachedTranslations = translations;
}

export function saveGroupTitles(titles: GroupTitleMap): void {
  const path = join(dataDir(), 'bn-group-titles.json');
  writeFileSync(path, JSON.stringify(titles, null, 2));
  cachedGroupTitles = titles;
}
