import React from 'react';
import { Pill, Activity, Shield } from 'lucide-react';

export const Header = ({ currentSlide, totalSlides }) => {
  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3 flex-shrink-0 z-30 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-clinical-600 to-teal-500 flex items-center justify-center text-white shadow-sm flex-shrink-0">
          <Pill className="w-4 h-4" />
        </div>
        <div>
          <h1 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
            Cuidados Farmacêuticos na Oncologia
          </h1>
          <p className="text-[10px] sm:text-xs text-slate-500 font-medium hidden sm:block">
            Ana Carolina Anversa Sugisaka • Farmacêutica Especialista
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-clinical-50 text-clinical-700 border border-clinical-200 hidden md:inline-block">
          {currentSlide.type.replace('-', ' ')}
        </span>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          <Activity className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
          <span className="font-semibold text-slate-700">Slide {currentSlide.id}</span>
          <span className="text-slate-400">/ {totalSlides}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
