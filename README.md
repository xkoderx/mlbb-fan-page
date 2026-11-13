# MLBB Fan Page — Héroes de Mobile Legends

Página para fans de **Mobile Legends: Bang Bang** hecha con React + Vite. Muestra los
133 héroes con sus roles, líneas y habilidades, con datos en vivo de la
[MLBB Heroes API](https://mlbb-heroes-api.onrender.com).

## Qué hace

- Buscador por nombre de héroe.
- Filtros por rol (Tanque, Luchador, Asesino, Mago, Tirador, Apoyo) y por línea
  (Línea de oro, Línea central, Línea de experiencia, Jungla, Roamer).
- Cuadrícula de héroes con retrato, roles y líneas, con paginación.
- Detalle de héroe en ventana modal: retrato, roles, líneas y lista de
  habilidades (nombre, tipo, enfriamiento, costo de maná y descripción).
- Estados de carga, error con reintento y sin resultados. La API está en el plan
  gratuito de Render y se duerme sin actividad: la página avisa que la primera
  carga puede tardar unos segundos.

## Cómo correrlo en local

```bash
npm install
npm run dev
```

La página se sirve en `http://localhost:5173`.

Para construir la versión de producción:

```bash
npm run build
npm run preview
```

## Cómo cambiar la URL de la API

La URL base vive en un solo lugar: `src/config.js`. Por defecto apunta a
`https://mlbb-heroes-api.onrender.com`.

Para apuntar a la API en tu máquina, usa la variable de entorno `VITE_API_URL`:

```bash
VITE_API_URL=http://localhost:3000 npm run dev
```

## Endpoints que usa

| Endpoint | Para qué |
| --- | --- |
| `GET /api/heroes` | Lista con filtros `?role=` `?lane=` `?search=` y paginación `?limit=` `?page=` |
| `GET /api/heroes/:id` | Detalle por id, mlid o slug |
| `GET /api/roles` | Roles con cantidad de héroes (filtros) |
| `GET /api/lanes` | Líneas con cantidad de héroes (filtros) |

Documentación de la API: https://mlbb-heroes-api.onrender.com/docs

## Créditos

Proyecto no oficial, hecho por fans y sin afiliación con Moonton. Los datos del
juego son © Moonton. La fuente de datos es
[p3hndrx/MLBB-API](https://github.com/p3hndrx/MLBB-API) y la API es
[xkoderx/mlbb-heroes-api](https://github.com/xkoderx/mlbb-heroes-api).

## Qué sigue

- Despliegue en GitHub Pages.
- Más funciones: builds recomendadas, ítems, emblemas y comparador de héroes.
- Guardar héroes favoritos en el navegador.
