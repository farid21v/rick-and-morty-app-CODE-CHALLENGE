import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './app/routes';
import { Navbar } from './components/UI/Navbar'; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <BrowserRouter>
      {/* El Navbar se coloca aquí para que sea visible en todas las rutas */}
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        
        {/* El componente principal que contiene las páginas */}
        <main className="flex-grow">
          <AppRoutes />
        </main>

        {/* Opcional: Podrías añadir un Footer aquí más adelante */}
      </div>
    </BrowserRouter>
  );
}

export default App;