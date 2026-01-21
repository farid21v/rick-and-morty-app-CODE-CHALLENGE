import { useEffect, useState } from 'react';
import { Character, getCharacterById } from '../../services/api/characters.service';
import { CharacterCard } from '../../components/UI/CharacterCard';
import { Link } from 'react-router-dom';

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Cargar los IDs de localStorage y luego pedir los datos a la API
  const loadFavorites = async () => {
    const savedIds: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (savedIds.length === 0) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      // Si hay favoritos, pedimos los datos de esos IDs específicos
      // La API acepta /character/[1,2,3]
      const response = await fetch(`https://rickandmortyapi.com/api/character/${savedIds.join(',')}`);
      const data = await response.json();
      
      // Si solo hay un favorito, la API devuelve un objeto, si hay varios, un array.
      // Normalizamos para que siempre sea un array.
      setFavorites(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error cargando favoritos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  // 2. Función para quitar de favoritos desde esta misma página
  const handleRemoveFavorite = (character: Character) => {
    const savedIds: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedIds = savedIds.filter(id => id !== character.id);
    localStorage.setItem('favorites', JSON.stringify(updatedIds));
    
    // Actualizamos el estado local para que desaparezca de la vista inmediatamente
    setFavorites(prev => prev.filter(fav => fav.id !== character.id));
  };

  if (loading) return <div className="p-20 text-center font-bold text-gray-400">Cargando tus favoritos...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-gray-900">Mis Favoritos</h1>
        <Link to="/characters" className="text-pink-600 font-bold hover:underline">
          ← Explorar más
        </Link>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((char) => (
            <CharacterCard 
              key={char.id} 
              character={char} 
              isFavorite={true} // Siempre es true en esta página
              onToggleFavorite={handleRemoveFavorite} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
          <p className="text-gray-400 text-xl mb-6">Aún no tienes personajes favoritos.</p>
          <Link 
            to="/characters" 
            className="inline-block bg-pink-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-pink-200 hover:bg-pink-700 transition-all"
          >
            Buscar Personajes
          </Link>
        </div>
      )}
    </div>
  );
};