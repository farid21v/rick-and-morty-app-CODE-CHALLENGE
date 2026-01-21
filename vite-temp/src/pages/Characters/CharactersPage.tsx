import { useState, useEffect } from 'react';
import { getCharacters, Character } from '../../services/api/characters.service';
import { CharacterCard } from '../../components/UI/CharacterCard';
import { SkeletonCard } from '../../components/UI/SkeletonCard';

export const CharactersPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');
  
  // ESTADO PARA FAVORITOS (Persistencia por ID)
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const loadCharacters = async (currentPage: number, name: string, charStatus: string) => {
    setLoading(true);
    try {
      const data = await getCharacters({ 
        page: currentPage, 
        name: name, 
        status: charStatus 
      });
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (error) {
      console.error("Error cargando personajes:", error);
      setCharacters([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Guardar favoritos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  // Efecto con Debounce para evitar llamadas excesivas a la API
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadCharacters(page, searchTerm, status);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, status, page]);

  /**
   * FIX: La función ahora recibe el objeto Character completo 
   * para coincidir con el tipado de CharacterCard.tsx
   */
  const handleToggleFavorite = (character: Character) => {
    setFavoriteIds(prev => 
      prev.includes(character.id) 
        ? prev.filter(id => id !== character.id) 
        : [...prev, character.id]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-black mb-8 text-gray-900">Personajes</h1>
      
      {/* Contenedor de Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <input 
          type="text" 
          placeholder="Buscar por nombre..." 
          className="flex-1 p-4 border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-pink-500 transition-all bg-white"
          onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
        />
        <select 
          className="p-4 border border-gray-100 rounded-2xl bg-white shadow-sm outline-none focus:ring-2 focus:ring-pink-500 transition-all cursor-pointer font-medium text-gray-600"
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
        >
          <option value="">Todos los estados</option>
          <option value="alive">Vivo</option>
          <option value="dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>
      </div>

      {/* Grid de Personajes o Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          // Muestra 8 tarjetas de carga mientras llega la data
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : characters.length > 0 ? (
          characters.map((char) => (
            <CharacterCard 
              key={char.id} 
              character={char} 
              isFavorite={favoriteIds.includes(char.id)} 
              onToggleFavorite={handleToggleFavorite} 
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-400 text-xl font-medium">No se encontraron personajes.</p>
          </div>
        )}
      </div>

      {/* Controles de Paginación */}
      <div className="flex justify-center items-center gap-6 mt-16 pb-10">
        <button 
          disabled={page === 1 || loading}
          onClick={() => { setPage(p => p - 1); window.scrollTo(0, 0); }}
          className="px-6 py-3 bg-white border border-gray-100 rounded-2xl disabled:opacity-30 font-bold text-gray-700 shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          Anterior
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-pink-600 font-black text-lg">{page}</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-500 font-bold">{totalPages}</span>
        </div>

        <button 
          disabled={page === totalPages || loading}
          onClick={() => { setPage(p => p + 1); window.scrollTo(0, 0); }}
          className="px-6 py-3 bg-pink-600 text-white rounded-2xl disabled:opacity-30 font-bold shadow-lg shadow-pink-200 hover:bg-pink-700 transition-all active:scale-95"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};