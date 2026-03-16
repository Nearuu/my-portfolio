"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Code2, Cpu, Globe, ArrowUpRight, User } from "lucide-react";
import SectionDivider from "./SectionDivider"; // Pastikan path ini benar

// Data Statistik
const stats = [
  { label: "Years Exp", value: "2+" },
  { label: "Projects", value: "15+" },
  { label: "Tools", value: "5+" },
];

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // Parallax untuk elemen background
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative min-h-screen py-32 flex items-center justify-center bg-[#0a0a0a] text-white overflow-hidden"
    >
      {/* 1. SECTION DIVIDER (Penyambung dari Hero) */}
      {/* Warna 'color' harus sama dengan bg Hero (hitam) */}
      <SectionDivider type="top" color="#000000" /> 

      {/* 2. DYNAMIC BACKGROUND (Grid & Gradient) */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]" />
        <motion.div style={{ y: yBg }} className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[120px]" />
        <motion.div style={{ y: yBg }} className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      {/* 3. MAIN CONTENT (Grid Layout) */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN: INTERACTIVE PROFILE CARD */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            {/* Card Frame */}
            <div className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-sm shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] group-hover:rotate-1">
              
              {/* Image Placeholder / Avatar Area */}
              {/* Ganti src dengan foto profil aslimu */}
              <div className="absolute inset-2 rounded-2xl overflow-hidden bg-zinc-800">
                <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center relative">
                   
                <img src="profil.jpg" />
                   
                   <User size={64} className="text-white/20" />
                   
                   {/* Overlay Glitch Effect */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Floating Name Tag */}
              <div className="absolute bottom-8 left-8 right-8 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
                 <h3 className="text-2xl font-bold text-white">Muhammad Rava Putra Santosa</h3>
                 <p className="text-zinc-400 text-sm font-mono">@Nearuu</p>
              </div>

              {/* Decorative Corner Lines */}
              <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-purple-500/50 rounded-tr-xl" />
              <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-blue-500/50 rounded-bl-xl" />
            </div>
            
            {/* Background Glow behind card */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
          </motion.div>

          {/* RIGHT COLUMN: TEXT & CONTENT */}
          <div className="space-y-8">
            {/* Section Label */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-widest uppercase text-purple-300"
            >
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Who I Am
            </motion.div>

            {/* Headline */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              ABOUT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                THE DEVELOPER
              </span>
            </motion.h2>

            {/* Description Paragraph */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-zinc-400 text-lg leading-relaxed border-l-2 border-purple-500/30 pl-6"
            >
              Hi, Im <strong className="text-white">Muhammad Rava Putra Santosa</strong>. 
              Known in the digital realm as <span className="text-purple-300 font-mono">Nearuu</span>. 
              I dont just write code I architect immersive digital realities.
              <br /><br />
             A creative individual passionate about  <span className="text-white">Graphic Design and Visual Creation</span>, 
            I specialize in crafting engaging visuals, blending creativity with digital tools to bring ideas to life
            </motion.p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + (index * 0.1) }}
                  className="text-center md:text-left"
                >
                  <h4 className="text-3xl font-black text-white mb-1">{stat.value}</h4>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="flex gap-4 pt-4"
            >
               <a href="#skills" className="group flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                 My Tech Stack <Cpu size={18} />
               </a>
               <a href="#projects" className="group flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full font-medium hover:bg-white/10 hover:text-purple-300 transition-colors">
                 View Projects <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </a>
            </motion.div>
          </div>
        </div>

        {/* 4. INFINITE MARQUEE (Hiasan Bawah) */}
        <div className="absolute bottom-20 left-0 w-full opacity-5 pointer-events-none select-none overflow-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-[8rem] font-black uppercase mx-8">
                Design • Develop • Deploy • Dominate •
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 5. SECTION DIVIDER (Penyambung ke Section Skills/Next) */}
      {/* Warna 'color' sesuaikan dengan background section selanjutnya */}
      <SectionDivider type="bottom" color="#0f0f0f" /> 
    </section>
  );
}