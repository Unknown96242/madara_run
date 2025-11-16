import React from "react";

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="relative z-20 max-w-6xl mx-auto flex items-center justify-between p-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center overflow-hidden">
          <img src="/assets/sharingan.png" alt="emblem" className="w-8 h-8 object-cover" />
        </div>
        <div>
          <h1 className="font-extrabold text-xl">Madara <span className="text-red-700">Run</span></h1>
          <div className="text-xs opacity-70">Immersive run — Sharingan vibes</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
       
        <button onClick={onToggleTheme} aria-label="Toggle theme" className="ml-4 p-2 rounded border">{theme === "dark" ? "☀️" : "🌙"}</button>
      </div>
    </header>
  );
}
