import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { fetchExercisesByMuscle } from '../../services/exerciseApi';
import styles from './BodyMap.module.css';

const MUSCLE_DATA = {
  chest:      { name: 'PECHO',          components: ['Pectoral Mayor', 'Pectoral Menor', 'Serrato Anterior'], apiId: 'chest',      color: '#ff4757' },
  biceps:     { name: 'BÍCEPS',         components: ['Bíceps Braquial', 'Braquial', 'Coracobraquial'],         apiId: 'biceps',     color: '#2ed573' },
  triceps:    { name: 'TRÍCEPS',        components: ['Tríceps Largo', 'Tríceps Lateral', 'Tríceps Medial'],    apiId: 'triceps',    color: '#a29bfe' },
  abs:        { name: 'ABDOMINALES',    components: ['Recto Abdominal', 'Oblicuo Externo', 'Oblicuo Interno', 'Transverso'], apiId: 'abs', color: '#ffa502' },
  quads:      { name: 'CUÁDRICEPS',     components: ['Recto Femoral', 'Vasto Lateral', 'Vasto Medial', 'Vasto Intermedio'], apiId: 'quads', color: '#1e90ff' },
  glutes:     { name: 'GLÚTEOS',        components: ['Glúteo Mayor', 'Glúteo Medio', 'Glúteo Menor'],          apiId: 'glutes',     color: '#ff7f50' },
  legs:       { name: 'PIERNAS',        components: ['Gemelo Medial', 'Gemelo Lateral', 'Sóleo', 'Tibial Anterior'], apiId: 'legs', color: '#00b894' },
  back:       { name: 'ESPALDA',        components: ['Dorsal Ancho', 'Trapecio', 'Romboides', 'Erector Espinal'], apiId: 'back',   color: '#fd79a8' },
  hombro:     { name: 'HOMBROS',        components: ['Deltoides Anterior', 'Deltoides Lateral', 'Deltoides Posterior'], apiId: 'hombro', color: '#74b9ff' },
  forearms:   { name: 'ANTE BRAZO',     components: ['Flexores del Carpo', 'Extensores del Carpo', 'Pronador', 'Supinador'], apiId: 'forearms', color: '#dfe6e9' },
  neck:       { name: 'CUELLO',         components: ['Esternocleidomastoideo', 'Escalenos', 'Esplenio'],        apiId: 'neck',       color: '#00cec9' },
  hamstrings: { name: 'ISQUIOTIBIALES', components: ['Bíceps Femoral', 'Semitendinoso', 'Semimembranoso'],      apiId: 'hamstrings', color: '#e17055' },
};

const FRONT_SHAPES = [
  { id: 'neck',        muscleId: 'neck',     shape: 'rect',    x: 90,  y: 64, width: 20, height: 24, rx: 5 },
  { id: 'l_shoulder',  muscleId: 'hombro',   shape: 'ellipse', cx: 44, cy: 106, rx: 18, ry: 13 },
  { id: 'r_shoulder',  muscleId: 'hombro',   shape: 'ellipse', cx: 156, cy: 106, rx: 18, ry: 13 },
  { id: 'l_pec',       muscleId: 'chest',    shape: 'path',    d: 'M100,88 L70,93 L68,162 L100,162 Z' },
  { id: 'r_pec',       muscleId: 'chest',    shape: 'path',    d: 'M100,88 L130,93 L132,162 L100,162 Z' },
  { id: 'abs',         muscleId: 'abs',      shape: 'rect',    x: 76,  y: 162, width: 48, height: 54, rx: 8 },
  { id: 'l_bicep',     muscleId: 'biceps',   shape: 'ellipse', cx: 40, cy: 143, rx: 10, ry: 24 },
  { id: 'r_bicep',     muscleId: 'biceps',   shape: 'ellipse', cx: 160, cy: 143, rx: 10, ry: 24 },
  { id: 'l_forearm',   muscleId: 'forearms', shape: 'ellipse', cx: 35, cy: 216, rx: 9, ry: 24 },
  { id: 'r_forearm',   muscleId: 'forearms', shape: 'ellipse', cx: 165, cy: 216, rx: 9, ry: 24 },
  { id: 'l_quad',      muscleId: 'quads',    shape: 'rect',    x: 68,  y: 248, width: 28, height: 108, rx: 13 },
  { id: 'r_quad',      muscleId: 'quads',    shape: 'rect',    x: 104, y: 248, width: 28, height: 108, rx: 13 },
  { id: 'l_calf',      muscleId: 'legs',     shape: 'ellipse', cx: 80, cy: 408, rx: 13, ry: 40 },
  { id: 'r_calf',      muscleId: 'legs',     shape: 'ellipse', cx: 120, cy: 408, rx: 13, ry: 40 },
];

