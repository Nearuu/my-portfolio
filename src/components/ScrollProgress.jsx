"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Ambil data scroll progress (0 sampai 1)
  const { scrollYProgress } = useScroll();
  
  // Bikin animasi smooth (kenyal) biar ga patah-patah
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transformasi warna: Dari Ungu (atas) ke Biru Cyan (bawah)
  const background = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#a855f7", "#3b82f6", "#10b981"] // Purple -> Blue -> Emerald
  );

  // Logic: Sembunyikan bar kalau belum discroll (di paling atas)
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-0 top-0 bottom-0 w-2 z-[9999] flex flex-col justify-end pointer-events-none mix-blend-screen">
      {/* Background Track (Jalur redup) */}
      <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/5" />

      {/* THE ENERGY BAR */}
      <motion.div
        className="w-[3px] bg-white origin-top shadow-[0_0_20px_rgba(255,255,255,0.5)]"
        style={{
          scaleY, // Panjang bar mengikuti scroll
          background, // Warna berubah dinamis
          height: "100%"
        }}
      >
        {/* Glowing Head (Ujung cahaya yang memimpin) */}
        <motion.div 
            className="absolute bottom-0 -left-[2px] w-[7px] h-[20px] rounded-full blur-[5px]"
            style={{ background }} 
        />
        <motion.div 
            className="absolute bottom-0 -left-[1px] w-[5px] h-[5px] bg-white rounded-full shadow-[0_0_10px_white]" 
        />
      </motion.div>

      {/* Percentage Text (Opsional: Muncul saat discroll) */}
      <motion.div
         className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-white/50 rotate-90 origin-right"
         style={{ opacity: isVisible ? 1 : 0 }}
      >
        SCROLL
      </motion.div>
    </div>
  );
}