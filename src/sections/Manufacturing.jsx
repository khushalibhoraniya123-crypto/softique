import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cog,
  CheckCircle2,
  FileText,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';

export default function Manufacturing() {
  const [activeStep, setActiveStep] = useState(0);

  // Video player states
  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(39.8);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [bufferedPercent, setBufferedPercent] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  // Format time (seconds -> mm:ss)
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Play / Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch((err) => {
          console.warn('[Machine Video] Initial play error, retrying muted:', err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current
              .play()
              .then(() => {
                setIsPlaying(true);
                setHasStarted(true);
              })
              .catch((e) => console.error(e));
          }
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Mute toggle
  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted && volume === 0) {
      videoRef.current.volume = 0.8;
      setVolume(0.8);
    }
  };

  // Volume slider change
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  // Timeline seek handler
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Replay handler
  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      })
      .catch((err) => console.warn(err));
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen?.().then(() => {
        setIsFullscreen(true);
      }).catch((err) => console.warn(err));
    } else {
      document.exitFullscreen?.().then(() => {
        setIsFullscreen(false);
      }).catch((err) => console.warn(err));
    }
  };

  // Monitor fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Update time and buffer progress
  const handleTimeUpdate = () => {
    if (!videoRef.current || isSeeking) return;
    setCurrentTime(videoRef.current.currentTime);

    if (videoRef.current.buffered.length > 0 && videoRef.current.duration) {
      const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
      setBufferedPercent((bufferedEnd / videoRef.current.duration) * 100);
    }
  };

  // Video loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  // Auto-hide controls when playing and inactive
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3200);
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    } else {
      resetControlsTimeout();
    }
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  return (
    <section id="process" className="py-20 lg:py-32 bg-[#12151A] text-[#FAF8F5] relative overflow-hidden">
      {/* Background dark cinematic gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#1E2838]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#2A2318]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Dark Heading */}
        <SectionHeading
          badge="Production Setup & Process"
          title="Focused Manufacturing. Controlled Quality."
          subtitle={siteConfig.manufacturing.subheadline}
          dark={true}
        />

        {/* 1-Machine Dedicated Facility Context Banner */}
        <div className="max-w-3xl mx-auto mb-16 p-5 rounded-2xl bg-[#1A1F27] border border-[#2B3442] shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-[#252E3B] text-[#D8C7A5] shrink-0">
              <Cog className="w-5 h-5 animate-[spin_10s_linear_infinite]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-white">Single-Machine Dedicated Operation</span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#2E3B4E] text-[#86A8D6] font-medium">
                  Verified Facility Context
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#A0AAB8] leading-relaxed">
                {siteConfig.manufacturing.unitSummary}
              </p>
            </div>
          </div>
        </div>

        {/* Machine Video Player & Process Timeline Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Premium Factory Machine Video Showcase */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div
              ref={playerContainerRef}
              onMouseMove={resetControlsTimeout}
              onMouseEnter={() => setShowControls(true)}
              className="relative rounded-3xl overflow-hidden bg-[#161B23] border border-[#2C3647] shadow-2xl p-3 flex flex-col justify-between group transition-all duration-300"
            >
              {/* Media Viewport Container */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-2xl overflow-hidden bg-[#0A0D12] flex items-center justify-center select-none">
                
                {/* Ambient Blurred Background (fills borders seamlessly for 9:16 vertical video) */}
                <img
                  src={siteConfig.manufacturing.machinePosterPath}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
                />
                <div className="absolute inset-0 bg-radial from-transparent via-[#0A0D12]/60 to-[#0A0D12] pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40" />

                {/* The Primary Video Element */}
                <video
                  ref={videoRef}
                  src={siteConfig.manufacturing.machineVideoPath}
                  poster={siteConfig.manufacturing.machinePosterPath}
                  preload="metadata"
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => {
                    setIsPlaying(false);
                    setShowControls(true);
                  }}
                  onClick={togglePlay}
                  onDoubleClick={toggleFullscreen}
                  className="relative z-10 w-full h-full object-contain cursor-pointer drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                />

                {/* Top Overlay Badges */}
                <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
                  {/* Live Status Badge */}
                  <div className="bg-[#0E1217]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-[#FAF8F5] flex items-center gap-2 shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                    </span>
                    <span className="font-semibold tracking-wider text-[11px] uppercase">
                      Live Machine Showcase
                    </span>
                  </div>

                  {/* Facility Tag */}
                  <div className="bg-[#0E1217]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-[#D8C7A5] font-medium shadow-lg hidden sm:flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                    <span>Rajkot Facility</span>
                  </div>
                </div>

                {/* Elegant Opening Title Overlay (Displays before start & during first 3.5s of playback) */}
                <AnimatePresence>
                  {(!hasStarted || (isPlaying && currentTime < 3.5)) && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute top-14 inset-x-4 z-25 pointer-events-none flex flex-col items-center text-center"
                    >
                      <div className="px-5 py-2.5 rounded-2xl bg-[#0A0D12]/90 backdrop-blur-md border border-[#C5A880]/35 shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex flex-col items-center max-w-sm">
                        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#C5A880] font-semibold">
                          {siteConfig.manufacturing.openingTitle || 'PRECISION IN EVERY FOLD'}
                        </span>
                        <h3 className="text-sm sm:text-base font-serif text-white tracking-wide mt-0.5">
                          {siteConfig.manufacturing.openingSubtitle || 'Our Napkin Manufacturing Process'}
                        </h3>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Centered Large Play Button (when paused or not started) */}
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      onClick={togglePlay}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[2px] cursor-pointer"
                    >
                      {/* Play Button Disc */}
                      <button
                        type="button"
                        aria-label="Play Factory Machine Video"
                        className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-[#12151A]/90 backdrop-blur-md border-2 border-[#C5A880] text-[#FAF8F5] flex items-center justify-center shadow-[0_0_35px_rgba(197,168,128,0.35)] hover:scale-108 hover:border-white hover:bg-[#C5A880] hover:text-[#12151A] transition-all duration-300 group/btn cursor-pointer mb-3"
                      >
                        <Play className="w-8 h-8 sm:w-9 sm:h-9 ml-1 fill-current transition-transform duration-300 group-hover/btn:scale-110" />
                      </button>

                      {/* Call-to-action text pill */}
                      <div className="px-4 py-1.5 rounded-full bg-[#161B23]/90 border border-white/10 text-xs font-medium text-white shadow-md flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                        <span>Watch Machine in Action ({siteConfig.manufacturing.videoDuration || '0:40'})</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Floating Bottom Custom Player Controls Bar */}
                <div
                  className={`absolute bottom-3 inset-x-3 z-30 transition-all duration-300 ${
                    showControls || !isPlaying
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="bg-[#0C1016]/90 backdrop-blur-md border border-white/10 rounded-2xl p-2.5 sm:p-3 shadow-2xl flex flex-col gap-2">
                    
                    {/* Scrub Timeline */}
                    <div className="relative flex items-center group/scrub cursor-pointer">
                      {/* Background Track */}
                      <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden relative">
                        {/* Buffer progress */}
                        <div
                          className="absolute top-0 bottom-0 left-0 bg-white/30 transition-all duration-300"
                          style={{ width: `${bufferedPercent}%` }}
                        />
                        {/* Played progress */}
                        <div
                          className="absolute top-0 bottom-0 left-0 bg-[#C5A880] transition-all duration-75"
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                      </div>

                      {/* Hidden Range Input for seamless seeking */}
                      <input
                        type="range"
                        min={0}
                        max={duration || 39.8}
                        step={0.1}
                        value={currentTime}
                        onChange={handleSeek}
                        onMouseDown={() => setIsSeeking(true)}
                        onMouseUp={() => setIsSeeking(false)}
                        onTouchStart={() => setIsSeeking(true)}
                        onTouchEnd={() => setIsSeeking(false)}
                        aria-label="Video scrubber timeline"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      
                      {/* Left: Play/Pause, Replay, Volume & Time */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        {/* Play/Pause Button */}
                        <button
                          type="button"
                          onClick={togglePlay}
                          className="p-1.5 rounded-lg text-white hover:text-[#C5A880] hover:bg-white/5 transition-colors cursor-pointer"
                          aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? (
                            <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                          ) : (
                            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                          )}
                        </button>

                        {/* Replay Button */}
                        <button
                          type="button"
                          onClick={handleReplay}
                          className="p-1.5 rounded-lg text-[#9AA5B5] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                          aria-label="Replay from start"
                          title="Replay"
                        >
                          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>

                        {/* Volume / Mute Control */}
                        <div className="flex items-center gap-1.5 group/vol">
                          <button
                            type="button"
                            onClick={toggleMute}
                            className="p-1.5 rounded-lg text-white hover:text-[#C5A880] hover:bg-white/5 transition-colors cursor-pointer"
                            aria-label={isMuted ? 'Unmute' : 'Mute'}
                          >
                            {isMuted || volume === 0 ? (
                              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                          </button>

                          {/* Desktop Volume Slider */}
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            aria-label="Volume"
                            className="w-12 sm:w-16 h-1 accent-[#C5A880] bg-white/20 rounded-lg cursor-pointer hidden sm:block"
                          />
                        </div>

                        {/* Time Readout */}
                        <div className="text-[11px] sm:text-xs font-mono text-[#A0AAB8] pl-1 whitespace-nowrap">
                          <span className="text-white font-medium">{formatTime(currentTime)}</span>
                          <span className="mx-1 text-[#5A6473]">/</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>

                      {/* Right: Quality Indicator, Soundtrack Badge & Fullscreen */}
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <div
                          className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-[#D8C7A5]"
                          title="Ambient corporate industrial soundtrack mixed with balanced machine rhythm"
                        >
                          <Sparkles className="w-2.5 h-2.5 text-[#C5A880]" />
                          <span className="font-medium">Studio Mix</span>
                        </div>

                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-[#C5A880] font-semibold hidden sm:inline-block">
                          1080p HD
                        </span>

                        <button
                          type="button"
                          onClick={toggleFullscreen}
                          className="p-1.5 rounded-lg text-white hover:text-[#C5A880] hover:bg-white/5 transition-colors cursor-pointer"
                          aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                        >
                          {isFullscreen ? (
                            <Minimize className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </button>
                      </div>

                    </div>

                  </div>
                </div>

              </div>

              {/* Caption & Authentic Facility Proof */}
              <div className="mt-3 p-3.5 rounded-2xl bg-[#1B212B] border border-[#2B3545] text-xs">
                <div className="flex items-center justify-between font-semibold text-white mb-1">
                  <span className="flex items-center gap-2">
                    <Cog className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Softique Converting Machine 01</span>
                  </span>
                  <span className="text-[#C5A880] text-[11px] font-mono tracking-wider">
                    Rajkot Facility
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#A4B0C2] mt-1">
                  High-speed paper feeding, uniform perimeter embossing, crisp quarter-fold converting & automated sheet stacking in active operation.
                </p>
                <div className="mt-2.5 pt-2 border-t border-[#2A3444] flex items-center gap-2 text-[11px] text-[#81C784]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4CAF50] shrink-0" />
                  <span>100% Authentic Factory Production Video • Kothariya Chokdi, Rajkot</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Step-by-Step Interactive Workflow */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Step-by-Step Production Sequence</span>
            </div>

            <div className="flex flex-col gap-3">
              {siteConfig.manufacturing.steps.map((step, idx) => (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                    activeStep === idx
                      ? 'bg-[#1E2530] border-[#C5A880] shadow-lg'
                      : 'bg-[#161A21] border-[#262E3B] hover:border-[#384355] opacity-80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-mono font-semibold px-2 py-0.5 rounded-md ${
                        activeStep === idx
                          ? 'bg-[#C5A880] text-[#12151A]'
                          : 'bg-[#252C38] text-[#8C98AA]'
                      }`}>
                        {step.number}
                      </span>
                      <h4 className="text-base sm:text-lg font-medium text-white">
                        {step.title}
                      </h4>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#252D3A] text-[#9FB0C8] whitespace-nowrap">
                      {step.status}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#9BA8BA] mt-2.5 leading-relaxed pl-10">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#252C38] flex items-center justify-between">
              <span className="text-xs text-[#7B8798]">
                Every step is overseen directly by the Softique operating team.
              </span>
              <Button
                href="#enquiry"
                variant="dark"
                size="sm"
                icon={ArrowRight}
              >
                Discuss Supply
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


