'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Topic, TranslationMap, GroupTitleMap } from '@/types';

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

  return (
    <AppContext.Provider value={{ ...state, toggleLang, selectTopic, topics, setTopics, translations: initialTranslations, groupTitles: initialGroupTitles }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
