import { Link, Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/characters" className="text-2xl font-black text-pink-600 tracking-tighter">
            RICK & MORTY
          </Link>
          <div className="flex gap-6">
            <Link to="/characters" className="font-bold text-gray-600 hover:text-pink-500 transition-colors">Personajes</Link>
            <Link to="/favorites" className="font-bold text-gray-600 hover:text-pink-500 transition-colors">Favoritos</Link>
          </div>
        </div>
      </nav>
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};