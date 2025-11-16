import React from "react";

const fakeSponsors = [
  { id: 1, name: "Konoha Tech", color: "#ef4444" },
  { id: 2, name: "Uchiha Gear", color: "#7c3aed" },
  { id: 3, name: "Shinobi Shoes", color: "#f59e0b" },
  { id: 4, name: "Rinne Energy", color: "#06b6d4" },
];

export default function Sponsors() {
  return (
    <div className="rounded-2xl p-4 bg-gradient-to-br from-[#06060a]/50 to-[#030204]/40 border border-white/6">
      <h4 className="font-bold mb-3">Sponsors</h4>
      <div className="grid grid-cols-2 gap-3">
        {fakeSponsors.map((s) => (
          <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg bg-black/20 hover:scale-105 transition-transform">
            <div style={{ background: s.color }} className="w-12 h-12 rounded-md flex items-center justify-center text-black font-bold">{s.name.split(" ")[0].charAt(0)}</div>
            <div>
              <div className="font-semibold">{s.name}</div>
              <div className="text-xs text-slate-400">Partenaire officiel</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
