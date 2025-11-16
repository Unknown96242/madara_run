
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = { onValidated?: () => void; theme?: "dark" | "light" };

export default function Countdown({ onValidated, theme = "dark" }: Props) {
  const EVENT_DATE = new Date(2025, 11, 15, 9, 0, 0).getTime();
  const [now, setNow] = useState(Date.now());
  const [form, setForm] = useState({ name: "", email: "", pseudo: "", team: "solo" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [pseudoStatus, setPseudoStatus] = useState<null | "ok" | "taken">(null);

  const used = useRef(new Set(["Madara", "Uchiha", "Rinnegan"]));

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, EVENT_DATE - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  function fmt(n: number) {
    return String(n).padStart(2, "0");
  }

  // Simulate async check for pseudo availability with a small delay
  useEffect(() => {
    if (!form.pseudo.trim()) {
      setPseudoStatus(null);
      return;
    }
    const timer = setTimeout(() => {
      const p = form.pseudo.trim();
      if (used.current.has(p)) setPseudoStatus("taken");
      else setPseudoStatus("ok");
    }, 400);
    return () => clearTimeout(timer);
  }, [form.pseudo]);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.length < 2) e.name = "Nom trop court";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Email invalide";
    if (!form.pseudo.trim()) e.pseudo = "Pseudo requis";
    if (pseudoStatus === "taken") e.pseudo = "Pseudo déjà pris";
    return e;
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      // pretend to save and mark pseudo as used
      used.current.add(form.pseudo.trim());
      setSubmitted(true);
      // trigger susanoo effect in parent
      onValidated?.();
      setTimeout(() => {
        setForm({ name: "", email: "", pseudo: "", team: "solo" });
        setSubmitted(false);
        setPseudoStatus(null);
      }, 2200);
    }
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-full max-w-4xl">
        <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-4 md:gap-8">
            {[{ label: "Jours", v: days }, { label: "Heures", v: hours }, { label: "Minutes", v: minutes }, { label: "Secondes", v: seconds }].map((it) => (
              <motion.div key={it.label} whileHover={{ scale: 1.04 }} className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#10020a]/60 to-[#0b0206]/60 border border-white/6 backdrop-blur">
                <div className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-red-600">{fmt(it.v)}</div>
                <div className="text-sm mt-2 text-red-300">{it.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 relative">
          {/* Particles container is global (in App) but add some local sparks around countdown with CSS */}
          <div className="absolute inset-0 pointer-events-none flex justify-center items-start -top-6">
            {/* subtle spark glow */}
            <div className="w-56 h-20 blur-2xl opacity-30 bg-gradient-to-r from-red-500 to-transparent rounded-full" />
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-3">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nom complet" className="p-3 rounded-xl bg-black/30 border border-white/10" />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="p-3 rounded-xl bg-black/30 border border-white/10" />

        <div className="relative">
          <input value={form.pseudo} onChange={(e) => setForm({ ...form, pseudo: e.target.value })} placeholder="Pseudo" className="p-3 rounded-xl w-full bg-black/30 border border-white/10 pr-12" />

          {/* realtime pseudo indicator */}
          <AnimatePresence>
            {pseudoStatus === "ok" && (
              <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-green-400">
                ✓
              </motion.span>
            )}
            {pseudoStatus === "taken" && (
              <motion.span initial={{ x: 8, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 8, opacity: 0 }} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-red-400">
                ✕
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <select value={form.team} onChange={(e) => setForm({ ...form, team: e.target.value })} className="p-3 rounded-xl bg-black/30 border border-white/10 md:col-span-3">
          <option value="solo">Solo</option>
          <option value="duo">Duo</option>
          <option value="team">Équipe</option>
        </select>

        <button type="submit" className="md:col-span-3 py-3 rounded-2xl bg-red-700/90 font-semibold border border-red-600/30">
          {submitted ? "Inscription envoyée ✓" : "Envoyer ma pré-inscription"}
        </button>

        {/* errors */}
        {Object.keys(errors).length > 0 && (
          <div className="md:col-span-3 text-sm text-red-400">
            {Object.values(errors).map((m, i) => (
              <div key={i}>• {m}</div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}