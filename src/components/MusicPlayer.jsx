"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, SkipBack, SkipForward, X, Volume2, VolumeX, 
  Music2, Shuffle, Mic2, Heart, Volume1
} from "lucide-react";

const songs = [
  { title: "33x", 
    artist: "Perunggu", 
    src: "/music/33x.mp3", 
    cover: "/music/33x.jpg", 
    color: "#4ade80", 
    lyrics: "Tak ada yang lebih malang... Dari meja yang penuh dengan kenang... 33 kali aku mencoba..." },
  
  { title: "XXL", 
    artist: "LANY", 
    src: "/music/xxl.mp3", 
    cover: "/music/xxl.jpg", 
    color: "#60a5fa", 
    lyrics: "I'm 10,000 miles away... Thinking about your face... It's XXL, I'm missing you hell..." },
  
  { title: "Peach Eyes", 
    artist: "Wave to Earth", 
    src: "/music/peacheyes.mp3", 
    cover: "/music/peacheyes.jpg", 
    color: "#fbbf24", 
    lyrics: "Your eyes are like peaches... Sweet and soft... In the middle of the night..." },
  
  { title: "Best Friend", 
    artist: "Rex Orange County", 
    src: "/music/bestfriend.mp3", 
    cover: "/music/bestfriend.jpg", 
    color: "#f87171", 
    lyrics: "I still wanna be your favorite boy... I still wanna be the one you need..." },
  
  { title: "Cincin", 
    artist: "Hindia", 
    src: "/music/cincin.mp3", 
    cover: "/music/cincin.jpg", 
    color: "#a78bfa", 
    lyrics: "Bagi mereka yang bertanya... Mengapa kita masih saja bersama..." },
  
  { title: "Pikiran Yang Matang", 
    artist: "Perunggu", 
    src: "/music/pikiranyangmatang.mp3", 
    cover: "/music/pikiranyangmatang.jpg", 
    color: "#2dd4bf", 
    lyrics: "Kupikir aku sudah cukup dewasa... Menelan pahitnya dunia..." },
  
  { title: "Heikousen", 
    artist: "Eve", 
    src: "/music/heikousen.mp3", 
    cover: "/music/heikousen.jpg", 
    color: "#fb7185", 
    lyrics: "Mukaiatta mama de... Surechigatteiku heikousen..." },
  
  { title: "Get Your Wish", 
    artist: "Porter Robinson", 
    src: "/music/getyourwish.mp3", 
    cover: "/music/getyourwish.jpg", 
    color: "#f472b6", 
    lyrics: "Kizuna to iu na no ito ga... Bokura wo tsunaideiru..." },

  { title: "You Belong With Me", 
    artist: "Taylor Swift", 
    src: "/music/youbelongwithme.mp3", 
    cover: "/music/youbelongwithme.jpg", 
    color: "##f4e372", 
    lyrics: "Kizuna to iu na no ito ga... Bokura wo tsunaideiru..." },

  { title: "Wish You Were Here",
    artist: "Neck Deep", 
    src: "/music/wishyouwerehere.mp3", 
    cover: "/music/wishyouwerehere.jpg", 
    color: "#f4a172", 
    lyrics: "Kizuna to iu na no ito ga... Bokura wo tsunaideiru..." },
 
  { title: "We Go Up",
    artist: "BABYMONSTER", 
    src: "/music/wegoup.mp3", 
    cover: "/music/wegoup.jpg", 
    color: "#72f477", 
    lyrics: "Kizuna to iu na no ito ga... Bokura wo tsunaideiru..." },
  
  { title: "Really Like You",
    artist: "Gyubin", 
    src: "/music/reallylikeyou.mp3", 
    cover: "/music/reallylikeyou.jpg", 
    color: "#72f0f4", 
    lyrics: "Kizuna to iu na no ito ga... Bokura wo tsunaideiru..." },
  
  { title: "Live My Life",
    artist: "aespa", 
    src: "/music/livemylife.mp3", 
    cover: "/music/livemylife.jpg", 
    color: "#72f0f4", 
    lyrics: "Kizuna to iu na no ito ga... Bokura wo tsunaideiru..." },
  
  { title: "RUDE!",
    artist: "Hearts2Hearts", 
    src: "/music/rude.mp3", 
    cover: "/music/rude.jpg", 
    color: "#72f0f4", 
    lyrics: "Kizuna to iu na no ito ga... Bokura wo tsunaideiru..." },
  
  { title: "I Love You 3000",
    artist: "Stephanie Poetri", 
    src: "/music/iloveyou3000.mp3", 
    cover: "/music/iloveyou3000.png", 
    color: "#72f0f4", 
    lyrics: "Kizuna to iu na no ito ga... Bokura wo tsunaideiru..." },
  
  { title: "Bubble Gum",
    artist: "NewJeans", 
    src: "/music/bubblegum.mp3", 
    cover: "/music/bubblegum.jpg", 
    color: "#72f0f4", 
    lyrics: "Kizuna to iu na no ito ga... Bokura wo tsunaideiru..." }
];

