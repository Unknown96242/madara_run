import React, { useState } from "react";
import Header from "./components/Header";
import HeroTimer from "./components/HeroTimer";
import Features from "./components/Features";
import PreinscriptionForm from "./components/PreinscriptionForm";
import SusanooGhost from "./components/SusanooGhost";
import Sponsors from "./components/Sponsors";
import ImportantCards from "./components/ImportantCards";
import Footer from "./components/Footer";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [showSusanoo, setShowSusanoo] = useState(false);

  function handleValidated() {
    setShowSusanoo(true);
    setTimeout(() => setShowSusanoo(false), 2600);
  }

  return (
    <div className={theme === "dark" ? "min-h-screen bg-gradient-to-b from-[#05060a] to-black text-white" : "min-h-screen bg-slate-50 text-slate-900"}>
      <Header theme={theme} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <HeroTimer theme={theme} />

        {/* Event description */}
        <section className="mt-12">
          <div className="rounded-2xl p-6 md:p-10 bg-gradient-to-br from-[#08050a]/60 to-[#060204]/60 border border-white/6">
            <h2 className="text-2xl md:text-3xl font-extrabold">À propos du Madara Run</h2>
            <p className="mt-3 text-slate-300 leading-relaxed">Madara Run est une course nocturne immersive inspirée des univers légendaires : parcours jalonné de checkpoints visuels, effets lumineux et musique immersive. Que tu sois débutant ou confirmé, viens vivre une expérience unique — stratégie d'équipe, défis et ambiance mystique au rendez-vous.</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-black/20 rounded-lg">📍 Lieu: Forêt interdite (virtuel)</div>
              <div className="p-4 bg-black/20 rounded-lg">🕒 Date: 15 Décembre 2025</div>
              <div className="p-4 bg-black/20 rounded-lg">👟 Distance: 10 km — multi-niveaux</div>
            </div>
          </div>
        </section>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Features />
            <div className="mt-6">
              <PreinscriptionForm onValidated={handleValidated} />
            </div>

            <div className="mt-8">
              <ImportantCards />
            </div>
          </div>

          <aside className="lg:col-span-1">
            <Sponsors />
          </aside>
        </div>
      </main>

      <SusanooGhost show={showSusanoo} />

      <Footer />
    </div>
  );
}
