import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-6 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <Link to="/characters" className="text-2xl font-extrabold text-pink-600 tracking-tight">
        RICK<span className="text-gray-900">&</span>MORTY
      </Link>
      <div className="flex gap-8">
        <Link to="/characters" className="text-gray-600 hover:text-pink-600 font-semibold transition-colors">
          Personajes
        </Link>
        <Link to="/favorites" className="text-gray-600 hover:text-pink-600 font-semibold transition-colors">
          Favoritos
        </Link>
      </div>
    </nav>
  );
};