import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DynamicIcon from './Icons';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Heart,
  CheckCircle2,
  AlertCircle,
  Pill,
  ShieldAlert,
  ShieldCheck,
  ArrowRight,
  User,
  Activity,
  Award,
  QrCode,
  ExternalLink,
  Smartphone,
  Copy,
  Check
} from 'lucide-react';
import QRCode from 'qrcode';

// Animation variants for internal staggered elements
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const Slide = ({ slide, currentSlideNumber, totalSlides }) => {
  // Local state for interactive elements (reveals, timers, toggles)
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeScenario, setActiveScenario] = useState(null);

  // Timer state for Break Slide (Slide 20) and Final Challenge (Slide 32)
  const [breakSeconds, setBreakSeconds] = useState(15 * 60);
  const [isBreakRunning, setIsBreakRunning] = useState(false);

  const [challengeSeconds, setChallengeSeconds] = useState(120);
  const [isChallengeRunning, setIsChallengeRunning] = useState(false);

  // QR Code & Copy link state for feedback-form
  const [copiedLink, setCopiedLink] = useState(false);
  const [qrSvg, setQrSvg] = useState('');

  // Reset local state when slide changes
  useEffect(() => {
    setIsRevealed(false);
    setActiveScenario(null);
    setCopiedLink(false);
    if (slide.type === 'break-timer') {
      setBreakSeconds(15 * 60);
      setIsBreakRunning(false);
    }
    if (slide.type === 'final-challenge') {
      setChallengeSeconds(slide.defaultSeconds || 120);
      setIsChallengeRunning(false);
    }
    if ((slide.type === 'knowledge-fixation' || slide.type === 'feedback-form' || slide.type === 'form-qrcode') && slide.formUrl) {
      QRCode.toString(slide.formUrl, {
        type: 'svg',
        margin: 1,
        color: { dark: '#0f172a', light: '#ffffff' }
      }).then(svg => setQrSvg(svg)).catch(() => {});
    }
  }, [slide.id, slide.type, slide.formUrl]);

  const handleCopyLink = (url) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Break timer interval
  useEffect(() => {
    let interval = null;
    if (isBreakRunning && breakSeconds > 0) {
      interval = setInterval(() => {
        setBreakSeconds(prev => prev - 1);
      }, 1000);
    } else if (breakSeconds === 0) {
      setIsBreakRunning(false);
    }
    return () => clearInterval(interval);
  }, [isBreakRunning, breakSeconds]);

  // Challenge timer interval
  useEffect(() => {
    let interval = null;
    if (isChallengeRunning && challengeSeconds > 0) {
      interval = setInterval(() => {
        setChallengeSeconds(prev => prev - 1);
      }, 1000);
    } else if (challengeSeconds === 0) {
      setIsChallengeRunning(false);
    }
    return () => clearInterval(interval);
  }, [isChallengeRunning, challengeSeconds]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Render content based on slide type
  const renderSlideContent = () => {
    switch (slide.type) {
      // 1. Cover Slide
      case 'cover':
        return (
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto my-auto py-8">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-clinical-50 border border-clinical-200 text-clinical-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-clinical-600 animate-pulse" />
              <span>{slide.badge}</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 via-clinical-800 to-clinical-600 bg-clip-text text-transparent">
                {slide.title}
              </span>
            </motion.h1>

            <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl font-medium text-teal-700 mb-12 flex items-center justify-center gap-2">
              <span className="w-10 h-0.5 bg-teal-500 rounded-full inline-block"></span>
              {slide.subtitle}
              <span className="w-10 h-0.5 bg-teal-500 rounded-full inline-block"></span>
            </motion.h2>

            <motion.div variants={itemVariants} className="glass-card p-6 sm:p-8 rounded-3xl shadow-clinical max-w-md w-full border border-slate-100 flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-clinical-600 to-teal-500 flex items-center justify-center text-white shadow-md flex-shrink-0">
                <User className="w-7 h-7" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900 leading-snug">{slide.presenter.name}</p>
                <p className="text-sm font-medium text-clinical-700 mt-0.5">{slide.presenter.title}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                  <span className="inline-block w-2 h-2 rounded-full bg-teal-500"></span>
                  <span>Farmácia Hospitalar & Cuidados Clínicos</span>
                </div>
              </div>
            </motion.div>
          </div>
        );

      // 2. Question with Revealable Cards
      case 'question-reveal':
        return (
          <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{slide.title}</h2>
              {slide.subtitle && <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>}
            </motion.div>

            <motion.div variants={itemVariants} className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-clinical-50/80 to-blue-50/50 border border-clinical-200/70 shadow-soft mb-6 text-center">
              <p className="text-lg sm:text-xl font-semibold text-slate-800 leading-relaxed">{slide.question}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsRevealed(!isRevealed)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm sm:text-base flex items-center gap-2.5 transition-all shadow-md ${
                  isRevealed
                    ? 'bg-slate-800 hover:bg-slate-700 text-white'
                    : 'bg-clinical-600 hover:bg-clinical-700 text-white shadow-clinical'
                }`}
              >
                <DynamicIcon name={isRevealed ? "ChevronUp" : "Sparkles"} className="w-5 h-5" />
                <span>{isRevealed ? "Ocultar possibilidades" : slide.revealButtonText}</span>
              </motion.button>
            </motion.div>

            <AnimatePresence>
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 pt-2">
                    {slide.items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                        className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-clinical-400 transition-all flex flex-col items-center text-center group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-clinical-50 group-hover:bg-clinical-100 text-clinical-600 flex items-center justify-center mb-2.5 transition-colors">
                          <DynamicIcon name={item.icon} className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-slate-800 text-sm">{item.label}</span>
                        <span className="text-xs text-slate-500 mt-1 leading-snug">{item.desc}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      // 3. Challenge / Concept Card
      case 'challenge':
        return (
          <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-8">
              <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold uppercase tracking-wider border border-rose-200">
                Cenário Oncológico
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-600 mt-1">{slide.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              {slide.highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-clinical transition-all flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-clinical-50 text-clinical-600 flex items-center justify-center mb-4">
                    <DynamicIcon name={item.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {slide.summaryBox && (
              <motion.div variants={itemVariants} className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-elevated">
                <div className="flex items-center gap-2.5 text-teal-400 font-bold text-sm uppercase tracking-wide mb-2">
                  <Activity className="w-4 h-4" />
                  <span>{slide.summaryBox.title}</span>
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">{slide.summaryBox.text}</p>
              </motion.div>
            )}
          </div>
        );

      // 4. Case Study Intro
      case 'case-study-intro':
        return (
          <div className="max-w-4xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-8">
              <span className="px-3 py-1 rounded-full bg-clinical-50 text-clinical-700 text-xs font-semibold uppercase tracking-wider border border-clinical-200">
                Discussão Clínica Interativa
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-clinical mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-lg">
                    {slide.patient.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{slide.patient.name}, <span className="text-slate-500 font-normal">{slide.patient.age}</span></h3>
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200/60 mt-0.5">
                      {slide.patient.diagnosis}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                  Admissão Farmacêutica
                </span>
              </div>

              <div className="py-4">
                <p className="text-slate-700 leading-relaxed text-base">{slide.patient.context}</p>
              </div>

              {slide.medicalReport && (
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 mt-2">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">Informação Prévia da Equipe:</span>
                  <p className="text-base font-medium text-amber-950 italic">{slide.medicalReport}</p>
                </div>
              )}

              {slide.medicationsList && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Polifarmácia em Uso:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {slide.medicationsList.map((med, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                        <Pill className="w-3.5 h-3.5 text-clinical-600 flex-shrink-0" />
                        <span>{med}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide.evolution && (
                <div className="mt-4 p-4 rounded-xl bg-rose-50/80 border border-rose-200/80">
                  <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block mb-1">Evolução Clínica Subsequente:</span>
                  <p className="text-sm text-rose-950">{slide.evolution}</p>
                </div>
              )}
            </motion.div>

            {slide.question && (
              <motion.div variants={itemVariants} className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-clinical-600 to-teal-600 text-white shadow-md text-center">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-200 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Pergunta de Reflexão Clínica</span>
                </div>
                <p className="text-base sm:text-lg font-semibold">{slide.question}</p>
              </motion.div>
            )}
          </div>
        );

      // 5. Case Study Findings (Medications list & Neighbor Quote)
      case 'case-study-findings':
        return (
          <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-clinical-50 text-clinical-700 text-xs font-semibold uppercase tracking-wider border border-clinical-200">
                Resultado da Anamnese Farmacêutica
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6">
              {slide.medications.map((med, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-clinical-300 transition-all flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-bold text-slate-900 text-sm">{med.name}</span>
                    <span className="w-6 h-6 rounded-full bg-clinical-50 text-clinical-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {idx + 1}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-clinical-700 bg-clinical-50/80 px-2 py-1 rounded-md inline-block mb-1">
                      {med.posology}
                    </p>
                    <p className="text-xs text-slate-500 italic">{med.reason}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-amber-50 border-2 border-dashed border-amber-300 shadow-sm mb-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-0.5">Relato Espontâneo da Paciente:</span>
                <p className="text-base font-bold text-amber-950 italic">{slide.patientQuote}</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center p-4 rounded-xl bg-slate-900 text-white font-semibold text-base sm:text-lg shadow-sm">
              🤔 {slide.reflection}
            </motion.div>
          </div>
        );

      // 6. Case Study Points of Attention (with Reveal)
      case 'case-study-points':
        return (
          <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="p-6 rounded-2xl bg-clinical-50/90 border border-clinical-200 text-center mb-6 shadow-sm">
              <p className="text-lg font-semibold text-slate-800">{slide.question}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsRevealed(!isRevealed)}
                className="px-6 py-3 rounded-xl font-semibold text-sm sm:text-base flex items-center gap-2 bg-clinical-600 hover:bg-clinical-700 text-white shadow-clinical transition-all"
              >
                <DynamicIcon name={isRevealed ? "ChevronUp" : "Sparkles"} className="w-5 h-5" />
                <span>{isRevealed ? "Ocultar análise clínica" : slide.revealButtonText}</span>
              </motion.button>
            </motion.div>

            <AnimatePresence>
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
                    {slide.points.map((pt, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.04 }}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                              {pt.tag}
                            </span>
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm mb-1">{pt.title}</h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-snug mt-2">{pt.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      // 7. Concept Pillars / Anamnese
      case 'concept-pillars':
        return (
          <div className="max-w-4xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-8">
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold uppercase tracking-wider border border-teal-200">
                Pilar Metodológico
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <div className="space-y-3.5">
              {slide.pillars.map((p, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ x: 6 }}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-center gap-4 ${
                    p.highlight
                      ? 'bg-gradient-to-r from-teal-500/10 via-clinical-500/10 to-teal-500/5 border-teal-400 shadow-clinical'
                      : 'bg-white border-slate-200 shadow-sm hover:border-clinical-300'
                  }`}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-extrabold text-base sm:text-lg flex-shrink-0 ${
                    p.highlight ? 'bg-teal-600 text-white shadow-sm' : 'bg-clinical-50 text-clinical-700'
                  }`}>
                    {p.number}
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-base sm:text-lg font-bold ${p.highlight ? 'text-teal-900' : 'text-slate-800'}`}>
                      {p.question}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{p.desc}</p>
                  </div>
                  {p.highlight && (
                    <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold border border-teal-300">
                      Adesão Crítica
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        );

      // 8. Quote Highlight / Conciliação
      case 'quote-highlight':
        return (
          <div className="max-w-4xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-3">
              {slide.bullets.map((b, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-clinical-50 text-clinical-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{b}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-clinical-700 via-clinical-600 to-teal-600 text-white shadow-clinical border-l-8 border-teal-300 text-center sm:text-left">
              <p className="text-xl sm:text-2xl font-bold italic leading-snug">{slide.quote}</p>
              {slide.author && (
                <p className="text-xs sm:text-sm font-medium text-clinical-100 mt-4 uppercase tracking-wider">
                  — {slide.author}
                </p>
              )}
            </motion.div>
          </div>
        );

      // 9. Prescription Analysis (AC-T Protocol)
      case 'prescription-analysis':
        return (
          <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-clinical-50 text-clinical-700 text-xs font-semibold uppercase tracking-wider border border-clinical-200">
                Análise de Prescrição Médica
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-slate-200/90 shadow-clinical overflow-hidden mb-5">
              {/* Header with biometric data */}
              <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-teal-400" />
                  <span className="font-bold text-sm sm:text-base">Dados Biométricos da Paciente:</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <span className="bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">Peso: <strong className="text-teal-300">{slide.patientData.weight}</strong></span>
                  <span className="bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">Altura: <strong className="text-teal-300">{slide.patientData.height}</strong></span>
                  {/* SC badge: hidden until revealed */}
                  <AnimatePresence mode="wait">
                    {isRevealed ? (
                      <motion.span
                        key="bsa-revealed"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35 }}
                        className="bg-clinical-600 px-3 py-1 rounded-lg font-bold text-white shadow-sm"
                      >
                        SC = {slide.patientData.bsa}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="bsa-hidden"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-slate-700 px-3 py-1 rounded-lg font-bold text-slate-400 border border-dashed border-slate-500 select-none tracking-widest"
                        style={{ filter: 'blur(3px)' }}
                      >
                        SC = ?.?? m²
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Drugs table */}
              <div className="divide-y divide-slate-100">
                {slide.items.map((item, idx) => (
                  <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-clinical-50 text-clinical-700 font-bold flex items-center justify-center text-xs">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">{item.drug}</h4>
                        <span className="text-xs text-slate-500">Via: {item.route}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <span className="text-xs text-slate-400 block">Dose Protocolada</span>
                        <span className="text-sm font-semibold text-slate-700">{item.dose}</span>
                      </div>
                      {/* Calculated dose: hidden until revealed */}
                      <div className="bg-clinical-50 border border-clinical-200 px-3 py-1.5 rounded-xl min-w-[90px]">
                        <span className="text-xs text-clinical-600 block font-medium">Dose Calculada</span>
                        <AnimatePresence mode="wait">
                          {isRevealed ? (
                            <motion.span
                              key={`calc-${idx}-revealed`}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.06 }}
                              className="text-sm font-bold text-clinical-800 block"
                            >
                              {item.calculated}
                            </motion.span>
                          ) : (
                            <motion.span
                              key={`calc-${idx}-hidden`}
                              exit={{ opacity: 0 }}
                              className="text-sm font-bold text-slate-300 block select-none tracking-widest"
                              style={{ filter: 'blur(4px)' }}
                            >
                              ??? mg
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reveal button */}
            <motion.div variants={itemVariants} className="flex justify-center mb-5">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsRevealed(!isRevealed)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm sm:text-base flex items-center gap-2.5 transition-all shadow-md ${
                  isRevealed
                    ? 'bg-slate-700 hover:bg-slate-800 text-white'
                    : 'bg-clinical-600 hover:bg-clinical-700 text-white shadow-clinical'
                }`}
              >
                <DynamicIcon name={isRevealed ? "EyeOff" : "Calculator"} className="w-5 h-5" />
                <span>{isRevealed ? 'Ocultar cálculos' : 'Revelar SC e Doses Calculadas'}</span>
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white text-center font-bold text-base sm:text-lg shadow-md">
              🎯 {slide.prompt}
            </motion.div>
          </div>
        );

      // 10. Four Cards Grid (Validação Farmacêutica)
      case 'four-cards-grid':
        return (
          <div className="max-w-6xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-clinical-50 text-clinical-700 text-xs font-semibold uppercase tracking-wider border border-clinical-200">
                Checklist Sistemático de Segurança
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {slide.columns.map((col, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-clinical transition-all overflow-hidden flex flex-col"
                >
                  <div className="p-4 bg-gradient-to-b from-clinical-50/70 to-transparent border-b border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-clinical-600 text-white flex items-center justify-center shadow-sm">
                      <DynamicIcon name={col.icon} className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base">{col.category}</h3>
                  </div>
                  <div className="p-4 flex-1">
                    <ul className="space-y-2.5">
                      {col.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      // 11. Warning Banner (A conta está certa?)
      case 'warning-banner':
        return (
          <div className="max-w-4xl mx-auto w-full my-auto flex flex-col justify-center text-center">
            <motion.div variants={itemVariants} className="mb-4">
              <span className="px-4 py-1.5 rounded-full bg-rose-100 text-rose-800 text-sm font-bold border border-rose-300 inline-block shadow-sm">
                ⚠️ Reflexão Crítica de Farmácia Clínica
              </span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              {slide.title}
            </motion.h2>

            <motion.div variants={itemVariants} className="p-6 sm:p-8 rounded-3xl bg-rose-50 border-2 border-rose-200 text-rose-900 my-6 shadow-sm">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-rose-600 mb-3">
                {slide.mainAlert}
              </h3>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
                {slide.description}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card p-6 rounded-2xl border border-slate-200/80 shadow-clinical">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">A Equação Completa do Cuidado:</span>
              <p className="text-base sm:text-xl font-extrabold text-clinical-700 leading-relaxed">
                {slide.equation}
              </p>
            </motion.div>
          </div>
        );

      // 12. Case Follow-up (Três semanas depois)
      case 'case-study-followup':
      case 'case-followup':
        return (
          <div className="max-w-4xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-8">
              <span className="px-3 py-1 rounded-full bg-clinical-50 text-clinical-700 text-xs font-semibold uppercase tracking-wider border border-clinical-200">
                Evolução no 2º Ciclo
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-clinical mb-6">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 mb-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">Queixa Principal no Retorno:</span>
                  <p className="text-lg sm:text-xl font-bold text-rose-950 italic">{slide.complaint}</p>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">Outros Sintomas Identificados na Consulta:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {slide.otherSymptoms.map((s, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0"></span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-gradient-to-r from-clinical-600 to-teal-600 text-white text-center font-bold text-base sm:text-lg shadow-md">
              🔎 {slide.question}
            </motion.div>
          </div>
        );

      // 13. Investigation Checklist (Náusea e Vômito)
      case 'investigation-checklist':
        return (
          <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-clinical-50 text-clinical-700 text-xs font-semibold uppercase tracking-wider border border-clinical-200">
                Protocolo de Avaliação
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {slide.checks.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-soft hover:shadow-clinical transition-all flex flex-col"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 font-bold flex items-center justify-center text-xs flex-shrink-0">
                      {idx + 1}
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">{item.question}</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      // 14. Toxicity Grid
      case 'toxicity-grid':
        return (
          <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold uppercase tracking-wider border border-rose-200">
                Farmacovigilância Ativa
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {slide.toxicities.map((t, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft hover:shadow-clinical transition-all flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-clinical-50 text-clinical-600 flex items-center justify-center flex-shrink-0">
                    <DynamicIcon name={t.icon} className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base mb-1">{t.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      // 15. Myth Buster (Todo sintoma é toxicidade?)
      case 'myth-buster':
        return (
          <div className="max-w-4xl mx-auto w-full my-auto flex flex-col justify-center text-center">
            <motion.div variants={itemVariants} className="mb-4">
              <span className="px-4 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200">
                Mito vs. Realidade na Clínica
              </span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-snug mb-6">
              {slide.question}
            </motion.h2>

            <motion.div variants={itemVariants} className="inline-block mx-auto mb-8">
              <span className="px-8 py-3 rounded-2xl bg-rose-600 text-white font-black text-3xl sm:text-4xl shadow-lg inline-block tracking-wider">
                {slide.verdict}
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-slate-200 shadow-elevated border border-slate-800 max-w-3xl mx-auto">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-widest block mb-2">Compreensão Farmacológica:</span>
              <p className="text-base sm:text-lg leading-relaxed">{slide.explanation}</p>
            </motion.div>
          </div>
        );

      // 16. Clinical Reasoning (O Exemplo da Maria)
      case 'clinical-reasoning':
        return (
          <div className="max-w-4xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-clinical-50 text-clinical-700 text-xs font-semibold uppercase tracking-wider border border-clinical-200">
                Raciocínio Clínico Estruturado
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-clinical mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium block">Esquema em Uso</span>
                  <span className="text-sm font-bold text-slate-800">{slide.regimen}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
                  <span className="text-xs text-rose-700 font-medium block">Queixa da Paciente</span>
                  <span className="text-sm font-bold text-rose-950 italic">{slide.reportedProblem}</span>
                </div>
              </div>

              <div className="py-4">
                <p className="text-sm sm:text-base font-semibold text-clinical-700 mb-1">{slide.investigation}</p>
                <div className="p-4 rounded-xl bg-clinical-50/70 border border-clinical-200/80 text-slate-700 text-sm leading-relaxed">
                  💡 <strong className="text-slate-900">Mecanismo:</strong> {slide.mechanism}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                <span className="text-xs font-bold text-slate-400 block mb-1">ETAPA 1</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{slide.formula.step1}</span>
              </div>
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 shadow-sm text-center">
                <span className="text-xs font-bold text-teal-600 block mb-1">ETAPA 2</span>
                <span className="text-xs sm:text-sm font-bold text-teal-900">{slide.formula.step2}</span>
              </div>
              <div className="p-4 rounded-2xl bg-clinical-600 text-white shadow-sm text-center">
                <span className="text-xs font-bold text-clinical-200 block mb-1">ETAPA 3</span>
                <span className="text-xs sm:text-sm font-bold">{slide.formula.step3}</span>
              </div>
            </motion.div>
          </div>
        );

      // Biological Safety Cabinet Slide (Cuidados na Manipulação em CSB)
      case 'biological-safety':
        return (
          <div className="max-w-6xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-4">
              <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200 inline-flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{slide.classification || 'Biossegurança & Farmacotécnica Estéril • RDC 220/ANVISA'}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                {slide.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{slide.subtitle}</p>
            </motion.div>

            {/* Triple Protection Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {slide.tripleProtection.map((tp, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-slate-900 via-slate-800 to-clinical-950 text-white p-3.5 rounded-2xl border border-slate-700/70 shadow-md flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-inner">
                    <DynamicIcon name={tp.icon} className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-300">Proteção</span>
                      <span className="text-slate-400 text-xs">•</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">{tp.target}</h4>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{tp.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* 4 Pillars of CSB Practices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {slide.pillars.map((col, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-soft hover:shadow-clinical transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-3 bg-gradient-to-b from-clinical-50/50 to-white border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-clinical-100 text-clinical-700 group-hover:bg-clinical-600 group-hover:text-white transition-colors flex items-center justify-center shadow-xs">
                        <DynamicIcon name={col.icon} className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight">{col.category}</h3>
                    </div>
                  </div>
                  <div className="p-3 flex-1">
                    <ul className="space-y-1.5">
                      {col.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-3 py-1 bg-slate-50 border-t border-slate-100 text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>{col.tag}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Golden Rule Alert */}
            <motion.div variants={itemVariants} className="p-3 sm:p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300 text-amber-950 text-xs sm:text-sm font-semibold shadow-sm flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <p className="leading-snug">{slide.goldenRule}</p>
            </motion.div>
          </div>
        );

      // 18. Safety Matrix (Segurança do Paciente)
      case 'safety-matrix':
        return (
          <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold uppercase tracking-wider border border-teal-200">
                Cultura de Segurança Hospitalar
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
            </motion.div>

            <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-gradient-to-r from-clinical-600 to-teal-600 text-white shadow-clinical mb-6 text-center">
              <p className="text-base sm:text-lg font-bold leading-relaxed">{slide.corePrinciple}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              {slide.sectionTitle}
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {slide.errors.map((err, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  className="bg-white p-3.5 sm:p-4 rounded-2xl border border-rose-200/80 shadow-soft hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-500 flex-shrink-0" />
                    <span className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">{err.name}</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-snug">{err.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      // 18. Flow Pipeline (Onde o farmacêutico atua)
      case 'flow-pipeline':
        return (
          <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-clinical-50 text-clinical-700 text-xs font-semibold uppercase tracking-wider border border-clinical-200">
                Jornada Integrada do Medicamento
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-6">
              {slide.steps.map((st, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-white p-3 sm:p-3.5 rounded-2xl border border-slate-200 shadow-soft hover:shadow-clinical hover:border-clinical-400 transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-9 h-9 rounded-xl bg-clinical-50 group-hover:bg-clinical-600 group-hover:text-white text-clinical-700 flex items-center justify-center mb-2 transition-all shadow-sm">
                    <DynamicIcon name={st.icon} className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 block mb-0.5">ETAPA {st.num}</span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">{st.title}</span>
                  <span className="text-[10px] text-slate-500 leading-tight mt-1 hidden sm:block">{st.desc}</span>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="p-4 sm:p-5 rounded-2xl bg-clinical-50 border border-clinical-200 text-center">
              <p className="text-sm sm:text-base font-bold text-clinical-900">
                ✨ {slide.takeaway}
              </p>
            </motion.div>
          </div>
        );

      // 19. Continuous Care Cycle (O Cuidado Farmacêutico)
      case 'cycle-view':
        return (
          <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-8">
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold uppercase tracking-wider border border-teal-200">
                Metodologia Contínua
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-8">
              {slide.cycle.map((c, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-white p-4 rounded-2xl border-2 border-clinical-100 hover:border-clinical-500 shadow-soft transition-all flex flex-col items-center text-center"
                >
                  <div className="w-8 h-8 rounded-full bg-clinical-50 text-clinical-700 font-extrabold text-xs flex items-center justify-center mb-2 border border-clinical-200">
                    {c.step}
                  </div>
                  <h4 className="font-extrabold text-clinical-800 text-sm tracking-wide mb-1">{c.name}</h4>
                  <p className="text-xs text-slate-500 leading-snug">{c.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="p-4 sm:p-5 rounded-2xl bg-clinical-50 border border-clinical-200 text-center">
              <p className="text-sm sm:text-base font-bold text-clinical-900 leading-relaxed">
                {slide.message}
              </p>
            </motion.div>
          </div>
        );

      // 20. Break Timer (15 minutos)
      case 'break-timer':
        return (
          <div className="max-w-2xl mx-auto w-full my-auto flex flex-col items-center justify-center text-center py-6">
            <motion.div variants={itemVariants} className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 shadow-sm">
              <Clock className="w-8 h-8 animate-bounce" />
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
              {slide.title}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base text-slate-500 mb-8">{slide.subtitle}</motion.p>

            <motion.div variants={itemVariants} className="glass-card p-8 rounded-3xl border border-slate-200/90 shadow-clinical w-full mb-8">
              <div className="text-6xl sm:text-7xl font-mono font-black text-slate-900 tracking-wider mb-6">
                {formatTime(breakSeconds)}
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsBreakRunning(!isBreakRunning)}
                  className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 shadow-md transition-all ${
                    isBreakRunning ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                >
                  {isBreakRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span>{isBreakRunning ? 'Pausar' : 'Iniciar'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsBreakRunning(false);
                    setBreakSeconds(15 * 60);
                  }}
                  className="px-5 py-3 rounded-xl font-semibold text-sm sm:text-base bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-2 transition-all"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reiniciar</span>
                </button>
              </div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-sm text-slate-500 italic max-w-md">
              {slide.message}
            </motion.p>
          </div>
        );

      // 23. Education Pillars (O Paciente em Casa)
      case 'education-pillars':
        return (
          <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold uppercase tracking-wider border border-teal-200">
                Educação em Terapia Oral
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {slide.pillars.map((pil, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft hover:shadow-clinical transition-all flex flex-col"
                >
                  <div className="w-10 h-10 rounded-xl bg-clinical-50 text-clinical-600 flex items-center justify-center mb-3">
                    <DynamicIcon name={pil.icon} className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-3">{pil.title}</h4>
                  <ul className="space-y-2 flex-1">
                    {pil.items.map((it, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5 leading-snug">
                        <span className="text-teal-500 font-bold">•</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        );

      // 24. Interactive Scenarios (Desafios Paciente João)
      case 'interactive-scenarios':
        return (
          <div className="max-w-4xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-clinical-50 text-clinical-700 text-xs font-semibold uppercase tracking-wider border border-clinical-200">
                Casos Práticos de Consultório
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <div className="space-y-4">
              {slide.scenarios.map((sc) => (
                <motion.div
                  key={sc.id}
                  variants={itemVariants}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setActiveScenario(activeScenario === sc.id ? null : sc.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 text-base sm:text-lg">{sc.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{sc.situation}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-clinical-50 text-clinical-600 flex items-center justify-center flex-shrink-0 ml-4">
                      <DynamicIcon name={activeScenario === sc.id ? "ChevronUp" : "ChevronDown"} className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeScenario === sc.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 sm:p-5 bg-teal-50/70 border-t border-teal-100 text-teal-950 text-xs sm:text-sm leading-relaxed"
                      >
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>{sc.guidance}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        );

      // 25. Adherence Matrix
      case 'adherence-matrix':
        return (
          <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold uppercase tracking-wider border border-rose-200">
                Barreiras ao Tratamento
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {slide.factors.map((f, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-soft flex flex-col justify-between"
                >
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">{f.name}</h4>
                  <p className="text-[11px] text-slate-500 leading-snug">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-gradient-to-r from-clinical-700 to-teal-700 text-white text-center shadow-clinical font-semibold text-sm sm:text-base">
              {slide.goldenRule}
            </motion.div>
          </div>
        );

      // 26. Health Education (5 Questions)
      case 'health-education':
        return (
          <div className="max-w-4xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold uppercase tracking-wider border border-teal-200">
                Didática Farmacêutica
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <div className="space-y-3">
              {slide.steps.map((st, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-clinical-400 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-clinical-600 text-white font-extrabold flex items-center justify-center text-sm flex-shrink-0 shadow-sm">
                    {st.num}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">{st.question}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{st.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      // 28. Multidisciplinary Team
      case 'multidisciplinary':
        return (
          <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-clinical-50 text-clinical-700 text-xs font-semibold uppercase tracking-wider border border-clinical-200">
                Atenção Centrada no Paciente
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            {/* Central Patient Badge */}
            <motion.div variants={itemVariants} className="p-4 rounded-2xl bg-gradient-to-r from-teal-500 to-clinical-600 text-white text-center shadow-clinical max-w-sm mx-auto mb-6">
              <Heart className="w-6 h-6 mx-auto mb-1 animate-pulse" />
              <span className="font-black text-sm uppercase tracking-wider block">PACIENTE NO CENTRO DO CUIDADO</span>
            </motion.div>

            {/* Team Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
              {slide.team.map((member, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-soft flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-clinical-50 text-clinical-600 flex items-center justify-center flex-shrink-0">
                    <DynamicIcon name={member.icon} className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-800 text-xs sm:text-sm leading-tight">{member.role}</span>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs sm:text-sm text-slate-600 font-medium">
              💡 {slide.answer}
            </motion.div>
          </div>
        );

      // 29. Interdisciplinary Actions
      case 'interdisciplinary-actions':
        return (
          <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-clinical-50 text-clinical-700 text-xs font-semibold uppercase tracking-wider border border-clinical-200">
                Integração Hospitalar
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6">
              {slide.actions.map((act, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-soft flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">{act.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{act.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm font-semibold text-center">
              {slide.competenceNote}
            </motion.div>
          </div>
        );

      // 30. Interactions Deepdive
      case 'interactions-deepdive':
        return (
          <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-clinical-50 text-clinical-700 text-xs font-semibold uppercase tracking-wider border border-clinical-200">
                Farmacologia Clínica
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {slide.pillars.map((pil, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-soft flex flex-col"
                >
                  <div className="w-8 h-8 rounded-lg bg-clinical-50 text-clinical-700 font-bold flex items-center justify-center text-xs mb-3">
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-2">{pil.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{pil.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-clinical-950 to-slate-900 text-white text-center shadow-clinical">
              <p className="text-base sm:text-lg font-bold italic text-teal-300">
                {slide.quote}
              </p>
            </motion.div>
          </div>
        );

      // 31. Bridge Concept
      case 'bridge-concept':
        return (
          <div className="max-w-4xl mx-auto w-full my-auto flex flex-col justify-center text-center">
            <motion.div variants={itemVariants} className="mb-4">
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold uppercase tracking-wider border border-teal-200">
                Conexão Humana & Técnica
              </span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
              {slide.title}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base text-slate-500 mb-8">{slide.subtitle}</motion.p>

            <motion.div variants={itemVariants} className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-clinical-600 to-teal-600 text-white shadow-clinical mb-8">
              <p className="text-lg sm:text-2xl font-black tracking-wide leading-relaxed">
                {slide.equation}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 max-w-2xl mx-auto">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                {slide.desc}
              </p>
            </motion.div>
          </div>
        );

      // 32. Final Challenge (60 Seconds)
      case 'final-challenge':
        return (
          <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider border border-rose-300">
                Atividade Interativa
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{slide.title}</h2>
              <p className="text-base text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-clinical mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-base sm:text-lg font-bold text-slate-900">{slide.challengePrompt}</p>
              </div>

              {/* 60s Countdown Timer Widget */}
              <div className="flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-2xl flex-shrink-0 shadow-md">
                <span className="font-mono text-2xl font-black text-teal-400">{formatTime(challengeSeconds)}</span>
                <button
                  onClick={() => setIsChallengeRunning(!isChallengeRunning)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                  title={isChallengeRunning ? 'Pausar' : 'Iniciar'}
                >
                  {isChallengeRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setIsChallengeRunning(false);
                    setChallengeSeconds(slide.defaultSeconds || 120);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Reiniciar"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsRevealed(!isRevealed)}
                className="px-6 py-3 rounded-xl font-semibold text-sm sm:text-base flex items-center gap-2 bg-clinical-600 hover:bg-clinical-700 text-white shadow-clinical transition-all"
              >
                <DynamicIcon name={isRevealed ? "ChevronUp" : "Sparkles"} className="w-5 h-5" />
                <span>{isRevealed ? "Ocultar oportunidades" : slide.revealButtonText}</span>
              </motion.button>
            </motion.div>

            <AnimatePresence>
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {slide.opportunities.map((op, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-teal-50 text-teal-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {op.num}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">{op.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      // Atividade de Fixação de Conhecimento com QR Code
      case 'knowledge-fixation':
      case 'feedback-form':
      case 'form-qrcode':
        return (
          <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center py-2">
            <motion.div variants={itemVariants} className="text-center mb-5">
              <span className="px-3.5 py-1 rounded-full bg-clinical-50 text-clinical-700 text-xs font-bold uppercase tracking-wider border border-clinical-200 inline-flex items-center gap-1.5 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-clinical-600" />
                <span>{slide.badge || 'Atividade Prática • Fixação de Conteúdo'}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
                {slide.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">{slide.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Left Column: Instructions & Actions */}
              <motion.div variants={itemVariants} className="md:col-span-7 flex flex-col gap-3.5">
                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-soft">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3.5 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-teal-600" />
                    <span>Como acessar pelo celular:</span>
                  </h3>
                  <div className="space-y-2.5">
                    {(slide.instructions || [
                      'Aponte a câmera do seu smartphone para o QR Code ao lado',
                      'Acesse o formulário de questões práticas de fixação',
                      'Responda aos exercícios para consolidar o raciocínio clínico'
                    ]).map((inst, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-clinical-50 text-clinical-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-clinical-200">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          {inst}
                        </p>
                      </div>
                    ))}
                  </div>

                  {slide.highlights && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-slate-100">
                      {slide.highlights.map((h, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center">
                          <DynamicIcon name={h.icon} className="w-4 h-4 text-clinical-600 mb-1" />
                          <span className="text-[11px] font-bold text-slate-800">{h.title}</span>
                          <span className="text-[10px] text-slate-500 mt-0.5 leading-tight">{h.desc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={slide.formUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] px-5 py-3 rounded-2xl bg-gradient-to-r from-clinical-600 to-teal-600 hover:from-clinical-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-clinical transition-all flex items-center justify-center gap-2"
                  >
                    <span>Abrir Atividade no Navegador</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => handleCopyLink(slide.formUrl)}
                    className="px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2"
                    title="Copiar link"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Link Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-500" />
                        <span>Copiar Link</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Right Column: QR Code Card */}
              <motion.div variants={itemVariants} className="md:col-span-5 flex flex-col items-center">
                <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-clinical-100 shadow-elevated flex flex-col items-center text-center relative group w-full max-w-xs">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200 mb-3 flex items-center gap-1.5">
                    <QrCode className="w-3.5 h-3.5 text-teal-600" />
                    <span>Atividade Prática • Fixação</span>
                  </span>

                  <div className="w-48 h-48 sm:w-56 sm:h-56 p-2.5 bg-white rounded-2xl border border-slate-200 shadow-inner flex items-center justify-center overflow-hidden">
                    {qrSvg ? (
                      <div
                        className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                        dangerouslySetInnerHTML={{ __html: qrSvg }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-slate-300 animate-pulse" />
                      </div>
                    )}
                  </div>

                  <p className="text-xs font-bold text-slate-800 mt-3 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-clinical-600" />
                    <span>Aponte a câmera do seu celular</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-mono select-all">
                    {slide.shortUrl || slide.formUrl}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        );

      // Conclusion
        return (
          <div className="max-w-4xl mx-auto w-full my-auto flex flex-col items-center justify-center text-center py-8">
            <motion.div variants={itemVariants} className="w-16 h-16 rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 shadow-sm">
              <Award className="w-8 h-8" />
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 whitespace-pre-line">
              {slide.title}
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-slate-500 mb-8">{slide.subtitle}</motion.p>

            <motion.div variants={itemVariants} className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-clinical max-w-2xl w-full mb-8">
              <p className="text-base sm:text-lg text-slate-600 mb-2">{slide.coreMessage}</p>
              <p className="text-xl sm:text-2xl font-extrabold text-teal-700 leading-snug">{slide.highlightMessage}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <p className="text-lg font-bold text-slate-900">{slide.author.name}</p>
              <p className="text-sm font-medium text-clinical-700">{slide.author.title}</p>
              <p className="text-xs text-slate-400 mt-2">{slide.author.thankYou}</p>
            </motion.div>
          </div>
        );

      // Default fallback
      default:
        return (
          <div className="max-w-4xl mx-auto w-full my-auto p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{slide.title}</h2>
            <p className="text-slate-600">{slide.subtitle}</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-full w-full flex flex-col justify-between overflow-y-auto px-4 sm:px-8 py-6"
    >
      {renderSlideContent()}
    </motion.div>
  );
};

export default Slide;
