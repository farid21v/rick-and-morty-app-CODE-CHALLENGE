import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCharacterById, Character } from '../../services/api/characters.service';

export const CharacterDetailPage = () => {
  const { id } = useParams(); // Obtiene el ID de la URL (/characters/1)
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getCharacterById(id);
        setCharacter(data);
      } catch (err) {
        console.error("Error cargando el personaje:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  // Pantalla de Carga
  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
    </div>
  );

  // Pantalla de Error
  if (error || !character) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-gray-800">Personaje no encontrado</h2>
      <button onClick={() => navigate('/characters')} className="mt-4 text-pink-600 font-bold">
        Volver al listado
      </button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10">
      {/* Botón Volver */}
      <button 
        onClick={() => navigate(-1)}
        className="group mb-8 flex items-center gap-2 text-gray-500 hover:text-pink-600 font-bold transition-all"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Volver al listado
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
        
        {/* Lado Izquierdo: Imagen */}
        <div className="w-full md:w-2/5 h-[400px] md:h-auto">
          <img 
            src={character.image} 
            alt={character.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Lado Derecho: Info detallada */}
        <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-4">
            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
              character.status === 'Alive' ? 'bg-green-100 text-green-600' : 
              character.status === 'Dead' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
            }`}>
              {character.status}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
            {character.name}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
            <DetailItem label="Especie" value={character.species} />
            <DetailItem label="Género" value={character.gender} />
            <DetailItem label="Origen" value={character.origin.name} />
            <DetailItem label="Ubicación" value={character.location.name} />
          </div>
          
          <div className="mt-10 pt-10 border-t border-gray-100">
            <p className="text-gray-400 text-sm">
              Este personaje ha aparecido en <span className="text-pink-600 font-bold">{character.episode.length}</span> episodios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para las etiquetas de información
const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{label}</span>
    <span className="text-gray-900 font-bold text-lg">{value}</span>
  </div>
);