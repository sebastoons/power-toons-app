import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { fetchExercisesByMuscle } from '../../services/exerciseApi';
import styles from './BodyMap.module.css';

const MUSCLE_DATA = {
  chest:      { name: 'PECHO',          components: ['Pectoral Mayor', 'Pectoral Menor', 'Serrato Anterior'],                     apiId: 'chest',      color: '#ff4757' },
  biceps:     { name: 'BÍCEPS',         components: ['Bíceps Braquial', 'Braquial', 'Coracobraquial'],                            apiId: 'biceps',     color: '#2ed573' },
  triceps:    { name: 'TRÍCEPS',        components: ['Tríceps Largo', 'Tríceps Lateral', 'Tríceps Medial'],                       apiId: 'triceps',    color: '#a29bfe' },
  abs:        { name: 'ABDOMINALES',    components: ['Recto Abdominal', 'Oblicuo Externo', 'Oblicuo Interno', 'Transverso'],      apiId: 'abs',        color: '#ffa502' },
  quads:      { name: 'CUÁDRICEPS',     components: ['Recto Femoral', 'Vasto Lateral', 'Vasto Medial', 'Vasto Intermedio'],       apiId: 'quads',      color: '#1e90ff' },
  glutes:     { name: 'GLÚTEOS',        components: ['Glúteo Mayor', 'Glúteo Medio', 'Glúteo Menor'],                             apiId: 'glutes',     color: '#ff7f50' },
  legs:       { name: 'PIERNAS',        components: ['Gemelo Medial', 'Gemelo Lateral', 'Sóleo', 'Tibial Anterior'],              apiId: 'legs',       color: '#00b894' },
  back:       { name: 'ESPALDA',        components: ['Dorsal Ancho', 'Trapecio', 'Romboides', 'Erector Espinal'],                 apiId: 'back',       color: '#fd79a8' },
  hombro:     { name: 'HOMBROS',        components: ['Deltoides Anterior', 'Deltoides Lateral', 'Deltoides Posterior'],           apiId: 'hombro',     color: '#74b9ff' },
  forearms:   { name: 'ANTE BRAZO',     components: ['Flexores del Carpo', 'Extensores del Carpo', 'Pronador', 'Supinador'],      apiId: 'forearms',   color: '#b2bec3' },
  neck:       { name: 'CUELLO',         components: ['Esternocleidomastoideo', 'Escalenos', 'Esplenio'],                          apiId: 'neck',       color: '#00cec9' },
  hamstrings: { name: 'ISQUIOTIBIALES', components: ['Bíceps Femoral', 'Semitendinoso', 'Semimembranoso'],                        apiId: 'hamstrings', color: '#e17055' },
};

// Hover/active colors – unified burgundy for the SVG zones
const DFLT = { fill: 'rgba(55,80,115,0.30)', stroke: 'rgba(85,120,165,0.50)', sw: 0.8 };
const HOVR = { fill: 'rgba(150,18,18,0.82)', stroke: '#e02020',               sw: 1.5 };
const ACTV = { fill: 'rgba(110,8,8,0.90)',   stroke: '#cc1a1a',               sw: 1.5 };

