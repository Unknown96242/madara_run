import React, { useEffect, useRef } from "react";

// Simple 2D canvas particles for red embers/particles
export default function ParticlesCanvas({ theme = "dark" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current as any;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles = [] as any[];
    const N = Math.max(30, Math.floor((w * h) / 90000));
    for (let i = 0; i < N; i++) {
      particles.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.6, vy: -Math.random() * 0.6 - 0.2, r: 1 + Math.random() * 2, a: Math.random() * 0.9 + 0.05 });
    }

    let raf = 0;
    function draw() {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);

      // vignette overlay
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy -= Math.random() * 0.02;

        if (p.y < -50 || p.x < -60 || p.x > w + 60) {
          p.x = Math.random() * w;
          p.y = h + Math.random() * 120;
          p.vx = (Math.random() - 0.5) * 0.6;
          p.vy = -Math.random() * 0.6 - 0.2;
        }

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grd.addColorStop(0, `rgba(255,120,120,${p.a})`);
        grd.addColorStop(0.2, `rgba(255,60,60,${p.a * 0.6})`);
        grd.addColorStop(1, `rgba(0,0,0,0)`);

        ctx.beginPath();
        ctx.fillStyle = grd;
        ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function onResize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", onResize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [theme]);

  return <canvas ref={ref} className="fixed inset-0 -z-10 pointer-events-none" />;
}