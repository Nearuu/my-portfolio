"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Eye, X, AwardIcon, CheckCircle2 } from "lucide-react";

const certs = [
  {
    title: "Bagian Ini masih belum selesai",
    issuer: "For Real Official",
    date: "Jan 2024",
    image: "/pic/front1.jpg",
    color: "from-amber-400 to-orange-600",
  },
  {
    title: "//////////////",
    issuer: "Percaya Aja Corp",
    date: "Mar 2024",
    image: "/pic/c2.jpg",
    color: "from-blue-400 to-indigo-600",
  },
  {
    title: ".....................",
    issuer: "Sheshhh Institute",
    date: "Dec 2023",
    image: "/pic/c3.jpg",
    color: "from-emerald-400 to-teal-600",
  },
];

export default function Certificates() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section id="certificates" className="relative min-h-screen py-32 px-6 bg-[#050505] overflow-hidden">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#1e1e1e,transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-amber-500 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Award size={14} />
            Achievements
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6"
          >
            OFFICIAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">RECORDS.</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="text-zinc-500 max-w-2xl mx-auto text-lg"
          >
            Koleksi bukti otentik dari dedikasi, pembelajaran, dan pencapaian yang telah saya lalui.
          </motion.p>
        </div>

        {/* GRID CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm"
            >
              {/* IMAGE WRAPPER */}
              <div 
                className="relative h-64 overflow-hidden cursor-pointer"
                onClick={() => setSelectedImg(cert.image)}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                {/* OVERLAY ON HOVER */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-white text-black rounded-full scale-50 group-hover:scale-100 transition-transform duration-300">
                        <Eye size={24} />
                    </div>
                    <span className="text-white font-bold text-sm tracking-widest uppercase">View Full</span>
                  </div>
                </div>
                {/* FLOATING BADGE */}
                <div className={`absolute top-4 right-4 z-20 p-2 rounded-xl bg-gradient-to-br ${cert.color} shadow-lg opacity-90`}>
                    <AwardIcon size={20} className="text-white" />
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={14} className="text-blue-500" />
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">{cert.issuer}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors mb-4 line-clamp-1">
                  {cert.title}
                </h3>
                <div className="flex justify-between items-center pt-4 border-t border-white/5 text-zinc-500 text-xs">
                    <span>Issued Date:</span>
                    <span className="font-mono text-zinc-300">{cert.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImg(null)}
          >
            <motion.button 
              whileHover={{ rotate: 90 }}
              className="absolute top-10 right-10 text-white/50 hover:text-white"
            >
              <X size={40} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              src={selectedImg}
              className="max-w-full max-h-[85vh] rounded-xl shadow-2xl border border-white/10 object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}