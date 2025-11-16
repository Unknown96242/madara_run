import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PreinscriptionForm({ onValidated }) {
  const [form, setForm] = useState({ name: "", email: "", pseudo: "", team: "solo" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const used = useRef(new Set(["Madara", "Uchiha", "Rinnegan"]));
  const [pseudoStatus, setPseudoStatus] = useState(null);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (!form.pseudo.trim()) return setPseudoStatus(null);
    const t = setTimeout(() => {
      setPseudoStatus(used.current.has(form.pseudo.trim()) ? "taken" : "ok");
    }, 400);
    return () => clearTimeout(t);
  }, [form.pseudo]);

  function validate() {
    const e = {};
    if (!form.name.trim() || form.name.length < 2) e.name = "Nom trop court";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Email invalide";
    if (!form.pseudo.trim()) e.pseudo = "Pseudo requis";
    if (pseudoStatus === "taken") e.pseudo = "Pseudo déjà pris";
    if (!accepted) e.accepted = "Vous devez accepter l'utilisation de vos données";
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      used.current.add(form.pseudo.trim());
      setSubmitted(true);
      // generate a fake unique code (for demo only)
      const code = "MADARA-" + Math.random().toString(36).substring(2, 8).toUpperCase();

      // simulate sending email
      console.log("Generated code ->", code, "(simulate send email)");

      onValidated && onValidated();

      setTimeout(() => {
        setForm({ name: "", email: "", pseudo: "", team: "solo" });
        setSubmitted(false);
        setPseudoStatus(null);
        setAccepted(false);
        alert(`Pré-inscription confirmée — code généré : ${code}. (Simulation)`);
      }, 1400);
    }
  }

  return (
    <div className="rounded-2xl p-4 bg-gradient-to-br from-[#06060a]/50 to-[#030204]/40 border border-white/6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nom complet" className={`p-3 rounded-xl bg-[#060609]/40 border ${errors.name ? 'ring-2 ring-red-500/30' : ''}`} />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className={`p-3 rounded-xl bg-[#060609]/40 border ${errors.email ? 'ring-2 ring-red-500/30' : ''}`} />

        <div className="relative">
          <input value={form.pseudo} onChange={(e) => setForm({ ...form, pseudo: e.target.value })} placeholder="Pseudo" className={`p-3 rounded-xl w-full bg-[#060609]/40 border pr-12 ${errors.pseudo ? 'ring-2 ring-red-500/30' : ''}`} />

          <AnimatePresence>
            {pseudoStatus === "ok" && (
              <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-green-400">✓</motion.span>
            )}
            {pseudoStatus === "taken" && (
              <motion.span initial={{ x: 8, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 8, opacity: 0 }} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-red-400">✕</motion.span>
            )}
          </AnimatePresence>
        </div>

        <select value={form.team} onChange={(e) => setForm({ ...form, team: e.target.value })} className="p-3 rounded-xl bg-[#060609]/40 border md:col-span-3">
          <option value="solo">Solo</option>
          <option value="duo">Duo</option>
          <option value="team">Équipe</option>
        </select>

        <div className="md:col-span-3 flex items-start gap-3">
          <input id="accept" type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1" />
          <label htmlFor="accept" className="text-sm text-slate-300">J'accepte que mes données soient utilisées dans le cadre de l'événement MADARA RUN et je comprends que je recevrai mes identifiants de connexion par email</label>
        </div>

        <button type="submit" className="md:col-span-3 py-3 rounded-2xl bg-red-700/90 font-semibold border border-red-600/30">
          {submitted ? "✔ Inscription envoyée" : "Envoyer ma pré-inscription"}
        </button>

        {Object.keys(errors).length > 0 && (
          <div className="md:col-span-3 text-sm text-red-400">
            {Object.values(errors).map((m, i) => (
              <div key={i}>• {m}</div>
            ))}
          </div>
        )}

        <div className="md:col-span-3 text-xs text-slate-500 mt-2">Un code de connexion unique vous sera généré automatiquement et envoyé par email. Conservez-le précieusement pour le jour de l'événement !</div>
      </form>
    </div>
  );
}
