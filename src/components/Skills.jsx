"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Squares from "./Squares";
import { Sparkles, Palette, Code, Layers } from "lucide-react";

const skillsData = [
  { 
    name: "Reactjs", 
    category: "Tech", 
    // REVISI: Tambahkan /my-portfolio di depan path icon
    icon: "/my-portfolio/icons/react.svg", 
    level: 70, 
    color: "group-hover:shadow-blue-500/20",
    glow: "bg-blue-500"
  },
  { 
    name: "Photoshop", 
    category: "Creative", 
    // REVISI: Tambahkan /my-portfolio di depan path icon
    icon: "/my-portfolio/icons/photoshop.svg", 
    level: 85, 
    color: "group-hover:shadow-blue-600/20",
    glow: "bg-blue-600"
  },
  { 
    name: "Figma", 
    category: "Creative", 
    // REVISI: Tambahkan /my-portfolio di depan path icon
    icon: "/my-portfolio/icons/figma.svg", 
    level: 90, 
    color: "group-hover:shadow-purple-500/20",
    glow: "bg-purple-500"
  },
  { 
    name: "Clip Studio Paint", 
    category: "Creative", 
    // REVISI: Tambahkan /my-portfolio di depan path icon
    icon: "/my-portfolio/icons/csp.svg", 
    level: 90, 
    color: "group-hover:shadow-cyan-400/20",
    glow: "bg-cyan-400"
  },
  { 
    name: "Davinci Resolve", 
    category: "Creative", 
    // REVISI: Tambahkan /my-portfolio di depan path icon
    icon: "/my-portfolio/icons/davincii.svg", 
    level: 85, 
    color: "group-hover:shadow-rose-500/20",
    glow: "bg-rose-500"
  },
  { 
    name: "Affinity", 
    category: "Creative", 
    // REVISI: Tambahkan /my-portfolio di depan path icon
    icon: "/my-portfolio/icons/affinity.svg", 
    level: 95, 
    color: "group-hover:shadow-indigo-500/20",
    glow: "bg-indigo-500"
  },
];

const categories = ["All", "Tech", "Creative"];

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredSkills = skillsData.filter(skill => 
    activeFilter === "All" || skill.category === activeFilter
  );

  return (
    <section id="skills" className="relative min-h-screen overflow-hidden bg-[#080808] text-white">
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Squares />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto py-32 px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-blue-400 mb-4 font-mono">
              <Sparkles size={18} />
              <span>Abilities & Arsenal</span>
            </div>
            <h2 className="text-6xl font-black tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-600">
              SKILLS.
            </h2>
            <p className="text-zinc-400 mt-4 max-w-md">
              Kombinasi antara logika pemrograman dan intuisi desain kreatif untuk membangun pengalaman digital yang utuh.
            </p>
          </motion.div>

          {/* FILTER BUTTONS */}
          <div className="flex gap-2 p-1 bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-2xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeFilter === cat 
                    ? "bg-white text-black shadow-lg" 
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* SKILLS GRID */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className={`group relative p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl transition-all duration-500 ${skill.color} hover:bg-zinc-800/60 hover:border-white/20`}
    >
      {/* Background Glow Effect */}
      <div className={`absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${skill.glow}`} />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="p-3 bg-black/50 rounded-2xl border border-white/5 group-hover:border-white/20 transition-colors">
            <img src={skill.icon} alt={skill.name} className="w-12 h-12 object-contain" />
          </div>
          <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase px-2 py-1 border border-zinc-800 rounded">
            {skill.category}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-4 tracking-tight">{skill.name}</h3>

        {/* EXPERTISE LEVEL */}
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase">
                <span>Mastery Level</span>
                <span>{skill.level}%</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full rounded-full ${skill.glow}`}
                />
            </div>
        </div>
      </div>
    </motion.div>
  );
}