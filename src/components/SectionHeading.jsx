import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center', // 'center' | 'left'
  dark = false,
  className = '',
}) {
  const isLeft = align === 'left';

  return (
    <div className={`mb-12 sm:mb-16 ${isLeft ? 'text-left' : 'text-center max-w-3xl mx-auto'} ${className}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase mb-4 ${
            dark
              ? 'bg-[#252C37] text-[#D8C7A5] border border-[#384353]'
              : 'bg-[#F2EFE8] text-[#6E6350] border border-[#E3DC CE]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
          {badge}
        </motion.div>
      )}

      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`editorial-title text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.15] mb-5 ${
            dark ? 'text-[#FAF8F5]' : 'text-[#1C1E21]'
          }`}
        >
          {title}
        </motion.h2>
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-base sm:text-lg leading-relaxed ${
            dark ? 'text-[#A6B0BE]' : 'text-[#5C616B]'
          } ${isLeft ? 'max-w-2xl' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}

      <div className={`mt-5 flex items-center ${isLeft ? 'justify-start' : 'justify-center'} gap-2`}>
        <div className={`h-[1px] w-12 ${dark ? 'bg-[#384353]' : 'bg-[#DCD5C8]'}`} />
        <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
        <div className={`h-[1px] w-12 ${dark ? 'bg-[#384353]' : 'bg-[#DCD5C8]'}`} />
      </div>
    </div>
  );
}