/* ── SVG shape arrays ─────────────────────────────────────────── */
const FRONT_SHAPES = [
  // neck
  { id: 'neck',    mid: 'neck',  shape: 'path', d: 'M90,58 Q100,54 110,58 L112,73 Q100,77 88,73 Z' },
  // shoulders
  { id: 'ls', mid: 'hombro', shape: 'path', d: 'M24,82 C18,97 17,118 23,132 C31,138 49,134 57,123 C62,109 58,88 49,82 Z' },
  { id: 'rs', mid: 'hombro', shape: 'path', d: 'M176,82 C182,97 183,118 177,132 C169,138 151,134 143,123 C138,109 142,88 151,82 Z' },
  // chest
  { id: 'lp', mid: 'chest', shape: 'path', d: 'M100,79 C87,73 62,79 57,97 L61,152 C71,157 92,155 100,153 Z' },
  { id: 'rp', mid: 'chest', shape: 'path', d: 'M100,79 C113,73 138,79 143,97 L139,152 C129,157 108,155 100,153 Z' },
  // biceps
  { id: 'lb', mid: 'biceps', shape: 'path', d: 'M27,87 C23,106 21,140 25,163 C33,168 45,166 51,161 C55,138 53,103 49,87 Z' },
  { id: 'rb', mid: 'biceps', shape: 'path', d: 'M173,87 C177,106 179,140 175,163 C167,168 155,166 149,161 C145,138 147,103 151,87 Z' },
  // forearms
  { id: 'lf', mid: 'forearms', shape: 'path', d: 'M23,161 C17,181 15,222 19,244 C27,250 41,248 47,242 C51,220 51,178 47,161 Z' },
  { id: 'rf', mid: 'forearms', shape: 'path', d: 'M177,161 C183,181 185,222 181,244 C173,250 159,248 153,242 C149,220 149,178 153,161 Z' },
  // abs – 6 blocks grouped
  { id: 'a1l', mid: 'abs', shape: 'rect', x: 78, y: 155, width: 18, height: 14, rx: 4 },
  { id: 'a1r', mid: 'abs', shape: 'rect', x: 104, y: 155, width: 18, height: 14, rx: 4 },
  { id: 'a2l', mid: 'abs', shape: 'rect', x: 78, y: 173, width: 18, height: 14, rx: 4 },
  { id: 'a2r', mid: 'abs', shape: 'rect', x: 104, y: 173, width: 18, height: 14, rx: 4 },
  { id: 'a3l', mid: 'abs', shape: 'rect', x: 78, y: 191, width: 18, height: 13, rx: 4 },
  { id: 'a3r', mid: 'abs', shape: 'rect', x: 104, y: 191, width: 18, height: 13, rx: 4 },
  // quads
  { id: 'lq', mid: 'quads', shape: 'path', d: 'M60,231 C55,256 54,316 58,355 C66,361 84,359 92,353 C96,315 96,254 90,231 Z' },
  { id: 'rq', mid: 'quads', shape: 'path', d: 'M140,231 C145,256 146,316 142,355 C134,361 116,359 108,353 C104,315 104,254 110,231 Z' },
  // calves
  { id: 'lc', mid: 'legs', shape: 'path', d: 'M60,353 C55,375 54,422 58,450 C66,456 82,454 90,449 C93,422 92,374 88,353 Z' },
  { id: 'rc', mid: 'legs', shape: 'path', d: 'M140,353 C145,375 146,422 142,450 C134,456 118,454 110,449 C107,422 108,374 112,353 Z' },
];

