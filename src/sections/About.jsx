import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  ShieldCheck,
  Handshake,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import Button from '../components/Button';

export default function About() {
  // Video player state
  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(10.0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isSeeking, setIsSeeking] = useState(false);

  // Time formatting (mm:ss)
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
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('[About Video] Play with audio blocked, falling back to muted:', err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current
              .play()
              .then(() => setIsPlaying(true))
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

  // Volume slider handler
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

  // Seek handler
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Replay from beginning
  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current
      .play()
      .then(() => setIsPlaying(true))
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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
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
    <section id="about" className="py-20 lg:py-32 bg-[#FBFBF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Official Advertisement Video Showcase & authentic details */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-3 bg-[#F2EDE2] border border-[#DFD8CB] shadow-xl">
              
              {/* 16:9 Responsive Video Viewport */}
              <div
                ref={playerContainerRef}
                onMouseMove={resetControlsTimeout}
                onMouseEnter={() => setShowControls(true)}
                className="relative aspect-video rounded-2xl overflow-hidden bg-[#0A192F] shadow-inner group select-none flex items-center justify-center"
              >
                {/* HTML5 Video Element */}
                <video
                  ref={videoRef}
                  src={siteConfig.media.aboutVideo}
                  poster={siteConfig.media.aboutVideoPoster}
                  title="Softique Paper Napkin Official Advertisement Film"
                  aria-label="Softique Paper Napkin Commercial Video"
                  width={1280}
                  height={720}
                  preload="metadata"
                  playsInline
                  onTimeUpdate={() => {
                    if (!isSeeking && videoRef.current) {
                      setCurrentTime(videoRef.current.currentTime);
                    }
                  }}
                  onLoadedMetadata={() => {
                    if (videoRef.current && videoRef.current.duration) {
                      setDuration(videoRef.current.duration);
                    }
                  }}
                  onEnded={() => {
                    setIsPlaying(false);
                    setShowControls(true);
                  }}
                  onClick={togglePlay}
                  onDoubleClick={toggleFullscreen}
                  className="w-full h-full object-cover cursor-pointer drop-shadow-md"
                />

                {/* Top Overlay Badges */}
                <div className="absolute top-2.5 inset-x-2.5 z-20 flex items-center justify-between pointer-events-none">
                  {/* Brand Film Badge */}
                  <div className="bg-[#0A1E34]/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-[11px] text-white flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00BCD4] animate-pulse" />
                    <span className="font-medium tracking-wide">Brand Film</span>
                  </div>

                  {/* Softique Official Tag */}
                  <div className="bg-[#0A1E34]/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-[10px] uppercase tracking-wider text-[#A5D8E6] font-semibold shadow-md">
                    Softique 16:9
                  </div>
                </div>

                {/* Centered Large Play Button (when paused or ended) */}
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.2 }}
                      onClick={togglePlay}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[1.5px] cursor-pointer"
                    >
                      <button
                        type="button"
                        aria-label="Play Softique Advertisement"
                        className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#0A2540]/90 backdrop-blur-md border-2 border-[#00BCD4] text-white flex items-center justify-center shadow-[0_0_30px_rgba(0,188,212,0.4)] hover:scale-108 hover:border-white hover:bg-[#00BCD4] hover:text-[#0A2540] transition-all duration-300 group/btn cursor-pointer mb-2.5"
                      >
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-0.5 fill-current transition-transform duration-300 group-hover/btn:scale-110" />
                      </button>

                      <div className="px-3.5 py-1 rounded-full bg-[#0A1E34]/90 border border-white/15 text-[11px] font-medium text-white shadow-md flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#00BCD4]" />
                        <span>Watch Softique Advertisement (0:10)</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Custom Playback Controls Bar */}
                <div
                  className={`absolute bottom-2 inset-x-2 z-30 transition-all duration-300 ${
                    showControls || !isPlaying
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="bg-[#0A1E34]/90 backdrop-blur-md border border-white/15 rounded-xl p-2 shadow-2xl flex flex-col gap-1.5">
                    
                    {/* Scrub Timeline */}
                    <div className="relative flex items-center group/scrub cursor-pointer">
                      <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden relative">
                        <div
                          className="absolute top-0 bottom-0 left-0 bg-[#00BCD4] transition-all duration-75"
                          style={{ width: `${(currentTime / (duration || 10)) * 100}%` }}
                        />
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={duration || 10}
                        step={0.1}
                        value={currentTime}
                        onChange={handleSeek}
                        onMouseDown={() => setIsSeeking(true)}
                        onMouseUp={() => setIsSeeking(false)}
                        onTouchStart={() => setIsSeeking(true)}
                        onTouchEnd={() => setIsSeeking(false)}
                        aria-label="Timeline scrubber"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between gap-2 pt-0.5">
                      
                      {/* Left: Play/Pause, Replay, Volume & Time */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          type="button"
                          onClick={togglePlay}
                          className="p-1 rounded-md text-white hover:text-[#00BCD4] transition-colors cursor-pointer"
                          aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? (
                            <Pause className="w-4 h-4 fill-current" />
                          ) : (
                            <Play className="w-4 h-4 fill-current" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={handleReplay}
                          className="p-1 rounded-md text-[#9AB3CA] hover:text-white transition-colors cursor-pointer"
                          aria-label="Replay"
                          title="Replay"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={toggleMute}
                            className="p-1 rounded-md text-white hover:text-[#00BCD4] transition-colors cursor-pointer"
                            aria-label={isMuted ? 'Unmute' : 'Mute'}
                          >
                            {isMuted || volume === 0 ? (
                              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F87171]" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            )}
                          </button>

                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            aria-label="Volume"
                            className="w-12 h-1 accent-[#00BCD4] bg-white/20 rounded-lg cursor-pointer hidden sm:block"
                          />
                        </div>

                        <div className="text-[10px] font-mono text-[#A5BACD] pl-1 whitespace-nowrap">
                          <span className="text-white font-medium">{formatTime(currentTime)}</span>
                          <span className="mx-1 text-[#4F6A87]">/</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>

                      {/* Right: HD Tag & Fullscreen */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-[#00BCD4] font-semibold hidden sm:inline-block">
                          HD 720p
                        </span>

                        <button
                          type="button"
                          onClick={toggleFullscreen}
                          className="p-1 rounded-md text-white hover:text-[#00BCD4] transition-colors cursor-pointer"
                          aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                        >
                          {isFullscreen ? (
                            <Minimize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          ) : (
                            <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          )}
                        </button>
                      </div>

                    </div>

                  </div>
                </div>

              </div>

              {/* Floating city pill */}
              <div className="mt-3 px-3 py-2 bg-white rounded-xl border border-[#E5DFD3] flex items-center justify-between text-xs text-[#5C5547]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C5A880]" />
                  <span className="font-semibold text-[#1C1E21]">Kothariya Chokdi, Rajkot</span>
                </div>
                <span className="text-[11px] text-[#8C8476] uppercase tracking-wider">
                  JM ENTERPRISE
                </span>
              </div>
            </div>

            {/* Ethos Quote Card */}
            <div className="mt-6 p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8E2D6] shadow-sm">
              <p className="editorial-title text-xl text-[#1C1E21] italic leading-snug">
                “We start with one machine and one core product because we choose to do one thing exceptionally well.”
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E9585]">
                <span className="w-2 h-[1px] bg-[#C5A880]" />
                <span>Softique Founding Ethos</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase mb-4 bg-[#EFECE4] text-[#6E6350] border border-[#E3DCCE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
              About Our Company
            </div>

            <h2 className="editorial-title text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#1C1E21] leading-[1.15] mb-6">
              A Thoughtful Start. <br />
              <span className="italic font-normal">A Softer Everyday.</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#525763] leading-relaxed font-light mb-8">
              <p>
                {siteConfig.brand.summary}
              </p>
              <p className="text-sm sm:text-base text-[#686F7C]">
                Operating out of the bustling industrial epicenter of Rajkot, we understand that wholesale buyers and retail businesses prize two things above all: dependable supply schedules and consistent product quality that protects their own reputation.
              </p>
              <p className="text-sm sm:text-base text-[#686F7C]">
                By concentrating our production strictly on high-demand napkin tissue paper packed in hygienic plastic packets, we keep our operations lean, responsive, and personally accountable to every trading partner.
              </p>
            </div>

            {/* Core Values Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8 pt-4 border-t border-[#EAE3D5]">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#EAE3D5]">
                <ShieldCheck className="w-5 h-5 text-[#0E63B8] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1C1E21]">Honest Specifications</h4>
                  <p className="text-xs text-[#636873] mt-0.5">We share verified counts, real ply layers, and clear pricing upfront.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#EAE3D5]">
                <Handshake className="w-5 h-5 text-[#0E63B8] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#1C1E21]">Direct Factory Access</h4>
                  <p className="text-xs text-[#636873] mt-0.5">Communicate directly with our Rajkot unit without intermediaries.</p>
                </div>
              </div>
            </div>

            <Button
              href="#enquiry"
              variant="primary"
              size="md"
            >
              Start a Conversation
            </Button>

          </div>

        </div>

      </div>
    </section>
  );
}
