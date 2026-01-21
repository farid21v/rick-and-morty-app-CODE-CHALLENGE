import { useState, useEffect } from 'react';
import { Character } from '../services/api/characters.service';

export const useFavorites = () => {
  // 1. Cargar directamente en el estado inicial (evita el "parpadeo" al cargar)
  const [favorites, setFavorites] = useState<Character[]>(() => {
    const saved = localStorage.getItem('rm-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Usar un solo useEffect para sincronizar cambios
  useEffect(() => {
    localStorage.setItem('rm-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (character: Character) => {
    setFavorites((prev) => {
      const isFav = prev.some(fav => fav.id === character.id);
      return isFav 
        ? prev.filter(fav => fav.id !== character.id) 
        : [...prev, character];
    });
  };

  return { favorites, toggleFavorite };
};