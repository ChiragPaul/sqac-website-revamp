import { useRef, useState, useEffect } from 'react';
import { achievements } from '../../data/achievements';

/* ─── 3× pool is enough for seamless loop at any viewport width ─── */
const BASE = [...achievements, ...achievements, ...achievements];
const IMGS  = BASE.map((a, i) => ({ id: `${a.id}-${i}`, src: a.image, alt: a.title }));

const CARD_W = 200;
const CARD_H = 150;
const GAP    = 10;
const STRIDE = CARD_W + GAP;
/* ONE_COPY_W: how far we can scroll before we need to wrap */
const ONE_COPY_W = achievements.length * STRIDE; // 12 × 210 = 2520 px

/* ── 5 rows, alternating direction ── */
const ROW_CFG = [
  { items: IMGS,                                       speed: 0.40, dir:  1 },
  { items: [...IMGS].reverse(),                        speed: 0.30, dir: -1 },
  { items: [...IMGS.slice(8),  ...IMGS.slice(0, 8)],  speed: 0.50, dir:  1 },
  { items: [...IMGS.slice(16), ...IMGS.slice(0, 16)], speed: 0.28, dir: -1 },
  { items: [...IMGS.slice(4),  ...IMGS.slice(0, 4)],  speed: 0.44, dir:  1 },
];

/* ────────────────────────────────────────────────────────────────
   DOME MATH
   Only writes style.transform — NO per-card filter or opacity.
   Edge darkening is handled by a single CSS vignette overlay
   which is free (GPU composited, one element).
   ──────────────────────────────────────────────────────────────── */
const RADIUS  = 450;
const MAX_ANG = Math.PI / 1.9;
const MIN_SC  = 0.48;

function applyDome(el, screenCX, vpW) {
  const raw   = (screenCX - vpW / 2) / RADIUS;
  const angle = Math.max(-MAX_ANG, Math.min(MAX_ANG, raw));
  const c     = Math.cos(angle);
  const rotDeg = -(angle * 180) / Math.PI;
  const tz     = RADIUS * (c - 1);
  const sc     = MIN_SC + (1 - MIN_SC) * c;
  /* Single transform write — cheapest possible per-card update */
  el.style.transform = `rotateY(${rotDeg.toFixed(2)}deg) translateZ(${tz.toFixed(1)}px) scale(${sc.toFixed(3)})`;
}

/* ────────────────────────────────────────────────────────────────
   InfiniteRow
   ──────────────────────────────────────────────────────────────── */
function InfiniteRow({ items, speed, dir, onOpen }) {
  const wrapRef      = useRef(null);
  const trackRef     = useRef(null);
  const cardRefs     = useRef([]);
  const posRef       = useRef(dir > 0 ? 0 : -ONE_COPY_W);
  const rafRef       = useRef(null);
  const drag         = useRef({ on: false, startX: 0, startPos: 0 });
  const paused       = useRef(false);
  const clickBlocked = useRef(false);

  useEffect(() => {
    function tick() {
      /* scroll */
      if (!paused.current) {
        posRef.current -= speed * dir;
        if (posRef.current < -(2 * ONE_COPY_W)) posRef.current += ONE_COPY_W;
        if (posRef.current > 0)                  posRef.current -= ONE_COPY_W;
      }

      /* translate track */
      if (trackRef.current)
        trackRef.current.style.transform = `translateX(${posRef.current}px)`;

      /* dome bend — 1 style write per card */
      const vpW = window.innerWidth;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        applyDome(el, posRef.current + i * STRIDE + CARD_W / 2, vpW);
      });

      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, dir]);

  /* pointer handlers */
  function pDown(e) {
    if (e.button && e.button !== 0) return;
    clickBlocked.current = false;
    drag.current = { on: true, startX: e.clientX, startPos: posRef.current };
    paused.current = true;
  }
  function pMove(e) {
    if (!drag.current.on) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 6) clickBlocked.current = true;
    posRef.current = drag.current.startPos + dx;
  }
  function pUp() {
    drag.current.on = false;
    paused.current  = false;
  }
  function handleClick(e) {
    if (clickBlocked.current) return;
    const card = e.target.closest('[data-src]');
    if (card) onOpen(card.dataset.src);
  }

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{
        height: CARD_H + 4,
        perspective: `${RADIUS * 1.6}px`,
        /* Fade cards to transparent at left + right edges — zero JS cost */
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
        maskImage:       'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
      }}
      onPointerDown={pDown}
      onPointerMove={pMove}
      onPointerUp={pUp}
      onPointerCancel={pUp}
      onClick={handleClick}
    >
      <div
        ref={trackRef}
        className="absolute top-0 left-0 flex gap-[10px] will-change-transform"
      >
        {items.map((img, i) => (
          <div
            key={img.id}
            ref={el => { cardRefs.current[i] = el; }}
            data-src={img.src}
            className="flex-shrink-0 w-[200px] h-[150px] rounded-[20px] overflow-hidden shadow-lg cursor-pointer"
            style={{ transformOrigin: 'center center' }}
          >
            <img
              src={img.src}
              alt={img.alt}
              draggable={false}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Lightbox — CSS transition, no backdrop-filter (too expensive)
   ──────────────────────────────────────────────────────────────── */
function Lightbox({ src, onClose }) {
  const [visible, setVisible] = useState(false);
  const [imgSrc,  setImgSrc]  = useState(null);

  useEffect(() => {
    if (src) {
      setImgSrc(src);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const t = setTimeout(() => setImgSrc(null), 260);
      return () => clearTimeout(t);
    }
  }, [src]);

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  if (!imgSrc) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center transition-[background] duration-300"
      style={{ background: visible ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0)' }}
      onClick={onClose}
    >
      <button
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white text-lg transition-colors duration-150 focus:outline-none"
        onClick={onClose}
        aria-label="Close"
      >✕</button>
      <img
        src={imgSrc}
        alt=""
        draggable={false}
        className="max-w-[92vw] max-h-[88vh] rounded-2xl shadow-2xl object-contain transition-[opacity,transform] duration-300"
        style={{
          opacity:   visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.86)',
          transitionTimingFunction: visible ? 'cubic-bezier(0.34,1.42,0.64,1)' : 'ease',
        }}
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   MAIN
   ──────────────────────────────────────────────────────────────── */
export default function DomeGallery({ isDark }) {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const vigBase = isDark ? '0,0,0' : '253,232,204';

  return (
    <>
      <section
        id="dome-gallery-section"
        className={`relative w-full overflow-hidden pt-8 pb-0 ${isDark ? 'bg-black' : 'bg-transparent'}`}
      >
        {/* Dot-grid — no expensive blur, just a repeat pattern */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 pointer-events-none ${
            isDark
              ? 'bg-[radial-gradient(rgba(255,255,255,0.022)_1px,transparent_1px)]'
              : 'bg-[radial-gradient(rgba(59,10,75,0.03)_1px,transparent_1px)]'
          } bg-[size:28px_28px]`}
        />


        {/* Gallery */}
        <div className="relative">
          <div className="flex flex-col gap-[10px]">
            {ROW_CFG.map((row, i) => (
              <InfiniteRow
                key={i}
                items={row.items}
                speed={row.speed}
                dir={row.dir}
                onOpen={setLightboxSrc}
              />
            ))}
          </div>

          {/* Radial vignette — colour-matched to page background */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `radial-gradient(ellipse 72% 92% at 50% 50%, transparent 28%, rgba(${vigBase},0.35) 52%, rgba(${vigBase},0.80) 72%, rgba(${vigBase},1) 100%)`,
            }}
          />
        </div>
      </section>

      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </>
  );
}
