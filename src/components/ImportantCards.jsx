import React from "react";

export default function ImportantCards() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 rounded-xl bg-gradient-to-br from-[#071019]/50 to-[#040204]/40 border border-white/6">
        <h5 className="font-bold">🛡️ Important à savoir</h5>
        <p className="mt-2 text-sm text-slate-300">Un code de connexion unique vous sera généré automatiquement et envoyé par email. Conservez-le précieusement pour le jour de l'événement !</p>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-br from-[#071019]/50 to-[#040204]/40 border border-white/6">
        <h5 className="font-bold">🔒 Confidentialité & données</h5>
        <p className="mt-2 text-sm text-slate-300">En t'inscrivant, tu acceptes que tes données soient utilisées pour l'organisation du Madara Run et pour l'envoi des identifiants.</p>
      </div>
    </section>
  );
}
