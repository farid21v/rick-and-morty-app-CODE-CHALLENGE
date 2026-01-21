import { Routes, Route, Navigate } from 'react-router-dom';
import { CharactersPage } from '../pages/Characters/CharactersPage';
import { FavoritesPage } from '../pages/Favorites/FavoritesPage';
import { CharacterDetailPage } from '../pages/CharacterDetail/CharacterDetailPage'; 
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/characters" />} />
      <Route path="/characters" element={<CharactersPage />} />
      <Route path="/characters/:id" element={<CharacterDetailPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
}
