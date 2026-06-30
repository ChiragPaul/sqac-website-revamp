import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Award, Users, ExternalLink } from 'lucide-react';
import { achievements } from '../../data/achievements';

/* ─── Category config ─── */
const CAT = {
  Events:       { grad: 'from-pink-500 to-rose-500',    border: 'border-pink-400/30',   accent: 'text-pink-400'   },
  Competitions: { grad: 'from-orange-500 to-amber-400', border: 'border-orange-400/30', accent: 'text-orange-400' },
  Community:    { grad: 'from-violet-500 to-pink-500',  border: 'border-violet-400/30', accent: 'text-violet-400' },
  Technical:    { grad: 'from-cyan-500 to-blue-500',    border: 'border-cyan-400/30',   accent: 'text-cyan-400'   },
  Recognition:  { grad: 'from-amber-400 to-orange-500', border: 'border-amber-400/30',  accent: 'text-amber-400'  },
};
const DEFAULT_CAT = { grad: 'from-pink-500 to-orange-500', border: 'border-pink-400/30', accent: 'text-pink-400' };

/* ─── Image carousel ─── */
function ImageCarousel({ images, title }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className="relative w-full h-64 sm:h-72 bg-zinc-900 overflow-hidden shrink-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="absolute inset-0"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -32 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <img
            src={images[idx]}
            alt={`${title} photo ${idx + 1}`}
            className="w-full h-full object-cover"
            draggable={false}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10
              w-8 h-8 rounded-full bg-black/40 border border-white/20 text-white
              flex items-center justify-center hover:bg-black/60 transition-colors duration-150"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10
              w-8 h-8 rounded-full bg-black/40 border border-white/20 text-white
              flex items-center justify-center hover:bg-black/60 transition-colors duration-150"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-200 border-0
                  ${i === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Stat pill ─── */
function StatPill({ label, value }) {
  return (
    <div className="flex flex-col items-center px-4 py-2.5 rounded-xl min-w-[72px]
      bg-orange-500/6 border border-orange-400/15
      dark:bg-white/4 dark:border-white/8">
      <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent text-lg font-extrabold leading-tight">{value}</span>
      <span className="text-[9px] font-semibold uppercase tracking-widest mt-0.5
        text-[#9a6a50] dark:text-zinc-500">{label}</span>
    </div>
  );
}

/* ─── Main Modal ─── */
export default function AchievementModal({ achievement, onClose }) {
  const [current, setCurrent] = useState(achievement);
  const currentIdx = achievements.findIndex((a) => a.id === current.id);

  const goNext = useCallback(() =>
    setCurrent(achievements[(currentIdx + 1) % achievements.length]),
    [currentIdx]);

  const goPrev = useCallback(() =>
    setCurrent(achievements[(currentIdx - 1 + achievements.length) % achievements.length]),
    [currentIdx]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowRight')  goNext();
      if (e.key === 'ArrowLeft')   goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, goNext, goPrev]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const cat = CAT[current.category] || DEFAULT_CAT;
  const images = [current.image, `/img${(current.id % 6) + 1}.png`];

  const statsEntries = Object.entries(current.stats || {}).map(([k, v]) => ({
    label: k.charAt(0).toUpperCase() + k.slice(1),
    value: typeof v === 'number' && v >= 1000 ? `${(v / 1000).toFixed(0)}K+` : String(v),
  }));

  return (
    /* Backdrop */
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4
        bg-black/70 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Panel */}
      <motion.div
        className="relative w-full max-w-[760px] max-h-[88vh] rounded-3xl overflow-hidden
          flex flex-col
          bg-white dark:bg-zinc-900
          shadow-[0_40px_100px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.12)]
          dark:shadow-[0_40px_100px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)]"
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 z-10 bg-gradient-to-r ${cat.grad}`} />

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full
            bg-black/10 dark:bg-white/8 border border-black/8 dark:border-white/8
            text-[#3B0A4B] dark:text-zinc-300
            flex items-center justify-center cursor-pointer
            hover:bg-pink-500/15 hover:scale-110 transition-all duration-150"
        >
          <X size={16} />
        </button>

        {/* Prev / Next navigation (side arrows) */}
        <button
          onClick={goPrev}
          aria-label="Previous achievement"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full
            bg-black/8 dark:bg-white/6 border border-black/6 dark:border-white/6
            text-[#3B0A4B] dark:text-zinc-300
            flex items-center justify-center cursor-pointer
            hover:bg-orange-400/15 hover:scale-110 transition-all duration-150"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={goNext}
          aria-label="Next achievement"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full
            bg-black/8 dark:bg-white/6 border border-black/6 dark:border-white/6
            text-[#3B0A4B] dark:text-zinc-300
            flex items-center justify-center cursor-pointer
            hover:bg-orange-400/15 hover:scale-110 transition-all duration-150"
        >
          <ChevronRight size={18} />
        </button>

        {/* Scrollable body — content swaps with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="flex-1 overflow-y-auto overscroll-contain custom-scroll"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Image carousel */}
            <ImageCarousel images={images} title={current.title} />

            {/* Content */}
            <div className="px-8 py-6 sm:px-9 sm:py-7">

              {/* Category + Date */}
              <div className="flex items-center gap-2.5 flex-wrap mb-3">
                <span className={`bg-gradient-to-r ${cat.grad}
                  text-white text-[10px] font-bold tracking-widest uppercase
                  px-3 py-1 rounded-full`}>
                  {current.category}
                </span>
                <span className="flex items-center gap-1.5 text-[12px]
                  text-[#9a6a50] dark:text-zinc-500">
                  <Calendar size={12} />
                  {current.date}
                </span>
              </div>

              {/* Title */}
              <h2
                id="modal-title"
                className="font-extrabold leading-snug tracking-tight mb-4
                  text-[#3B0A4B] dark:text-zinc-50"
                style={{ fontSize: 'clamp(1.15rem, 3vw, 1.6rem)' }}
              >
                {current.title}
              </h2>

              {/* Highlight */}
              {current.highlight && (
                <div className={`flex items-start gap-2.5 mb-4
                  bg-orange-500/5 dark:bg-orange-400/8
                  border ${cat.border} rounded-xl px-3.5 py-3`}>
                  <Award size={14} className={`shrink-0 mt-0.5 ${cat.accent}`} />
                  <p className="text-[13px] font-semibold leading-relaxed
                    text-[#5c3a2a] dark:text-zinc-300">
                    {current.highlight}
                  </p>
                </div>
              )}

              {/* Description */}
              <p className="text-[13.5px] leading-[1.8] mb-5
                text-[#4b3728] dark:text-zinc-400">
                {current.description}
              </p>

              {/* Stats */}
              {statsEntries.length > 0 && (
                <div className="mb-5">
                  <p className="flex items-center gap-1.5 text-[9.5px] font-bold tracking-[0.12em]
                    uppercase text-[#9a6a50] dark:text-zinc-500 mb-2.5">
                    Key Numbers
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {statsEntries.map((s) => <StatPill key={s.label} {...s} />)}
                  </div>
                </div>
              )}

              {/* Tags */}
              {current.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {current.tags.map((tag) => (
                    <span key={tag}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold
                        bg-pink-500/8 border border-pink-400/20 text-pink-700
                        dark:bg-pink-400/10 dark:border-pink-400/20 dark:text-pink-300">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Team */}
              {current.team?.length > 0 && (
                <div className="mb-5">
                  <p className="flex items-center gap-1.5 text-[9.5px] font-bold tracking-[0.12em]
                    uppercase text-[#9a6a50] dark:text-zinc-500 mb-2.5">
                    <Users size={11} /> Team
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {current.team.map((m) => (
                      <span key={m}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium
                          bg-black/5 border border-black/6 text-[#5c3a2a]
                          dark:bg-white/5 dark:border-white/6 dark:text-zinc-400">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer row */}
              <div className="flex items-center justify-between flex-wrap gap-3 pt-4
                border-t border-black/7 dark:border-white/7">
                <span className="text-[11px] text-[#9a6a50] dark:text-zinc-600">
                  ← → Arrow keys to navigate
                </span>
                <a
                  href="https://sqac.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full
                    bg-gradient-to-r ${cat.grad}
                    text-white text-[13px] font-bold no-underline
                    shadow-[0_4px_16px_rgba(236,72,153,0.28)]
                    hover:shadow-[0_6px_24px_rgba(236,72,153,0.42)]
                    hover:scale-[1.03] transition-all duration-200`}
                >
                  Join SQAC <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex justify-center gap-1 py-3 shrink-0
          bg-white dark:bg-zinc-900 border-t border-black/5 dark:border-white/4">
          {achievements.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all duration-250"
              style={{
                width: i === currentIdx ? 18 : 5,
                background: i === currentIdx
                  ? 'linear-gradient(90deg,#ec4899,#f97316)'
                  : 'rgba(0,0,0,0.12)',
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
