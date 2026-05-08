'use client';
import React, { useEffect, useRef } from 'react';

export default function SuperFastCursor() {
  const canvasRef = useRef(null);
  
  const params = useRef({
    mx: -1000, my: -1000, 
    tx: -1000, ty: -1000,
    vx: 0, vy: 0,     
    isHovering: false,
    particles: []
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true }); // تحسين أداء الكانفاس
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      params.current.mx = e.clientX;
      params.current.my = e.clientY;
    };

    const handleMouseOver = (e) => {
      params.current.isHovering = !!e.target.closest('button, a, input, .cursor-pointer, .group\\/btn');
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    resize();

    const updateAndDraw = () => {
      const p = params.current;
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);

      const dx = p.mx - p.tx;
      const dy = p.my - p.ty;
      p.tx += dx * 0.2; 
      p.ty += dy * 0.2;
      p.vx = dx;
      p.vy = dy;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.abs(dx) + Math.abs(dy) > 2) {
        const count = Math.min(Math.floor(speed / 5), 3);
        for (let i = 0; i < count; i++) {
          p.particles.push({
            x: p.mx, y: p.my,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
            size: Math.random() * 2 + 1,
            decay: Math.random() * 0.03 + 0.02
          });
        }
      }

      ctx.shadowBlur = 0; 
      for (let i = 0; i < p.particles.length; i++) {
        const part = p.particles[i];
        part.x += part.vx;
        part.y += part.vy;
        part.life -= part.decay;

        if (part.life <= 0) {
          p.particles.splice(i, 1);
          i--;
          continue;
        }

        ctx.fillStyle = `rgba(59, 130, 246, ${part.life})`;
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
        ctx.fill();
      }

      const angle = Math.atan2(p.vy, p.vx);
      const scaleX = p.isHovering ? 1.5 : 1 + Math.min(speed * 0.02, 1);
      const scaleY = p.isHovering ? 1.5 : 1 - Math.min(speed * 0.01, 0.3);

      ctx.save();
      ctx.translate(p.tx, p.ty);
      ctx.rotate(angle);
      ctx.scale(scaleX, scaleY);
      
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.strokeStyle = p.isHovering ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      if (p.isHovering) {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.fill();
      }
      ctx.restore();

      if (!p.isHovering) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(p.mx, p.my, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    animationFrameId = requestAnimationFrame(updateAndDraw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] mix-blend-screen"
      style={{ backfaceVisibility: 'hidden' }} 
    />
  );
}