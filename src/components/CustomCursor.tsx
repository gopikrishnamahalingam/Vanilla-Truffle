import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  vy: number;
}

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device is touch or coarse
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || prefersReducedMotion) {
      setIsTouch(true);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const clickable = target.closest('button, a, input, select, textarea, [role="button"]');
      setIsPointer(!!clickable);

      // Spawn candy particle trail if moved enough distance
      const dist = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y);
      if (dist > 18) {
        lastPos.current = { x: e.clientX, y: e.clientY };
        const colors = ['#F472B6', '#C084FC', '#A78BFA', '#FDE047', '#67E8F9'];
        const newParticle: Particle = {
          id: particleId.current++,
          x: e.clientX + (Math.random() * 8 - 4),
          y: e.clientY + 12,
          size: Math.random() * 4 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0.9,
          vy: Math.random() * 1.5 + 0.5,
        };

        setParticles((prev) => [...prev.slice(-12), newParticle]);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Particle decay loop
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            y: p.y + p.vy,
            opacity: p.opacity - 0.08,
          }))
          .filter((p) => p.opacity > 0.05)
      );
    }, 45);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(interval);
    };
  }, []);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Candy Particle Dust */}
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            transform: `translate3d(${p.x}px, ${p.y}px, 0)`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
          }}
          className="absolute rounded-full shadow-sm"
        />
      ))}

      {/* Cupcake Cursor */}
      <div
        style={{
          transform: `translate3d(${pos.x - 12}px, ${pos.y - 12}px, 0) scale(${isPointer ? 1.2 : 1})`,
          transition: 'transform 0.08s ease-out',
        }}
        className="absolute top-0 left-0"
      >
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="drop-shadow-md">
          {/* Cupcake wrapper */}
          <path d="M7 16L9 28C9.2 29 10 30 11 30H21C22 30 22.8 29 23 28L25 16H7Z" fill="#C084FC" />
          <path d="M11 16L12 29M16 16V30M21 16L20 29" stroke="#9333EA" strokeWidth="1.5" strokeLinecap="round" />
          {/* Frosting fluff */}
          <path
            d="M5 16C5 13 8 10 11 11C12 9 15 8 17 9C19 8 22 9 22 12C24 11 27 13 27 16C27 18 25 18 24 18H8C7 18 5 18 5 16Z"
            fill="#F5D0FE"
          />
          {/* Swirl lines */}
          <path d="M10 14C12 11 18 10 22 14" stroke="#E879F9" strokeWidth="1.5" strokeLinecap="round" />
          {/* Cherry on top with subtle bounce */}
          <circle cx="16" cy="7" r="3.5" fill="#EF4444" className="animate-pulse" />
          <path d="M16 4C17 2 19 2 20 3" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};
