export interface Phrase {
  de: string;
  en: string;
}

export interface PhraseGroup {
  title: string;
  phrases: Phrase[];
}

export interface Topic {
  id: number;
  icon: string;
  name: string;
  sub: string;
  groups: PhraseGroup[];
  tip: string;
  tipEN: string;
}

export interface TranslationMap {
  [key: string]: string;
}

export interface GroupTitleMap {
  [key: string]: string;
}

export interface AppData {
  topics: Topic[];
  bnTranslations: TranslationMap;
  bnGroupTitles: GroupTitleMap;
}
