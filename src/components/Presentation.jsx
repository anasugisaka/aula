import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slidesData } from '../data/slidesData';
import Slide from './Slide';
import Controls from './Controls';
import Header from './Header';
import SlideGridModal from './SlideGridModal';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.98
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  exit: (direction) => ({
    x: direction > 0 ? -50 : 50,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1]
    }
  })
};

export const Presentation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Touch swipe state
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const totalSlides = slidesData.length;
  const currentSlide = slidesData[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < totalSlides - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, totalSlides]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const handleSelectSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Touch swipe handlers
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    // Only trigger if horizontal swipe is dominant (not a scroll)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        handleNext(); // swipe left → próximo
      } else {
        handlePrev(); // swipe right → anterior
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }, [handleNext, handlePrev]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Do not navigate if an input or textarea is active
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'g') {
        setIsGridOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        if (isGridOpen) setIsGridOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isGridOpen]);

  // Fullscreen change listener
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100/70 to-clinical-50/30 select-none">
      {/* Header */}
      <Header currentSlide={currentSlide} totalSlides={totalSlides} />

      {/* Main Slide Deck Canvas */}
      <main
        className="flex-1 relative overflow-hidden flex items-center justify-center p-2 sm:p-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-full h-full max-w-6xl max-h-[860px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-elevated border border-slate-200/90 relative overflow-hidden flex flex-col">
          {/* Subtle Ambient Background Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-clinical-100/40 rounded-full blur-3xl pointer-events-none -z-0 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none -z-0 -translate-x-1/2 translate-y-1/2" />

          {/* AnimatePresence for Slide Transitions */}
          <div className="relative w-full h-full flex-1 overflow-hidden z-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full"
              >
                <Slide
                  slide={currentSlide}
                  currentSlideNumber={currentIndex + 1}
                  totalSlides={totalSlides}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Floating/Bottom Controls */}
      <Controls
        currentIndex={currentIndex}
        totalSlides={totalSlides}
        onPrev={handlePrev}
        onNext={handleNext}
        onOpenGrid={() => setIsGridOpen(true)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Overview Grid Modal */}
      <SlideGridModal
        isOpen={isGridOpen}
        onClose={() => setIsGridOpen(false)}
        slides={slidesData}
        currentIndex={currentIndex}
        onSelectSlide={handleSelectSlide}
      />
    </div>
  );
};

export default Presentation;
