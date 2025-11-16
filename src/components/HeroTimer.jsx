import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ParticlesCanvas from "./ParticlesCanvas";

export default function HeroTimer({ theme }) {


    //formst (annee, mois -1, jour, heures, minutes, secondes)
  const EVENT_DATE = new Date(2025, 11, 15, 9, 0, 0).getTime();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, EVENT_DATE - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const fmt = (n) => String(n).padStart(2, "0");

  const container = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } } };
  const item = { hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } } };

  return (
    <section className="relative">
      <ParticlesCanvas theme={theme} />

      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="mx-auto max-w-4xl py-8">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-4">Le Madara <span className="text-red-700">Run</span> — Début dans</h2>

        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          {[{ label: "Jours", v: days }, { label: "Heures", v: hours }, { label: "Minutes", v: minutes }, { label: "Secondes", v: seconds }].map((it, idx) => (
            <motion.div key={it.label} variants={item} whileHover={{ scale: 1.05 }} className="w-28 md:w-44 p-4 md:p-6 rounded-2xl bg-gradient-to-br from-[#0c0708]/60 to-[#15060a]/50 border border-white/6 backdrop-blur text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-600">{fmt(it.v)}</div>
              <div className="text-xs mt-2 text-red-300">{it.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* little tomoe overlay for vibe */}
        <div className="pointer-events-none mt-6 flex justify-center">
          <img src="/assets/sharingan.png" alt="sharingan" className="w-36 h-36 animate-spin-slow" />
        </div>
      </motion.div>
    </section>
  );
}
