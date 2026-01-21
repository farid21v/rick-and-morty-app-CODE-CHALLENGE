import { useEffect, useState } from 'react';
import { getCharacterById } from '@/services/api/characters.service';
import { getEpisodesByIds, Episode } from '@/services/api/episodes.service';

export function useCharacterDetail(id: string) {
  const [character, setCharacter] = useState<any>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        setError(null);

        const characterData = await getCharacterById(id);
        setCharacter(characterData);

        const episodeIds = characterData.episode.map((url: string) =>
          Number(url.split('/').pop())
        );

        if (episodeIds.length > 0) {
          const episodesData = await getEpisodesByIds(episodeIds);
          setEpisodes(Array.isArray(episodesData) ? episodesData : [episodesData]);
        }
      } catch {
        setError('Error cargando el personaje');
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id]);

  return {
    character,
    episodes,
    loading,
    error,
  };
}
