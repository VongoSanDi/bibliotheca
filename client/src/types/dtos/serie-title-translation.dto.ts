export interface SerieTitleTranslation {
  id: number;
  serie_id: number;
  translated_title: string;
  language_id: number;
}

export interface GetSerieTitleTranslationParams {
  serie_id?: number;
  translated_title?: string;
}
