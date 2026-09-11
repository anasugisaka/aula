import React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Grid,
  Sparkles
} from 'lucide-react';

export const Controls = ({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  onOpenGrid,
  isFullscreen,
  onToggleFullscreen
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSlides - 1;
  const progressPercentage = ((currentIndex + 1) / totalSlides) * 100;

  return (
    <footer className="w-full bg-white/90 backdrop-blur-md border-t border-slate-200/80 px-4 sm:px-8 py-3 flex-shrink-0 z-30 flex flex-col gap-2">
      {/* Visual Progress Bar */}
      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-clinical-600 via-teal-500 to-clinical-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Overview Grid & Fullscreen */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenGrid}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Visualizar todos os slides (Grade)"
          >
            <Grid className="w-4 h-4 text-clinical-600" />
            <span className="hidden sm:inline">Visão Geral</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleFullscreen}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors"
            title={isFullscreen ? "Sair da tela cheia (F)" : "Modo Tela Cheia (F)"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </motion.button>
        </div>

        {/* Center: Slide Counter & Pill */}
        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs sm:text-sm font-bold text-slate-700 shadow-inner">
            <span className="text-clinical-700">{currentIndex + 1}</span>
            <span className="text-slate-400 mx-1">/</span>
            <span>{totalSlides}</span>
          </div>
          <span className="hidden md:inline-block text-[11px] text-slate-400 font-medium">
            (Use ← → ou Espaço)
          </span>
        </div>

        {/* Right Side: Navigation Buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={!isFirst ? { scale: 1.05 } : {}}
            whileTap={!isFirst ? { scale: 0.95 } : {}}
            disabled={isFirst}
            onClick={onPrev}
            className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm ${
              isFirst
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
                : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-sm'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </motion.button>

          <motion.button
            whileHover={!isLast ? { scale: 1.05 } : {}}
            whileTap={!isLast ? { scale: 0.95 } : {}}
            disabled={isLast}
            onClick={onNext}
            className={`px-5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md ${
              isLast
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
                : 'bg-gradient-to-r from-clinical-600 to-teal-600 hover:from-clinical-700 hover:to-teal-700 text-white shadow-clinical'
            }`}
          >
            <span>Próximo</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Controls;
