import { roleLabel, laneLabel } from '../labels';

// Buscador por nombre + filtros por rol y por línea.
// Los valores se mandan tal cual a la API (en inglés); las etiquetas se muestran en español.
export default function Filters({ search, onSearch, role, onRole, lane, onLane, roles, lanes }) {
  return (
    <section className="filters" aria-label="Buscar y filtrar héroes">
      <input
        type="search"
        className="search-input"
        placeholder="Buscar héroe por nombre… (p. ej. Miya)"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Buscar héroe por nombre"
      />

      <div className="filter-group">
        <span className="filter-label">Rol:</span>
        <div className="chip-row">
          <button
            type="button"
            className={role === '' ? 'chip-btn active' : 'chip-btn'}
            onClick={() => onRole('')}
          >
            Todos
          </button>
          {roles.map(({ role: value, heroes }) => (
            <button
              type="button"
              key={value}
              className={role === value ? 'chip-btn active' : 'chip-btn'}
              onClick={() => onRole(value)}
            >
              {roleLabel(value)} <span className="count">{heroes}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-label">Línea:</span>
        <div className="chip-row">
          <button
            type="button"
            className={lane === '' ? 'chip-btn active' : 'chip-btn'}
            onClick={() => onLane('')}
          >
            Todas
          </button>
          {lanes.map(({ lane: value, heroes }) => (
            <button
              type="button"
              key={value}
              className={lane === value ? 'chip-btn active' : 'chip-btn'}
              onClick={() => onLane(value)}
            >
              {laneLabel(value)} <span className="count">{heroes}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
