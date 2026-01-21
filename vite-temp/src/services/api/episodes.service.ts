import { apiFetch } from './client';

export interface Episode {
  id: number;
  name: string;
  episode: string;
}

export function getEpisodesByIds(ids: number[]) {
  return apiFetch<Episode[] | Episode>(`/episode/${ids.join(',')}`);
}
