"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Search, Code2, Layers, Smartphone, Globe } from "lucide-react";

// DATA PROJECTS (Bisa ditambah sesuai kebutuhan)
const allProjects = [
  {
    id: 1,
    title: "UI/UX Design",
    category: "UI/UX",
    desc: "Designing intuitive and visually engaging interfaces focused on user experience. This project explores layout structure, usability, and modern UI components to create a clean and functional digital product.",
    // REVISI: Tambahkan /my-portfolio di depan path image
    image: "/my-portfolio/pic/poo1.jpg",
    tech: ["Affinity"],
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Typography Design",
    category: "Design",
    desc: "A typography exploration focusing on composition, hierarchy, and expressive lettering. The project highlights how type can become the main visual element in a design.",
    // REVISI: Tambahkan /my-portfolio di depan path image
    image: "/my-portfolio/pic/po2.jpg",
    tech: ["Affinity"],
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "TCG Design",
    category: "Design",
    desc: "A custom Trading Card Game concept featuring character illustration, ability systems, and card layout design. The project focuses on balancing visual storytelling with functional game mechanics.",
    // REVISI: Tambahkan /my-portfolio di depan path image
    image: "/my-portfolio/pic/po3.jpg",
    tech: ["Affinity"],
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Poster Movie Design",
    category: "Design",
    desc: "A cinematic poster design exploring composition, lighting, and storytelling through visuals. The project aims to capture emotion and narrative within a single frame.",
    // REVISI: Tambahkan /my-portfolio di depan path image
    image: "/my-portfolio/pic/po4.jpg", // Ganti gambar jika ada
    tech: ["Affinity"],
    link: "#",
    github: "#",
  },
];

const categories = ["All", "Web Dev", "App", "UI/UX", "Design"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter Logic
  const filteredProjects = allProjects.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="min-h-screen bg-[#0a0a0a] text-white py-32 px-6 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
             <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 text-blue-400 font-medium"
             >
                <Code2 size={20} />
                <span>My Portfolio</span>
             </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500"
            >
              Selected Works
            </motion.h2>
          </div>

          {/* SEARCH BAR */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="relative w-full md:w-72"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-sm placeholder:text-gray-600"
            />
          </motion.div>
        </div>

        {/* FILTER TABS */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* PROJECTS GRID */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-gray-500">
                <p>No projects found matching your criteria.</p>
            </div>
        )}
      </div>
    </section>
  );
}

// COMPONENT CARD TERPISAH
function ProjectCard({ project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10 opacity-60" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* FLOATING CATEGORY BADGE */}
        <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white flex items-center gap-1">
                {project.category === "Web Dev" && <Globe size={12} className="text-blue-400"/>}
                {project.category === "App" && <Smartphone size={12} className="text-green-400"/>}
                {project.category === "UI/UX" && <Layers size={12} className="text-purple-400"/>}
                {project.category}
            </span>
        </div>

        {/* OVERLAY ACTIONS (Muncul pas Hover) */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <a href={project.link} className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform" title="View Live">
                <ExternalLink size={20} />
            </a>
            <a href={project.github} className="p-3 bg-white/10 text-white border border-white/20 rounded-full hover:bg-white hover:text-black transition-all hover:scale-110" title="View Code">
                <Github size={20} />
            </a>
        </div>
      </div>

      {/* CONTENT INFO */}
      <div className="p-6 relative z-30 -mt-4">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-2">{project.desc}</p>
        
        {/* TECH STACK */}
        <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
                <span key={i} className="px-3 py-1 text-xs bg-white/5 border border-white/5 rounded-lg text-gray-300">
                    {t}
                </span>
            ))}
        </div>
      </div>
    </motion.div>
  );
}