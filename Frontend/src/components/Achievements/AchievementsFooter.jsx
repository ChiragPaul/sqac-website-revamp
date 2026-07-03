import { motion } from 'framer-motion';
import { ArrowUpRight, Heart } from 'lucide-react';

const links = [
  { label: 'sqac.space', href: 'https://sqac.space' },
  { label: 'LinkedIn',   href: '#' },
  { label: 'Instagram',  href: '#' },
  { label: 'GitHub',     href: '#' },
];

export default function AchievementsFooter() {
  return (
    <footer
      id="main-footer"
      className="relative text-center px-6 py-12"
    >
      {/* Gradient fade from dome section — replaces hard border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 dark:via-white/6 to-transparent" />
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
            <span className="text-white font-extrabold text-[13px]">SQ</span>
          </div>
          <span className="font-bold text-[18px] tracking-tight text-[#3B0A4B] dark:text-white">
            SQAC
          </span>
        </div>

        <p className="text-[13px] text-[#9a6a50] dark:text-gray-500 mb-6 leading-relaxed">
          Software Quality Assurance Community · SRMIST, Kattankulathur
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-5 mb-7">
          {links.map((l) => (
            <motion.a
              key={l.label}
              href={l.href}
              whileHover={{ scale: 1.06 }}
              id={`footer-link-${l.label.toLowerCase().replace('.', '-')}`}
              className="inline-flex items-center gap-1 text-[13px] text-[#5c3a2a] dark:text-gray-400 no-underline hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-150"
            >
              {l.label}
              <ArrowUpRight size={12} />
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent mb-5" />

        {/* Copyright */}
        <p className="flex items-center justify-center gap-1.5 text-[12px] text-[#9a6a50] dark:text-gray-600">
          Made with <Heart size={12} className="fill-pink-500 stroke-pink-500" /> by SQAC · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
