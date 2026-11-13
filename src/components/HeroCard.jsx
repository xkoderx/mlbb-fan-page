import { useState } from 'react';
import { splitRoles, splitLanes, roleLabel, laneLabel } from '../labels';

// Tarjeta de un héroe en la cuadrícula: retrato, nombre, roles y líneas.
export default function HeroCard({ hero, onSelect }) {
  const [imgError, setImgError] = useState(false);
  const roles = splitRoles(hero.class);

  return (
    <article
      className="hero-card"
      onClick={() => onSelect(hero)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSelect(hero);
      }}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalle de ${hero.hero_name}`}
    >
      <div className="hero-portrait">
        {!hero.portrait || imgError ? (
          <div className="hero-portrait-fallback" aria-hidden="true">
            {hero.hero_name[0]}
          </div>
        ) : (
          <img
            src={hero.portrait}
            alt={`Retrato de ${hero.hero_name}`}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="hero-card-body">
        <h3>{hero.hero_name}</h3>
        <div className="chips">
          {roles.map((r) => (
            <span key={r} className="chip chip-role">
              {roleLabel(r)}
            </span>
          ))}
        </div>
        <div className="chips">
          {splitLanes(hero.laning).map((l) => (
            <span key={l} className="chip chip-lane">
              {laneLabel(l)}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