const BACK_SHAPES = [
  // neck
  { id: 'bn',    mid: 'neck',       shape: 'path', d: 'M90,58 Q100,54 110,58 L112,73 Q100,77 88,73 Z' },
  // shoulders
  { id: 'bls',   mid: 'hombro',     shape: 'path', d: 'M24,82 C18,97 17,118 23,132 C31,138 49,134 57,123 C62,109 58,88 49,82 Z' },
  { id: 'brs',   mid: 'hombro',     shape: 'path', d: 'M176,82 C182,97 183,118 177,132 C169,138 151,134 143,123 C138,109 142,88 151,82 Z' },
  // upper back (lat + trap shapes like inverted pecs)
  { id: 'blb',   mid: 'back',       shape: 'path', d: 'M100,79 C87,73 62,79 57,97 L61,152 C71,157 92,155 100,153 Z' },
  { id: 'brb',   mid: 'back',       shape: 'path', d: 'M100,79 C113,73 138,79 143,97 L139,152 C129,157 108,155 100,153 Z' },
  // lower back
  { id: 'llb',   mid: 'back',       shape: 'path', d: 'M64,152 C76,158 124,158 136,152 L134,202 C120,209 80,209 66,202 Z' },
  // triceps
  { id: 'blt',   mid: 'triceps',    shape: 'path', d: 'M27,87 C23,106 21,140 25,163 C33,168 45,166 51,161 C55,138 53,103 49,87 Z' },
  { id: 'brt',   mid: 'triceps',    shape: 'path', d: 'M173,87 C177,106 179,140 175,163 C167,168 155,166 149,161 C145,138 147,103 151,87 Z' },
  // forearms
  { id: 'blf',   mid: 'forearms',   shape: 'path', d: 'M23,161 C17,181 15,222 19,244 C27,250 41,248 47,242 C51,220 51,178 47,161 Z' },
  { id: 'brf',   mid: 'forearms',   shape: 'path', d: 'M177,161 C183,181 185,222 181,244 C173,250 159,248 153,242 C149,220 149,178 153,161 Z' },
  // glutes
  { id: 'blg',   mid: 'glutes',     shape: 'path', d: 'M58,227 C53,242 53,268 58,280 C68,288 88,286 98,280 C102,267 100,241 92,227 Z' },
  { id: 'brg',   mid: 'glutes',     shape: 'path', d: 'M142,227 C147,242 147,268 142,280 C132,288 112,286 102,280 C98,267 100,241 108,227 Z' },
  // hamstrings
  { id: 'blh',   mid: 'hamstrings', shape: 'path', d: 'M60,278 C55,302 54,330 58,355 C66,361 84,359 92,353 C96,330 96,300 90,278 Z' },
  { id: 'brh',   mid: 'hamstrings', shape: 'path', d: 'M140,278 C145,302 146,330 142,355 C134,361 116,359 108,353 C104,330 104,300 110,278 Z' },
  // calves
  { id: 'blc',   mid: 'legs',       shape: 'path', d: 'M60,353 C55,375 54,422 58,450 C66,456 82,454 90,449 C93,422 92,374 88,353 Z' },
  { id: 'brc',   mid: 'legs',       shape: 'path', d: 'M140,353 C145,375 146,422 142,450 C134,456 118,454 110,449 C107,422 108,374 112,353 Z' },
];

const BATCH = 5;

