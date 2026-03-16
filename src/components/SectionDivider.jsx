"use client";
import { motion } from "framer-motion";

export default function SectionDivider({ type = "top", color = "#0a0a0a" }) {
  return (
    <div
      className={`absolute left-0 w-full overflow-hidden z-[5] pointer-events-none ${
        type === "top" ? "-top-[1px] rotate-180" : "-bottom-[1px]"
      }`}
      style={{ height: "120px" }}
    >
      {/* 1. SOLID BASE (Potongan diagonal tajam tapi halus) */}
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 L1200,120 L1200,40 Q600,120 0,40 Z"
          fill={color}
        />
      </svg>

      {/* 2. PARTICLE STREAMS (Garis-garis cahaya yang mengalir) */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ 
              x: "200%", 
              opacity: [0, 1, 1, 0] 
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.8,
            }}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              width: `${150 + i * 50}px`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* 3. GLOW FOG (Kabut cahaya di area pertemuan) */}
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-purple-600/10 to-transparent blur-3xl"
      />

      {/* 4. MASKING OVERLAY (Supaya partikel tidak keluar jalur) */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${color} 10%, transparent 100%)`
        }}
      />
    </div>
  );
}