"use client";

import { useEffect, useRef } from "react";

type Leaf = {
  x: number;
  y: number;
  s: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  sway: number;
  c: string;
};

const rnd = (a: number, b: number) => a + Math.random() * (b - a);

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let t = 0;

    const leafColors = ["#6fa653", "#5b8c4a", "#ef6c1a", "#c9863a"];
    const leaves: Leaf[] = Array.from({ length: 16 }, () => ({
      x: rnd(0, 1),
      y: rnd(0, 1),
      s: rnd(7, 14),
      vx: rnd(-0.15, -0.04),
      vy: rnd(0.06, 0.18),
      rot: rnd(0, 6.28),
      vr: rnd(-0.02, 0.02),
      sway: rnd(0, 6.28),
      c: leafColors[(Math.random() * leafColors.length) | 0],
    }));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      for (const l of leaves) {
        l.x += l.vx * 0.004 + Math.sin(t + l.sway) * 0.0006;
        l.y += l.vy * 0.004;
        l.rot += l.vr;
        if (l.y > 1.05) {
          l.y = -0.05;
          l.x = rnd(0, 1);
        }
        if (l.x < -0.05) l.x = 1.05;
        const px = l.x * width;
        const py = l.y * height;
        const s = l.s * dpr;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(l.rot + Math.sin(t + l.sway) * 0.4);
        ctx.fillStyle = l.c;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.5);
        ctx.quadraticCurveTo(s * 0.5, 0, 0, s * 0.5);
        ctx.quadraticCurveTo(-s * 0.5, 0, 0, -s * 0.5);
        ctx.fill();
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[2] h-full w-full"
    />
  );
}
