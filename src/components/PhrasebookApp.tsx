'use client';

import { AppProvider, useApp } from '@/lib/app-data';
import Hero from './Hero';
import TopicGrid from './TopicGrid';
import ContentPanel from './ContentPanel';
import Placeholder from './Placeholder';
import type { Topic, TranslationMap, GroupTitleMap } from '@/types';

function PhrasebookContent({ topicCount, phraseCount }: { topicCount: number; phraseCount: number }) {
  const { selectedTopic } = useApp();

  return (
    <div className="max-w-[860px] mx-auto px-5 py-8 pb-16">
      <Hero topicCount={topicCount} phraseCount={phraseCount} />
      <TopicGrid />
      {selectedTopic ? <ContentPanel /> : <Placeholder visible={true} />}
    </div>
  );
}

export default function PhrasebookApp({
  topics,
  topicCount,
  phraseCount,
  translations,
  groupTitles,
}: {
  topics: Topic[];
  topicCount: number;
  phraseCount: number;
  translations: TranslationMap;
  groupTitles: GroupTitleMap;
}) {
  return (
    <AppProvider initialTopics={topics} initialTranslations={translations} initialGroupTitles={groupTitles}>
      <PhrasebookContent topicCount={topicCount} phraseCount={phraseCount} />
    </AppProvider>
  );
}