const BACK_SHAPES = [
  { id: 'b_neck',       muscleId: 'neck',       shape: 'rect',    x: 90,  y: 64, width: 20, height: 24, rx: 5 },
  { id: 'l_b_shoulder', muscleId: 'hombro',     shape: 'ellipse', cx: 44, cy: 106, rx: 18, ry: 13 },
  { id: 'r_b_shoulder', muscleId: 'hombro',     shape: 'ellipse', cx: 156, cy: 106, rx: 18, ry: 13 },
  { id: 'l_back_up',    muscleId: 'back',        shape: 'path',    d: 'M100,88 L70,93 L68,162 L100,162 Z' },
  { id: 'r_back_up',    muscleId: 'back',        shape: 'path',    d: 'M100,88 L130,93 L132,162 L100,162 Z' },
  { id: 'lower_back',   muscleId: 'back',        shape: 'rect',    x: 76,  y: 162, width: 48, height: 54, rx: 8 },
  { id: 'l_tricep',     muscleId: 'triceps',     shape: 'ellipse', cx: 40, cy: 143, rx: 10, ry: 24 },
  { id: 'r_tricep',     muscleId: 'triceps',     shape: 'ellipse', cx: 160, cy: 143, rx: 10, ry: 24 },
  { id: 'l_b_forearm',  muscleId: 'forearms',    shape: 'ellipse', cx: 35, cy: 216, rx: 9, ry: 24 },
  { id: 'r_b_forearm',  muscleId: 'forearms',    shape: 'ellipse', cx: 165, cy: 216, rx: 9, ry: 24 },
  { id: 'l_glute',      muscleId: 'glutes',      shape: 'ellipse', cx: 80, cy: 232, rx: 20, ry: 16 },
  { id: 'r_glute',      muscleId: 'glutes',      shape: 'ellipse', cx: 120, cy: 232, rx: 20, ry: 16 },
  { id: 'l_hamstring',  muscleId: 'hamstrings',  shape: 'rect',    x: 68,  y: 250, width: 28, height: 104, rx: 13 },
  { id: 'r_hamstring',  muscleId: 'hamstrings',  shape: 'rect',    x: 104, y: 250, width: 28, height: 104, rx: 13 },
  { id: 'l_b_calf',     muscleId: 'legs',        shape: 'ellipse', cx: 80, cy: 408, rx: 13, ry: 40 },
  { id: 'r_b_calf',     muscleId: 'legs',        shape: 'ellipse', cx: 120, cy: 408, rx: 13, ry: 40 },
];

