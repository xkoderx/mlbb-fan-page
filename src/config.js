// URL base de la MLBB Heroes API.
//
// Por defecto apunta a la API desplegada en Render.
// Para desarrollar en local contra la API en tu propia máquina:
//   VITE_API_URL=http://localhost:3000 npm run dev
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://mlbb-heroes-api.onrender.com';

// Documentación de la API (con probador en vivo).
export const API_DOCS_URL = `${API_BASE_URL}/docs`;

// Código fuente de la API.
export const API_REPO_URL = 'https://github.com/xkoderx/mlbb-heroes-api';

// Repositorio de datos original (fuente de los héroes).
export const DATA_SOURCE_URL = 'https://github.com/p3hndrx/MLBB-API';