const BodyMap = ({ onSelectGroup, onSelectExercise, onBack }) => {
  const canvasRef   = useRef(null);
  const containerRef = useRef(null);
  const [view, setView]           = useState('front');
  const [hoveredMuscle, setHovered] = useState(null);
  const [tooltip, setTooltip]     = useState({ visible: false, x: 0, y: 0, name: '', color: '' });
  const [panel, setPanel]         = useState(null); // { muscleId, allExs, displayCount, loading }

  /* Three.js background */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.set(0, 2, 10);
    camera.lookAt(0, 0, 0);

    const cnt = 280;
    const pos = new Float32Array(cnt * 3);
    for (let i = 0; i < cnt; i++) {
      pos[i*3]   = (Math.random()-.5)*26;
      pos[i*3+1] = (Math.random()-.5)*20;
      pos[i*3+2] = (Math.random()-.5)*14;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0x3a6090, size: 0.055, transparent: true, opacity: 0.5 });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);
    const grid = new THREE.GridHelper(30, 26, 0x0a1628, 0x0d1f3c);
    grid.position.y = -7;
    scene.add(grid);

    let id;
    const tick = () => { id = requestAnimationFrame(tick); pts.rotation.y += 0.0007; renderer.render(scene, camera); };
    tick();
    const onResize = () => { const nw = canvas.offsetWidth, nh = canvas.offsetHeight; renderer.setSize(nw,nh); camera.aspect=nw/nh; camera.updateProjectionMatrix(); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', onResize); renderer.dispose(); geo.dispose(); mat.dispose(); };
  }, []);

  const getClientXY = (e) => e.touches ? [e.touches[0].clientX, e.touches[0].clientY] : [e.clientX, e.clientY];

  const handleEnter = useCallback((mid, e) => {
    setHovered(mid);
    const [cx, cy] = getClientXY(e);
    const rect = containerRef.current.getBoundingClientRect();
    setTooltip({ visible: true, x: cx - rect.left, y: cy - rect.top - 44, name: MUSCLE_DATA[mid]?.name || '', color: MUSCLE_DATA[mid]?.color || '#fff' });
  }, []);

  const handleLeave = useCallback(() => { setHovered(null); setTooltip(t => ({ ...t, visible: false })); }, []);

  const handleClick = useCallback(async (mid, e) => {
    e.stopPropagation();
    if (panel?.muscleId === mid) return;
    setPanel({ muscleId: mid, allExs: [], displayCount: BATCH, loading: true });
    const exs = await fetchExercisesByMuscle(MUSCLE_DATA[mid].apiId).catch(() => []);
    setPanel({ muscleId: mid, allExs: exs, displayCount: BATCH, loading: false });
  }, [panel]);

  const loadMore = () => setPanel(p => ({ ...p, displayCount: p.displayCount + BATCH }));

  const renderShape = (s) => {
    const hov = hoveredMuscle === s.mid;
    const act = panel?.muscleId === s.mid;
    const st  = act ? ACTV : hov ? HOVR : DFLT;
    const flt = hov ? 'drop-shadow(0 0 5px #dd1010) drop-shadow(0 0 12px rgba(200,10,10,0.4))' : 'none';

    const props = {
      key: s.id,
      fill: st.fill, stroke: st.stroke, strokeWidth: st.sw,
      style: { cursor: 'pointer', transition: 'fill .18s, stroke .18s', filter: flt },
      onMouseEnter: e => handleEnter(s.mid, e),
      onMouseLeave: handleLeave,
      onClick: e => handleClick(s.mid, e),
      onTouchStart: e => { e.preventDefault(); handleEnter(s.mid, e); handleClick(s.mid, e); },
    };
    if (s.shape === 'path')   return <path   {...props} d={s.d} />;
    if (s.shape === 'rect')   return <rect   {...props} x={s.x} y={s.y} width={s.width} height={s.height} rx={s.rx||0} />;
    if (s.shape === 'ellipse') return <ellipse {...props} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} />;
    return null;
  };

  const muscle = panel ? MUSCLE_DATA[panel.muscleId] : null;
  const shownExs = panel ? panel.allExs.slice(0, panel.displayCount) : [];
  const hasMore  = panel && panel.displayCount < panel.allExs.length;

  return (
    <div className={styles.container} ref={containerRef}>
      <canvas ref={canvasRef} className={styles.bg} />

      {/* Header */}
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>❮</button>
        <h2 className={styles.headerTitle}>GYM — ANATOMÍA</h2>
        <div className={styles.toggle}>
          <button className={`${styles.tBtn} ${view==='front'?styles.tActive:''}`} onClick={()=>setView('front')}>FRENTE</button>
          <button className={`${styles.tBtn} ${view==='back' ?styles.tActive:''}`} onClick={()=>setView('back')}>DORSAL</button>
        </div>
      </div>

      {/* Body SVG */}
      <div className={styles.bodyArea}>
        <svg viewBox="0 0 200 500" className={styles.svg}>
          {/* ── Silhouette ── */}
          <g fill="#0e1522" stroke="#1e3555" strokeWidth="1">
            <ellipse cx="100" cy="35" rx="22" ry="24"/>
            <path d="M90,57 Q100,53 110,57 L112,73 Q100,77 88,73 Z"/>
            <path d="M57,75 C70,68 130,68 143,75 L146,210 C128,218 72,218 54,210 Z"/>
            <path d="M55,208 C72,217 128,217 145,208 L143,234 C126,242 74,242 57,234 Z"/>
            <path d="M22,80 C17,98 15,142 19,165 C27,172 45,170 52,163 C56,138 55,96 51,80 Z"/>
            <path d="M178,80 C183,98 185,142 181,165 C173,172 155,170 148,163 C144,138 145,96 149,80 Z"/>
            <path d="M21,162 C15,183 13,224 17,246 C25,253 40,251 47,244 C51,222 51,180 47,162 Z"/>
            <path d="M179,162 C185,183 187,224 183,246 C175,253 160,251 153,244 C149,222 149,180 153,162 Z"/>
            <ellipse cx="36" cy="267" rx="9" ry="12"/>
            <ellipse cx="164" cy="267" rx="9" ry="12"/>
            <path d="M58,232 C53,252 51,315 55,357 C63,364 83,362 92,355 C97,314 97,250 91,232 Z"/>
            <path d="M142,232 C147,252 149,315 145,357 C137,364 117,362 108,355 C103,314 103,250 109,232 Z"/>
            <path d="M57,355 C52,378 51,424 55,452 C63,458 83,456 91,450 C95,424 94,376 90,355 Z"/>
            <path d="M143,355 C148,378 149,424 145,452 C137,458 117,456 109,450 C105,424 106,376 110,355 Z"/>
            <path d="M52,450 L95,450 L93,462 L50,462 Z" rx="4"/>
            <path d="M105,450 L148,450 L150,462 L107,462 Z" rx="4"/>
          </g>

          {/* ── Muscle overlays ── */}
          {(view==='front' ? FRONT_SHAPES : BACK_SHAPES).map(renderShape)}
        </svg>

        {tooltip.visible && (
          <div className={styles.tooltip} style={{ left: tooltip.x, top: tooltip.y, borderColor: tooltip.color, color: tooltip.color }}>
            {tooltip.name}
          </div>
        )}
      </div>

      {!panel && <p className={styles.hint}>Toca un músculo para explorar</p>}

      {/* Panel */}
      {panel && muscle && (
        <div className={styles.panel}>
          <div className={styles.handle}/>

          <div className={styles.panelHead}>
            <div>
              <span className={styles.panelTag} style={{color: muscle.color}}>MÚSCULO</span>
              <h3 className={styles.panelName} style={{color: muscle.color}}>{muscle.name}</h3>
            </div>
            <button className={styles.closeBtn} onClick={()=>setPanel(null)}>✕</button>
          </div>

          {/* Chips */}
          <div className={styles.section}>
            <p className={styles.sLabel}>COMPUESTO POR</p>
            <div className={styles.chips}>
              {muscle.components.map((c,i)=>(
                <span key={i} className={styles.chip} style={{borderColor:`${muscle.color}80`, color: muscle.color}}>{c}</span>
              ))}
            </div>
          </div>

          {/* Exercises */}
          <div className={styles.section}>
            <p className={styles.sLabel}>EJERCICIOS</p>
            {panel.loading ? (
              <div className={styles.loadRow}>
                <div className={styles.spin} style={{borderTopColor: muscle.color}}/>
                <span className={styles.loadTxt}>Cargando...</span>
              </div>
            ) : shownExs.length === 0 ? (
              <p className={styles.empty}>Sin resultados</p>
            ) : (
              <>
                <div className={styles.exList}>
                  {shownExs.map(ex => (
                    <button key={ex.id} className={styles.exItem} onClick={()=>onSelectExercise&&onSelectExercise(ex)}>
                      {ex.image && <img src={ex.image} alt="" className={styles.thumb} onError={e=>e.target.style.display='none'}/>}
                      <span className={styles.exName}>{ex.name}</span>
                      <span className={styles.exArr} style={{color: muscle.color}}>›</span>
                    </button>
                  ))}
                </div>
                {hasMore && (
                  <button className={styles.moreBtn} style={{borderColor:`${muscle.color}60`, color: muscle.color}} onClick={loadMore}>
                    + CARGAR MÁS
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyMap;