const BodyMap = ({ onSelectGroup, onSelectExercise, onBack }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [view, setView] = useState('front');
  const [hoveredMuscle, setHoveredMuscle] = useState(null);
  const [activePanel, setActivePanel] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, muscle: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.offsetWidth || window.innerWidth;
    const h = canvas.offsetHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.set(0, 2, 10);
    camera.lookAt(0, 0, 0);

    const count = 300;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0x4ecdc4, size: 0.05, transparent: true, opacity: 0.55 });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    const grid = new THREE.GridHelper(28, 24, 0x0a1628, 0x0d1f3c);
    grid.position.y = -7;
    scene.add(grid);

    let id;
    const animate = () => {
      id = requestAnimationFrame(animate);
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = canvas.offsetWidth;
      const nh = canvas.offsetHeight;
      renderer.setSize(nw, nh);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  const handleMuscleEnter = useCallback((muscleId, e) => {
    setHoveredMuscle(muscleId);
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setTooltip({
      visible: true,
      x: clientX - rect.left,
      y: clientY - rect.top - 48,
      muscle: MUSCLE_DATA[muscleId],
    });
  }, []);

  const handleMuscleLeave = useCallback(() => {
    setHoveredMuscle(null);
    setTooltip({ visible: false, x: 0, y: 0, muscle: null });
  }, []);

  const handleMuscleClick = useCallback(async (muscleId, e) => {
    e.stopPropagation();
    const muscle = MUSCLE_DATA[muscleId];
    if (!muscle) return;
    setActivePanel({ muscleId, exercises: [], loading: true });
    try {
      const exs = await fetchExercisesByMuscle(muscle.apiId);
      setActivePanel({ muscleId, exercises: exs.slice(0, 8), loading: false });
    } catch {
      setActivePanel({ muscleId, exercises: [], loading: false });
    }
  }, []);

  const renderShape = (s) => {
    const muscle = MUSCLE_DATA[s.muscleId];
    if (!muscle) return null;
    const hov = hoveredMuscle === s.muscleId;
    const act = activePanel?.muscleId === s.muscleId;
    const lit = hov || act;

    const common = {
      key: s.id,
      fill: lit ? `${muscle.color}cc` : `${muscle.color}44`,
      stroke: muscle.color,
      strokeWidth: lit ? 2 : 1,
      style: {
        cursor: 'pointer',
        transition: 'fill 0.2s, stroke-width 0.2s',
        filter: lit ? `drop-shadow(0 0 6px ${muscle.color})` : 'none',
      },
      onMouseEnter: (e) => handleMuscleEnter(s.muscleId, e),
      onMouseLeave: handleMuscleLeave,
      onClick: (e) => handleMuscleClick(s.muscleId, e),
      onTouchStart: (e) => {
        e.preventDefault();
        handleMuscleEnter(s.muscleId, e);
        handleMuscleClick(s.muscleId, e);
      },
    };

    if (s.shape === 'ellipse') return <ellipse {...common} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} />;
    if (s.shape === 'rect')   return <rect   {...common} x={s.x} y={s.y} width={s.width} height={s.height} rx={s.rx || 0} />;
    if (s.shape === 'path')   return <path   {...common} d={s.d} />;
    return null;
  };

  const currentMuscle = activePanel ? MUSCLE_DATA[activePanel.muscleId] : null;
  const shapes = view === 'front' ? FRONT_SHAPES : BACK_SHAPES;

  return (
    <div className={styles.container} ref={containerRef}>
      <canvas ref={canvasRef} className={styles.bgCanvas} />

      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>❮</button>
        <h2 className={styles.headerTitle}>GYM — ANATOMÍA</h2>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.toggleBtn} ${view === 'front' ? styles.activeToggle : ''}`}
            onClick={() => setView('front')}
          >FRENTE</button>
          <button
            className={`${styles.toggleBtn} ${view === 'back' ? styles.activeToggle : ''}`}
            onClick={() => setView('back')}
          >DORSAL</button>
        </div>
      </div>

      <div className={styles.bodyArea}>
        <svg viewBox="0 0 200 490" className={styles.bodySvg}>
          <defs>
            <radialGradient id="bodyGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1a2a4a" />
              <stop offset="100%" stopColor="#050a14" />
            </radialGradient>
          </defs>

          {/* Silhouette */}
          <ellipse cx="100" cy="40" rx="24" ry="28" fill="url(#bodyGlow)" stroke="#1e3a5f" strokeWidth="1" />
          <rect x="88" y="66" width="24" height="26" rx="4" fill="#071020" stroke="#1e3a5f" strokeWidth="1" />
          <path d="M60,90 L100,85 L140,90 L142,218 L58,218 Z" fill="#071020" stroke="#1e3a5f" strokeWidth="1" />
          <rect x="28" y="92" width="30" height="96" rx="14" fill="#060e1e" stroke="#1e3a5f" strokeWidth="1" />
          <rect x="142" y="92" width="30" height="96" rx="14" fill="#060e1e" stroke="#1e3a5f" strokeWidth="1" />
          <rect x="24" y="185" width="24" height="74" rx="11" fill="#060e1e" stroke="#1e3a5f" strokeWidth="1" />
          <rect x="152" y="185" width="24" height="74" rx="11" fill="#060e1e" stroke="#1e3a5f" strokeWidth="1" />
          <ellipse cx="36" cy="270" rx="9" ry="12" fill="#060e1e" stroke="#1e3a5f" strokeWidth="1" />
          <ellipse cx="164" cy="270" rx="9" ry="12" fill="#060e1e" stroke="#1e3a5f" strokeWidth="1" />
          <rect x="64" y="216" width="72" height="32" rx="8" fill="#071020" stroke="#1e3a5f" strokeWidth="1" />
          <rect x="66" y="244" width="32" height="116" rx="15" fill="#060e1e" stroke="#1e3a5f" strokeWidth="1" />
          <rect x="102" y="244" width="32" height="116" rx="15" fill="#060e1e" stroke="#1e3a5f" strokeWidth="1" />
          <rect x="68" y="357" width="28" height="102" rx="13" fill="#060e1e" stroke="#1e3a5f" strokeWidth="1" />
          <rect x="104" y="357" width="28" height="102" rx="13" fill="#060e1e" stroke="#1e3a5f" strokeWidth="1" />
          <ellipse cx="82" cy="464" rx="18" ry="8" fill="#060e1e" stroke="#1e3a5f" strokeWidth="1" />
          <ellipse cx="118" cy="464" rx="18" ry="8" fill="#060e1e" stroke="#1e3a5f" strokeWidth="1" />

          {/* Muscle overlays */}
          {shapes.map(renderShape)}
        </svg>

        {tooltip.visible && tooltip.muscle && (
          <div
            className={styles.tooltip}
            style={{
              left: tooltip.x,
              top: tooltip.y,
              borderColor: tooltip.muscle.color,
              color: tooltip.muscle.color,
            }}
          >
            {tooltip.muscle.name}
          </div>
        )}
      </div>

      {!activePanel && (
        <p className={styles.hint}>Toca un músculo para explorar</p>
      )}

      {activePanel && currentMuscle && (
        <div className={styles.panel}>
          <div className={styles.panelHandle} />

          <div className={styles.panelHeader}>
            <div>
              <span className={styles.panelTag} style={{ color: currentMuscle.color }}>MÚSCULO</span>
              <h3 className={styles.panelMuscle} style={{ color: currentMuscle.color }}>
                {currentMuscle.name}
              </h3>
            </div>
            <button className={styles.closeBtn} onClick={() => setActivePanel(null)}>✕</button>
          </div>

          <div className={styles.panelSection}>
            <p className={styles.sectionLabel}>COMPUESTO POR</p>
            <div className={styles.chipRow}>
              {currentMuscle.components.map((c, i) => (
                <span
                  key={i}
                  className={styles.chip}
                  style={{ borderColor: `${currentMuscle.color}88`, color: currentMuscle.color }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.panelSection}>
            <p className={styles.sectionLabel}>EJERCICIOS</p>
            {activePanel.loading ? (
              <div className={styles.loadingBox}>
                <div className={styles.spinner} style={{ borderTopColor: currentMuscle.color }} />
                <span className={styles.loadingText}>Cargando...</span>
              </div>
            ) : activePanel.exercises.length === 0 ? (
              <p className={styles.emptyText}>Sin resultados</p>
            ) : (
              <div className={styles.exList}>
                {activePanel.exercises.map((ex) => (
                  <button
                    key={ex.id}
                    className={styles.exItem}
                    style={{ '--accent': currentMuscle.color }}
                    onClick={() => onSelectExercise && onSelectExercise(ex)}
                  >
                    {ex.image && (
                      <img
                        src={ex.image}
                        alt=""
                        className={styles.exThumb}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    )}
                    <span className={styles.exName}>{ex.name}</span>
                    <span className={styles.exArrow} style={{ color: currentMuscle.color }}>›</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className={styles.viewAllBtn}
            style={{ background: currentMuscle.color }}
            onClick={() => {
              setActivePanel(null);
              onSelectGroup && onSelectGroup(currentMuscle.apiId);
            }}
          >
            VER TODOS LOS EJERCICIOS →
          </button>
        </div>
      )}
    </div>
  );
};

export default BodyMap;
