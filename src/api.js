import { API_BASE_URL } from './config';

// La API vive en Render (plan gratis) y se duerme sin actividad:
// la primera petición tras un rato inactivo puede tardar ~50 s en responder.
// Por eso el tiempo de espera es generoso.
const TIMEOUT_MS = 120000;

async function fetchJson(path, params = {}) {
  const url = new URL(`${API_BASE_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      url.searchParams.set(key, value);
    }
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url.toString(), { signal: controller.signal });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `La API respondió con el código ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('La API tardó demasiado en responder (puede estar despertando). Inténtalo de nuevo.');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// Lista de héroes con filtros del servidor y paginación.
// role: Tank | Fighter | Assassin | Mage | Marksman | Support
// lane: gold lane | mid lane | exp lane | jungle | roam
export function fetchHeroes({ role, lane, search, page, limit }) {
  return fetchJson('/api/heroes', { role, lane, search, page, limit });
}

// Un héroe por id (h001), mlid (1) o slug (miya).
export function fetchHero(id) {
  return fetchJson(`/api/heroes/${id}`);
}

// Roles con la cantidad de héroes de cada uno.
export function fetchRoles() {
  return fetchJson('/api/roles');
}

// Líneas con la cantidad de héroes de cada una.
export function fetchLanes() {
  return fetchJson('/api/lanes');
}

// Estado de la API.
export function fetchStatus() {
  return fetchJson('/api/status');
}
