import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SusanooGhost({ show = false }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
          <motion.div initial={{ scale: 0.6, opacity: 0.9 }} animate={{ scale: 1.6, opacity: 0 }} transition={{ duration: 0.9 }} className="absolute w-[520px] h-[520px] rounded-full bg-gradient-to-r from-[#7c3aed]/60 to-[#ef4444]/20" />
          <motion.img src="/assets/susanoo.png" alt="susanoo" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 0.95 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.9 }} className="w-80 max-w-[80vw] mix-blend-screen drop-shadow-[0_30px_60px_rgba(124,58,237,0.18)]" />
          <svg className="absolute w-[600px] h-[600px]" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#ff6b6b" strokeOpacity="0.12" strokeWidth="2">
              <circle cx="300" cy="300" r="160" strokeDasharray="2 6" />
              <circle cx="300" cy="300" r="220" strokeDasharray="3 8" />
            </g>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
