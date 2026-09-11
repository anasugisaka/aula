import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Grid, CheckCircle2 } from 'lucide-react';

export const SlideGridModal = ({
  isOpen,
  onClose,
  slides,
  currentIndex,
  onSelectSlide
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.2 }}
          className="bg-white w-full max-w-5xl max-h-[85vh] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
        >
          {/* Modal Header */}
          <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-clinical-50 text-clinical-600 flex items-center justify-center">
                <Grid className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Visão Geral dos Slides</h3>
                <p className="text-xs text-slate-500">Selecione qualquer slide para pular diretamente</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Grid Container */}
          <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {slides.map((s, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    onSelectSlide(idx);
                    onClose();
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between group ${
                    isCurrent
                      ? 'bg-clinical-50/90 border-clinical-500 shadow-clinical ring-2 ring-clinical-400'
                      : 'bg-white border-slate-200 hover:border-clinical-300 hover:shadow-soft'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      isCurrent ? 'bg-clinical-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      #{s.id}
                    </span>
                    {isCurrent && <CheckCircle2 className="w-4 h-4 text-clinical-600" />}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-clinical-700">
                    {s.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 mt-2 block capitalize">
                    {s.type.replace('-', ' ')}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SlideGridModal;
