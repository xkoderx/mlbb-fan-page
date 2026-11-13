import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { splitRoles, splitLanes, roleLabel, laneLabel, skillTypeLabel, displayValue } from '../labels';

// Ventana modal con el detalle de un héroe: retrato, roles, líneas y habilidades.
// Se cierra con la X, con clic fuera de la ventana o con la tecla Escape.
export default function HeroDetail({ hero, onClose }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const roles = splitRoles(hero.class);
  const skills = hero.skills || [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Detalle de ${hero.hero_name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>

        <div className="modal-hero">
          <div className="modal-portrait">
            {!hero.portrait || imgError ? (
              <div className="hero-portrait-fallback" aria-hidden="true">
                {hero.hero_name[0]}
              </div>
            ) : (
              <img
                src={hero.portrait}
                alt={`Retrato de ${hero.hero_name}`}
                onError={() => setImgError(true)}
              />
            )}
          </div>
          <div className="modal-hero-info">
            <h2>{hero.hero_name}</h2>
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
        </div>

        <h3 className="modal-section-title">Habilidades ({skills.length})</h3>
        {skills.length === 0 ? (
          <p className="muted">Este héroe no tiene habilidades registradas.</p>
        ) : (
          <ul className="skills">
            {skills.map((skill, i) => (
              <li key={`${skill.skill_name}-${i}`} className="skill">
                {skill.skill_icon && (
                  <img
                    src={skill.skill_icon}
                    alt=""
                    className="skill-icon"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="skill-body">
                  <div className="skill-head">
                    <strong>{skill.skill_name}</strong>
                    <span className={`skill-type ${skill.type}`}>
                      {skillTypeLabel(skill.type)}
                    </span>
                  </div>
                  <p className="skill-meta">
                    Enfriamiento: {displayValue(skill.cooldown)} · Maná:{' '}
                    {displayValue(skill.manacost)}
                  </p>
                  <p className="skill-desc">{skill.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="modal-api-link">
          Datos en vivo de la{' '}
          <a
            href={`${API_BASE_URL}/api/heroes/${hero.slug}`}
            target="_blank"
            rel="noreferrer"
          >
            MLBB Heroes API
          </a>
        </p>
      </div>
    </div>
  );
}
