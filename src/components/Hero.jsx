"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Download } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);

  // --- Logic Parallax ---
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);
  const scaleVideo = useTransform(scrollY, [0, 1000], [1, 1.2]);

  // --- Animation Variants ---
  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  // --- FUNGSI KLIK ---
  const handleScrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToNext = () => {
    // Scroll ke section setelah hero (biasanya 'about' atau 'projects')
    const element = document.getElementById('about') || document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black"
    >
      {/* 1. BACKGROUND VIDEO LAYER */}
      <motion.div style={{ scale: scaleVideo }} className="absolute inset-0 z-0">
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover opacity-60"
          // REVISI: Tambahkan /my-portfolio di depan path video
          src="/my-portfolio/bg.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>
      </motion.div>

      {/* 2. AMBIENT GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 40, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]"
        />
      </div>

      {/* 3. MAIN CONTENT */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto"
      >
        {/* Status Badge */}
        <motion.div variants={textVariants} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono tracking-widest text-emerald-300 uppercase">Available for Hire</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={textVariants} className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.9]">
          CREATIVE <br />
          <span className="relative inline-block">
             <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40" style={{ WebkitTextStroke: '0px' }}>DEVELOPER</span>
             <span className="absolute top-0 left-0 -z-10 text-transparent opacity-30 blur-[2px]" style={{ WebkitTextStroke: '2px white' }}>DEVELOPER</span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={textVariants} className="mt-8 text-lg md:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed">
          Crafting <span className="text-white font-semibold">immersive digital experiences</span> through code and design. 
          Focusing on interactivity, performance, and modern aesthetics.
        </motion.p>

        {/* ACTION BUTTONS (MODIFIED) */}
        <motion.div variants={textVariants} className="mt-10 flex flex-wrap justify-center gap-4">
          
          {/* Button 1: Scroll to Projects */}
          <button 
            onClick={handleScrollToProjects}
            className="group relative px-8 py-4 bg-white text-black rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Work <Sparkles size={18} className="transition-transform group-hover:rotate-12" />
            </span>
          </button>
          
          {/* Button 2: Download CV */}
          <a 
            // REVISI: Tambahkan /my-portfolio di depan path CV
            href="/my-portfolio/cv.pdf" 
            download="My_CV.pdf"
            className="group px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30 flex items-center gap-2 cursor-pointer"
          >
             Download CV <Download size={18} className="group-hover:translate-y-1 transition-transform" />
          </a>

        </motion.div>
      </motion.div>

      {/* 4. SCROLL INDICATOR (CLICKABLE) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={handleScrollToNext} // Bisa diklik sekarang
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 cursor-pointer group"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 group-hover:text-white transition-colors">Scroll Down</span>
        <div className="w-[30px] h-[50px] rounded-full border-2 border-white/20 flex justify-center p-2 backdrop-blur-sm group-hover:border-white/50 transition-colors">
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>

      {/* 5. BOTTOM FADE */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
    </section>
  );
}