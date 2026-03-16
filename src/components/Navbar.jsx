"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const sections = [
  "home", "about", "skills", "projects", "journey", "certificates", "music",
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Auto hilang broo
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Efek bukan ngepet*/}
      <svg className="hidden">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 p-2 rounded-full bg-zinc-900/40 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {sections.map((item) => (
          <a
            key={item}
            href={`#${item}`}
            className={`relative px-5 py-2.5 text-xs md:text-sm font-bold tracking-widest uppercase transition-colors duration-500 rounded-full ${
              active === item ? "text-black" : "text-white/40 hover:text-white"
            }`}
          >
            <span className="relative z-10">{item}</span>

            {/* Animasi bukan animek*/}
            {active === item && (
              <motion.div
                layoutId="active-pill"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
                className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                style={{ filter: "url(#gooey)" }} // Mengaktifkan efek cair
              />
            )}
            
            {/* Indicator bawah menu ini yee*/}
            <motion.div 
               className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
               layoutId="hover-dot"
            />
          </a>
        ))}
      </motion.nav>
    </>
  );
}