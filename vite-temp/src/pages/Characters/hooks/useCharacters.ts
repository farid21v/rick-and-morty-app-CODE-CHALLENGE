import { useEffect, useState } from 'react';
import { getCharacters, Character } from '@/services/api/characters.service';

interface Filters {
  page: number;
  name?: string;
  status?: string;
  species?: string;
}

export function useCharacters(filters: Filters) {
  const [data, setData] = useState<Character[]>([]);
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getCharacters(filters)
      .then(response => {
        setData(response.results || []);
        setInfo(response.info);
      })
      .catch(() => {
        setError('Error cargando personajes');
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [filters.page, filters.name, filters.status, filters.species]);

  return {
    data,
    info,
    loading,
    error,
  };
}
