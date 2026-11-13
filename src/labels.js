// Etiquetas en español para los valores que trae la API (que vienen en inglés).

export const ROLE_LABELS = {
  Tank: 'Tanque',
  Fighter: 'Luchador',
  Assassin: 'Asesino',
  Mage: 'Mago',
  Marksman: 'Tirador',
  Support: 'Apoyo',
};

export const LANE_LABELS = {
  'gold lane': 'Línea de oro',
  'mid lane': 'Línea central',
  'exp lane': 'Línea de experiencia',
  jungle: 'Jungla',
  roam: 'Roamer',
};

export function roleLabel(role) {
  return ROLE_LABELS[role] || role;
}

export function laneLabel(lane) {
  return LANE_LABELS[lane] || lane;
}

// El campo "class" de la API puede traer dos roles: "Tank, Mage".
// Se divide por coma para mostrar cada rol por separado.
export function splitRoles(classValue) {
  return (classValue || '')
    .split(',')
    .map((r) => r.trim())
    .filter(Boolean);
}

// El campo "laning" de la API puede traer dos líneas en un solo texto:
// "exp lane, jungle". Se divide por coma igual que los roles.
export function splitLanes(laning) {
  if (!Array.isArray(laning)) return [];
  return laning
    .flatMap((l) => l.split(','))
    .map((l) => l.trim())
    .filter(Boolean);
}

// "passive" | "active" -> "Pasiva" | "Activa"
export function skillTypeLabel(type) {
  if (type === 'passive') return 'Pasiva';
  if (type === 'active') return 'Activa';
  return type || '—';
}

// La API devuelve "null" como texto en algunos campos vacíos.
export function displayValue(value) {
  if (value === null || value === undefined || value === 'null' || value === '') {
    return '—';
  }
  return value;
}
