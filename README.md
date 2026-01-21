# Rick & Morty app - Code Challenge 🚀

Esta es una aplicación web para un Code Challenge. Permite a los usuarios explorar el universo de Rick & Morty con una interfaz moderna, fluida y totalmente responsiva.

## ✨ Características Principales

- **Buscador con Debounce:** Optimización de peticiones a la API mediante un retraso inteligente.
- **Filtros Dinámicos:** Filtrado por estado (Alive, Dead, Unknown).
- **Sistema de Favoritos:** Persistencia de datos mediante `localStorage`.
- **Navegación Avanzada:** Rutas dinámicas para visualizar detalles técnicos profundos.
- **UI/UX Polish:** Skeleton Loaders, Glassmorphism y diseño 100% responsivo.

## 🛠️ Stack Tecnológico

El proyecto utiliza las siguientes tecnologías (se instalan automáticamente):

- **React 18** + **TypeScript**
- **Tailwind CSS v4** (Diseño y Estilos)
- **Vite** (Herramienta de construcción)
- **React Router Dom** (Navegación)

## 🚀 Instalación y Ejecución

Sigue estos pasos detallados para ejecutar el proyecto correctamente. **Es muy importante entrar en la carpeta del proyecto antes de instalar.**

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/farid21v/rick-and-morty-app-CODE-CHALLENGE.git](https://github.com/farid21v/rick-and-morty-app-CODE-CHALLENGE.git)
   ```

2. **Entrar en la carpeta del código:**
   Debido a la estructura del reto, los archivos de configuración se encuentran en la subcarpeta `vite-temp`.
   ```bash
   cd vite-temp
   ```

3. **Instalar las dependencias:**
   Este comando instalará React, Tailwind y todas las librerías necesarias.
   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abrir la aplicación:**
   Accede a [http://localhost:5173](http://localhost:5173) en tu navegador.

## 📁 Estructura de Carpetas

Para este proyecto, el código fuente y la configuración principal están organizados de la siguiente manera:

```text
CODE CHALLENGE/
 └── vite-temp/      <-- Carpeta raíz del proyecto (Aquí se ejecutan los comandos)
      ├── src/       # Código fuente (App, Components, Pages, Services)
      ├── public/    # Recursos estáticos
      └── package.json
```

---
Desarrollado con dedicación para el proceso de selección de **Pink Technologies**.

## 🧠 Decisiones Técnicas

- **Debounce Search:** Se implementó un retraso de 500ms en la búsqueda por nombre para evitar llamadas excesivas a la API mientras el usuario escribe, optimizando el consumo de recursos y mejorando la performance.
- **Persistencia en LocalStorage:** Se optó por almacenar únicamente los IDs de los personajes favoritos. Esto asegura que la aplicación sea ligera y que la información siempre esté actualizada al consultar los detalles directamente de la API al cargar la lista de favoritos.
- **Arquitectura de Servicios:** Se centralizaron las peticiones fetch en un servicio dedicado (`characters.service.ts`), permitiendo un tipado fuerte con TypeScript y facilitando el mantenimiento si la URL de la API llegara a cambiar.
- **Atomic Design UI:** Los componentes como `CharacterCard` y `SkeletonCard` fueron diseñados para ser agnósticos; funcionan igual de bien en la búsqueda general como en la vista de favoritos.

## 🛠️ ¿Qué haría diferente con más tiempo?

1. **Gestión de Estado Global (Zustand o Redux):** Aunque para este reto el estado local y `localStorage` son suficientes, para una aplicación de mayor escala implementaría **Zustand**. Esto permitiría sincronizar los favoritos entre la página de lista y la de detalles de forma instantánea sin recargar datos.
2. **Testing Unitario:** Añadiría pruebas con **Vitest** y **React Testing Library** para asegurar que los filtros y la lógica de favoritos no se rompan ante futuros cambios.
3. **Paginación Infinita:** En lugar de una paginación por botones, implementaría un **Infinite Scroll** utilizando el `Intersection Observer API` para una navegación más fluida y moderna.
4. **Internacionalización (i18n):** Prepararía la app para soportar múltiples idiomas (Español/Inglés) separando todos los textos en archivos de traducción.
5. **Caché de Consultas:** Utilizaría **TanStack Query (React Query)** para manejar el estado de las peticiones. Esto permitiría cachear los resultados de los personajes ya visitados, eliminando los tiempos de carga al navegar hacia atrás.
