import { apiFetch } from './client';

export interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

// Interfaz extendida para la página de detalles
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  gender: string;          // Añadido
  origin: { name: string }; // Añadido
  location: { name: string }; // Añadido
  episode: string[];       // Añadido
}

export function getCharacters(params: {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
}) {
  const query = new URLSearchParams();

  if (params.page) query.append('page', String(params.page));
  if (params.name) query.append('name', params.name);
  if (params.status) query.append('status', params.status);
  if (params.species) query.append('species', params.species);

  return apiFetch<CharactersResponse>(`/character?${query.toString()}`);
}

// Tipado corregido para que el componente de detalle no dé error
export function getCharacterById(id: string | number) {
  return apiFetch<Character>(`/character/${id}`);
}