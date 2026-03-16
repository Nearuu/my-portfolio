"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { User, Code2, Rocket } from "lucide-react";

const journeyData = [
  {
    title: "The NPC Era",
    subtitle: "Awal Mula Kehidupan",
    desc: "Aku lahir di Ciamis pada 5 Maret 2007 dan tumbuh di kota yang sama. Perjalanan mengenal teknologi dimulai sejak aku masih TK, di masa ketika warnet menjadi tempat pertama untuk menjelajahi dunia digital. Dari sana, rasa penasaran terhadap komputer dan internet mulai tumbuh dan menjadi titik awal perjalanan yang terus berkembang hingga sekarang.",
    img: "/pic/pii1.jpg",
    icon: User,
    color: "from-blue-500 to-cyan-500",
    year: "Phase 1"
  },
  {
    title: "The Creative Awakening",
    subtitle: "Awal Mula Mengenal dunia Kreatif",
    desc: "Saat memasuki masa remaja, aku mulai menjelajahi dunia kreatif digital seperti desain grafis dan video editing. Perjalananku dimulai dari membuat AMV (Anime Music Video), menggabungkan potongan anime dengan musik untuk menciptakan cerita visual. Di awal eksplorasi ini aku belajar menggunakan berbagai aplikasi seperti Kinemaster, Alight Motion, PixelLab, dan PicsArt, yang menjadi langkah awal dalam mengembangkan kreativitas digital.",
    img: "/pic/pii2.jpg",
    icon: Code2,
    color: "from-violet-500 to-purple-500",
    year: "Phase 2"
  },
  {
    title: "The Creator Path",
    subtitle: "Mulai Fokus Pada Tujuan",
    desc: "Di fase ini aku mulai memfokuskan diri pada dunia kreatif digital seperti desain grafis, ilustrasi, dan video editing. Aku juga mulai membuat berbagai project sebagai sarana belajar sekaligus membangun portofolio yang akan merepresentasikan perjalanan dan perkembangan kreatifku.",
    img: "/pic/pi2.jpg",
    icon: Rocket,
    color: "from-orange-500 to-red-500",
    year: "Phase 3"
  }
];

export default function Journey() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative min-h-screen bg-black py-32 px-6 overflow-hidden"
    >
      {/* Background Original Kamu (Tidak Diubah) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

      {/* HEADER (Original Kamu) */}
      <div className="relative z-10 text-center mb-32">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-400 backdrop-blur-sm">
                My Career Path
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mt-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
            Epic Journey
            </h2>
            <p className="text-zinc-400 mt-4 max-w-xl mx-auto text-lg">
            Dari sekedar karakter figuran hingga menjadi tokoh utama dalam cerita pengembangan diri sendiri.
            </p>
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-800 -translate-x-1/2 md:block hidden" />
        
        <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 -translate-x-1/2 md:block hidden shadow-[0_0_15px_rgba(168,85,247,0.5)]"
        />

        <div className="space-y-24 md:space-y-40">
          {journeyData.map((item, i) => (
            <TimelineItem key={i} data={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ data, index }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            // ANIMASI KELUAR MASUK DISINI
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.3 }} // once: false biar bisa keluar-masuk berulang kali
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`relative flex flex-col md:flex-row items-center gap-10 md:gap-0 ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
            }`}
        >
            {/* 1. CONTENT CARD (Original) */}
            <div className={`w-full md:w-1/2 flex ${isEven ? "md:justify-end md:pr-16" : "md:justify-start md:pl-16"}`}>
                <div className="relative group w-full max-w-md">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${data.color} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}></div>
                    
                    <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg bg-gradient-to-br ${data.color} bg-opacity-10 text-white shadow-lg`}>
                                <data.icon size={24} />
                            </div>
                            <span className="text-xs font-mono text-zinc-500 border border-white/10 px-2 py-1 rounded">
                                {data.year}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">{data.title}</h3>
                        <p className={`text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r ${data.color} mb-4`}>
                            {data.subtitle}
                        </p>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            {data.desc}
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. CENTER NODE (Original) */}
            <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-4 border-black bg-zinc-900 z-20 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
                <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${data.color} animate-pulse`} />
            </motion.div>

            {/* 3. IMAGE (Original) */}
            <div className={`w-full md:w-1/2 flex pl-12 md:pl-0 ${isEven ? "md:justify-start md:pl-16" : "md:justify-end md:pr-16"}`}>
                <motion.div 
                    whileHover={{ scale: 1.05, rotate: isEven ? 2 : -2 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full max-w-sm aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
                >
                    <div className={`absolute inset-0 bg-gradient-to-tr ${data.color} mix-blend-overlay opacity-40 group-hover:opacity-0 transition-opacity duration-500`}></div>
                    <img 
                        src={data.img} 
                        alt={data.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}