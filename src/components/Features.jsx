import React from "react";

export default function Features() {
  return (
    <section className="rounded-2xl p-6 md:p-8 bg-gradient-to-r from-[#071019]/50 to-[#040204]/40 border border-white/4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-black/20">📡 Checkpoints visuels</div>
        <div className="p-4 rounded-xl bg-black/20">🎧 Musique immersive</div>
        <div className="p-4 rounded-xl bg-black/20">🏆 Challenges & récompenses</div>
      </div>
    </section>
  );
}