export default function MusicPlayer() {
  const [current, setCurrent] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  
  const audioRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (current === null) return;
      if (e.code === "Space") { e.preventDefault(); togglePlay(); }
      if (e.code === "ArrowRight") nextSong();
      if (e.code === "ArrowLeft") prevSong();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current, playing]);

  const formatTime = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    playing ? audioRef.current.pause() : audioRef.current.play();
    setPlaying(!playing);
  };

  const playSong = (index) => {
    setCurrent(index);
    setPlaying(true);
    setTimeout(() => { if(audioRef.current) audioRef.current.play(); }, 100);
  };

  const nextSong = () => {
    if (current === null) return;
    let nextIndex = isShuffle ? Math.floor(Math.random() * songs.length) : (current + 1) % songs.length;
    playSong(nextIndex);
  };

  const prevSong = () => {
    if (current === null) return;
    playSong((current - 1 + songs.length) % songs.length);
  };

  const handleVolume = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) audioRef.current.volume = newVol;
    setIsMuted(newVol === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      if (audioRef.current) audioRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      if (audioRef.current) audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <section id="music" className="relative min-h-screen py-24 px-6 bg-[#050505] text-white overflow-hidden">
      
      {/* ANIMATED BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50 contrast-150"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,1)]"></div>
        {/* Moving Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* DYNAMIC AMBIENT GLOW */}
      <AnimatePresence>
        {current !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.2, scale: 1 }} exit={{ opacity: 0 }}
            key={current}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 40%, ${songs[current].color} 0%, transparent 60%)` }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-20">
          <motion.div 
            initial={{ rotate: -10, opacity: 0 }} whileInView={{ rotate: 0, opacity: 1 }}
            className="p-3 bg-white/5 rounded-2xl border border-white/10 mb-6 backdrop-blur-sm"
          >
            <Music2 size={24} className="text-blue-500 animate-pulse" />
          </motion.div>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter italic text-center"
          >
            MUSIC <span className="text-zinc-800 transition-colors duration-500" style={{ color: current !== null ? songs[current].color : '' }}>PLAYLIST</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-zinc-500 font-mono text-xs tracking-[0.3em] uppercase mt-4">Lagu yang menemaniku membuat website ini</motion.p>
        </div>

        {/* PLAYLIST GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {songs.map((song, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              onClick={() => playSong(i)}
              className={`group relative p-4 rounded-[2.5rem] cursor-pointer transition-all duration-500 border border-white/5 bg-zinc-900/20 backdrop-blur-xl hover:bg-zinc-800/40 hover:border-white/20 ${current === i ? "ring-1 ring-white/30" : ""}`}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden mb-4 shadow-2xl transition-transform group-hover:shadow-blue-500/10">
                <img src={song.cover} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={song.title} />
                
                {/* Overlay Visualizer */}
                {current === i && playing && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="flex gap-1.5 items-end h-8">
                      {[1, 2, 3, 4].map(b => (
                        <motion.div key={b} animate={{ height: [8, 28, 12, 28, 8] }} transition={{ repeat: Infinity, duration: 0.6, delay: b * 0.1 }} className="w-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <h3 className="font-bold truncate text-sm md:text-base group-hover:text-blue-400 transition-colors duration-300">{song.title}</h3>
              <p className="text-[10px] text-zinc-500 font-mono truncate uppercase tracking-tighter">{song.artist}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MINI PLAYER SLIM WITH VOLUME */}
      <AnimatePresence>
        {current !== null && (
          <motion.div 
            initial={{ y: 100, x: "-50%", opacity: 0 }} animate={{ y: 0, x: "-50%", opacity: 1 }} exit={{ y: 100, x: "-50%", opacity: 0 }}
            className="fixed bottom-6 left-1/2 z-[100] w-[92%] max-w-3xl"
          >
            <div className="bg-zinc-950/90 backdrop-blur-3xl border border-white/10 px-6 py-4 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="flex items-center gap-6">
                
                {/* Album Art & Lyrics Icon */}
                <div className="relative flex-shrink-0 group cursor-pointer" onClick={() => setShowLyrics(!showLyrics)}>
                  <motion.img 
                    animate={{ rotate: playing ? 360 : 0 }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                    src={songs[current].cover} className="w-14 h-14 rounded-full border-2 border-white/10 shadow-lg"
                  />
                  <div className={`absolute inset-0 flex items-center justify-center rounded-full transition-opacity ${showLyrics ? 'bg-blue-500/80 opacity-100' : 'bg-black/40 opacity-0 group-hover:opacity-100'}`}>
                    <Mic2 size={14} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-2">
                    <div className="truncate pr-4 leading-tight">
                      <h4 className="font-bold text-sm truncate">{songs[current].title}</h4>
                      <p className="text-[10px] text-zinc-500 font-medium truncate uppercase tracking-widest">{songs[current].artist}</p>
                    </div>
                    
                    {/* Controls Right Slim */}
                    <div className="flex items-center gap-4">
                       <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 border border-white/5 group">
                          <button onClick={toggleMute} className="text-zinc-500 hover:text-white transition">
                            {isMuted || volume === 0 ? <VolumeX size={14} className="text-red-500" /> : volume < 0.5 ? <Volume1 size={14} /> : <Volume2 size={14} />}
                          </button>
                          <input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume} onChange={handleVolume} className="w-16 h-1 accent-white cursor-pointer" />
                       </div>
                       <button onClick={() => setIsShuffle(!isShuffle)} className={`transition ${isShuffle ? "text-blue-400" : "text-zinc-600 hover:text-white"}`}><Shuffle size={14} /></button>
                       <button onClick={() => setCurrent(null)} className="p-1.5 text-zinc-600 hover:text-red-500 transition"><X size={16} /></button>
                    </div>
                  </div>

                  {/* MINI CONTROLS & PROGRESS */}
                  <div className="flex items-center gap-6">
                     <div className="flex items-center gap-4">
                        <button onClick={prevSong} className="text-zinc-500 hover:text-white transition active:scale-90"><SkipBack size={20} fill="currentColor" /></button>
                        <button onClick={togglePlay} className="w-11 h-11 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition active:scale-95 shadow-lg shadow-white/5">
                           {playing ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-1" />}
                        </button>
                        <button onClick={nextSong} className="text-zinc-500 hover:text-white transition active:scale-90"><SkipForward size={20} fill="currentColor" /></button>
                     </div>
                     
                     <div className="flex-1 flex items-center gap-3">
                        <span className="text-[9px] font-mono text-zinc-600 w-8 text-right">{formatTime(currentTime)}</span>
                        <div className="relative flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden group">
                           <motion.div 
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-white z-10" 
                              style={{ width: `${(currentTime/duration)*100}%` }} 
                           />
                           <input 
                              type="range" min="0" max={duration || 0} value={currentTime}
                              onChange={(e) => { audioRef.current.currentTime = e.target.value; setCurrentTime(e.target.value); }}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                           />
                        </div>
                        <span className="text-[9px] font-mono text-zinc-600 w-8">{formatTime(duration)}</span>
                     </div>
                  </div>
                </div>
              </div>

              {/* SLIM LYRICS AREA */}
              <AnimatePresence>
                {showLyrics && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/5 mt-4 pt-4 text-center"
                  >
                    <p className="text-xs font-medium text-blue-400 italic leading-relaxed px-10">
                      {songs[current].lyrics}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <audio 
              ref={audioRef} src={songs[current].src} 
              onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
              onLoadedMetadata={() => setDuration(audioRef.current.duration)}
              onEnded={nextSong} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}