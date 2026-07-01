import { getTopics, getTopicCount, getPhraseCount, getTranslations, getGroupTitles } from '@/lib/data';
import PhrasebookApp from '@/components/PhrasebookApp';

export default function Home() {
  const topics = getTopics();
  const topicCount = getTopicCount();
  const phraseCount = getPhraseCount();
  const translations = getTranslations();
  const groupTitles = getGroupTitles();

  return (
    <PhrasebookApp
      topics={topics}
      topicCount={topicCount}
      phraseCount={phraseCount}
      translations={translations}
      groupTitles={groupTitles}
    />
  );
}
