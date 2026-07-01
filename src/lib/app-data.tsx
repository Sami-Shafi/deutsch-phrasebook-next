'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Topic, TranslationMap, GroupTitleMap } from '@/types';

const uiDict: Record<string, string> = {
  'Translation:': 'অনুবাদ:',
  'Choose a topic': 'একটি টপিক নির্বাচন করুন',
  'Wähle ein Thema': 'একটি টপিক নির্বাচন করুন',
  '14 essential topics for the Goethe A1 exam — real phrases, grammar tips, and natural fluency practice.':
    'Goethe A1 exam এর জন্য ১৪টি প্রয়োজনীয় topic — real phrases, grammar tips এবং natural fluency practice.',
  'Select a topic above to explore phrases and vocabulary':
    'উপরে একটি topic নির্বাচন করে phrases এবং vocabulary দেখুন',
  topics: 'topic',
  phrases: 'phrase',
};

interface AppState {
  isBN: boolean;
  selectedTopic: Topic | null;
}

interface AppContextType extends AppState {
  toggleLang: () => void;
  selectTopic: (topic: Topic | null) => void;
  setTopics: (topics: Topic[]) => void;
  topics: Topic[];
  translations: TranslationMap;
  groupTitles: GroupTitleMap;
  t: (en: string) => string;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({
  children,
  initialTopics,
  initialTranslations,
  initialGroupTitles,
}: {
  children: ReactNode;
  initialTopics: Topic[];
  initialTranslations: TranslationMap;
  initialGroupTitles: GroupTitleMap;
}) {
  const [state, setState] = useState<AppState>({ isBN: false, selectedTopic: null });
  const [topics, setTopics] = useState<Topic[]>(initialTopics);

  const toggleLang = useCallback(() => {
    setState(prev => ({ ...prev, isBN: !prev.isBN }));
  }, []);

  const selectTopic = useCallback((topic: Topic | null) => {
    setState(prev => ({ ...prev, selectedTopic: topic }));
  }, []);

  const t = useCallback((en: string): string => {
    return state.isBN ? (uiDict[en] || en) : en;
  }, [state.isBN]);

  return (
    <AppContext.Provider value={{ ...state, toggleLang, selectTopic, topics, setTopics, translations: initialTranslations, groupTitles: initialGroupTitles, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
