import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Personajes', path: '/characters' },
    { name: 'Favoritos', path: '/favorites' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo o Título */}
        <Link to="/characters" className="flex items-center gap-2">
          <span className="text-2xl font-black bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
            Rick & Morty App
          </span>
        </Link>

        {/* Links de Navegación */}
        <div className="flex gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                location.pathname === link.path
                  ? 'bg-pink-50 text-pink-600'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};