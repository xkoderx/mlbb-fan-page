import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchHeroes, fetchRoles, fetchLanes } from './api';
import { API_DOCS_URL, API_REPO_URL, DATA_SOURCE_URL } from './config';
import Filters from './components/Filters';
import HeroCard from './components/HeroCard';
import HeroDetail from './components/HeroDetail';

const PAGE_SIZE = 48;

export default function App() {
  const [heroes, setHeroes] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [lane, setLane] = useState('');
  const [roles, setRoles] = useState([]);
  const [lanes, setLanes] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState(null);
  const debounceRef = useRef(null);
  const firstSearchRef = useRef(true);

  const load = useCallback(
    async ({ search: s, role: r, lane: l, page: p, first = false }) => {
      if (first) setStatus('loading');
      else setRefreshing(true);
      try {
        const data = await fetchHeroes({ role: r, lane: l, search: s, page: p, limit: PAGE_SIZE });
        setHeroes(data.heroes || []);
        setTotal(data.total ?? 0);
        setTotalPages(data.totalPages ?? 1);
        setError('');
        setStatus('ready');
      } catch (err) {
        setError(err.message || 'No se pudo conectar con la API.');
        setStatus('error');
      } finally {
        setRefreshing(false);
      }
    },
    []
  );

  // Carga inicial: héroes + listas de roles y líneas para los filtros.
  useEffect(() => {
    load({ search: '', role: '', lane: '', page: 1, first: true });
    fetchRoles()
      .then((d) => setRoles(d.roles || []))
      .catch(() => {});
    fetchLanes()
      .then((d) => setLanes(d.lanes || []))
      .catch(() => {});
  }, [load]);

  // La búsqueda espera 400 ms después de la última tecla para no pedirle
  // a la API en cada letra. (Se salta la primera ejecución, que es la carga inicial).
  useEffect(() => {
    if (firstSearchRef.current) {
      firstSearchRef.current = false;
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      load({ search, role, lane, page: 1 });
    }, 400);
    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const changeRole = (r) => {
    setRole(r);
    setPage(1);
    load({ search, role: r, lane, page: 1 });
  };

  const changeLane = (l) => {
    setLane(l);
    setPage(1);
    load({ search, role, lane: l, page: 1 });
  };

  const changePage = (p) => {
    setPage(p);
    load({ search, role, lane, page: p });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const retry = () => load({ search, role, lane, page, first: true });

  return (
    <div className="app">
      <header className="site-header">
        <div className="header-inner">
          <div>
            <h1>⚔️ Héroes de Mobile Legends</h1>
            <p className="subtitle">
              Explora los héroes de Mobile Legends: Bang Bang con datos en vivo de la
              MLBB Heroes API.
            </p>
          </div>
          <a className="btn-docs" href={API_DOCS_URL} target="_blank" rel="noreferrer">
            📖 Documentación de la API
          </a>
        </div>
      </header>

      <main>
        <Filters
          search={search}
          onSearch={setSearch}
          role={role}
          onRole={changeRole}
          lane={lane}
          onLane={changeLane}
          roles={roles}
          lanes={lanes}
        />

        {status === 'loading' && (
          <div className="state-panel">
            <div className="spinner" aria-hidden="true" />
            <h2>Despertando la API…</h2>
            <p>
              La API está en el plan gratuito de Render y se duerme cuando nadie la usa.
              La primera carga puede tardar unos segundos (hasta ~50 s). Gracias por tu
              paciencia.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="state-panel">
            <h2>😕 No se pudo cargar la API</h2>
            <p>{error}</p>
            <p>La API puede estar despertando. Inténtalo de nuevo.</p>
            <button type="button" className="btn-primary" onClick={retry}>
              Reintentar
            </button>
          </div>
        )}

        {status === 'ready' && (
          <>
            <p className="results-count">
              {total} héroe{total === 1 ? '' : 's'}
              {refreshing ? ' · cargando…' : ''}
            </p>

            {heroes.length === 0 ? (
              <div className="state-panel">
                <h2>Sin resultados</h2>
                <p>No encontramos héroes con esos filtros. Prueba con otro nombre, rol o línea.</p>
              </div>
            ) : (
              <section className="hero-grid" aria-label="Lista de héroes">
                {heroes.map((hero) => (
                  <HeroCard key={hero.id} hero={hero} onSelect={setSelected} />
                ))}
              </section>
            )}

            {totalPages > 1 && (
              <nav className="pagination" aria-label="Paginación">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => changePage(page - 1)}
                >
                  ← Anterior
                </button>
                <span>
                  Página {page} de {totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => changePage(page + 1)}
                >
                  Siguiente →
                </button>
              </nav>
            )}
          </>
        )}
      </main>

      <footer className="site-footer">
        <p>
          Proyecto no oficial, hecho por fans y sin afiliación con Moonton. Los datos del
          juego son © Moonton; la fuente de datos es{' '}
          <a href={DATA_SOURCE_URL} target="_blank" rel="noreferrer">
            p3hndrx/MLBB-API
          </a>
          .
        </p>
        <p>
          Datos en vivo de la{' '}
          <a href={API_DOCS_URL} target="_blank" rel="noreferrer">
            MLBB Heroes API
          </a>{' '}
          ·{' '}
          <a href={API_REPO_URL} target="_blank" rel="noreferrer">
            Código de la API en GitHub
          </a>
        </p>
      </footer>

      {selected && <HeroDetail hero={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
