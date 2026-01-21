import { Link } from 'react-router-dom';
import { Character } from '../../services/api/characters.service';

interface Props {
  character: Character;
  isFavorite?: boolean;
  // Ajustado para recibir el objeto completo y no solo el ID
  onToggleFavorite?: (character: Character) => void; 
}

export const CharacterCard = ({ character, isFavorite, onToggleFavorite }: Props) => {
  // Mapeo de colores para el indicador de estado
  const statusColors: Record<string, string> = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-400'
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
      {/* Contenedor de Imagen */}
      <div className="relative overflow-hidden">
        <img 
          src={character.image} 
          alt={character.name} 
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Botón de Favoritos (Corazón) */}
        <div className="absolute top-3 right-3">
          <button 
            onClick={(e) => {
              e.preventDefault(); // Evita cualquier comportamiento no deseado del Link
              onToggleFavorite?.(character); // Envía el objeto completo al hook
            }}
            className={`p-2 w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-all duration-300 transform active:scale-90 ${
              isFavorite 
                ? 'bg-pink-500 text-white' 
                : 'bg-white/90 backdrop-blur-sm text-gray-400 hover:text-pink-500'
            }`}
            title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <span className="text-xl leading-none">♥</span>
          </button>
        </div>
      </div>

      {/* Información del Personaje */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          {/* Indicador de Status dinámico */}
          <span className={`w-2 h-2 rounded-full ${statusColors[character.status] || 'bg-gray-400'}`}></span>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {character.status} - {character.species}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 truncate mb-4">
          {character.name}
        </h3>

        {/* Botón de navegación a detalles */}
        <Link 
          to={`/characters/${character.id}`}
          className="block w-full text-center py-2.5 px-4 rounded-xl bg-gray-50 text-gray-700 font-bold hover:bg-pink-600 hover:text-white transition-all duration-300 border border-gray-100 hover:border-pink-600"
        >
          Detalles
        </Link>
      </div>
    </div>
  );
};