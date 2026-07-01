'use client';

import { AppProvider, useApp } from '@/lib/app-data';
import Hero from './Hero';
import TopicGrid from './TopicGrid';
import ContentPanel from './ContentPanel';
import Placeholder from './Placeholder';
import DarkModeToggle from './DarkModeToggle';
import type { Topic, TranslationMap, GroupTitleMap } from '@/types';

function PhrasebookContent({ topicCount, phraseCount }: { topicCount: number; phraseCount: number }) {
  const { selectedTopic } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-5 py-6 sm:py-8 pb-16">
      <div className="flex justify-end mb-3">
        <DarkModeToggle />
      </div>
      <Hero topicCount={topicCount} phraseCount={phraseCount} />
      <TopicGrid />
      {selectedTopic ? (
        <div className="animate-fade-in-up" key={selectedTopic.id}>
          <ContentPanel />
        </div>
      ) : (
        <Placeholder visible={true} />
      )}
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
