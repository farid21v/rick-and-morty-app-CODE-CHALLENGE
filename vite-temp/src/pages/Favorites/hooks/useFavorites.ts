import { useEffect, useState } from 'react';

const STORAGE_KEY = 'favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  function toggleFavorite(character: any) {
    setFavorites(prev => {
      const exists = prev.some(item => item.id === character.id);
      const updated = exists
        ? prev.filter(item => item.id !== character.id)
        : [...prev, character];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function isFavorite(id: number) {
    return favorites.some(item => item.id === id);
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}
