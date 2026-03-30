
'use client';

import { useEffect, useRef } from 'react';

export default function CanvasBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles: Particle[] = [];
        const particleCount = 60;
        const connectionDistance = 180;
        const mouseDistance = 250;

        let mouse = { x: 0, y: 0 };

        class Particle {
            public x: number;
            public y: number;
            public vx: number;
            public vy: number;
            public size: number;
            public color: string;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.size = Math.random() * 2 + 0.5;
                const colors = ['#38bdf8', '#818cf8', '#c084fc'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = 0.4;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        let animFrameId: number;
        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            particles.forEach((particle, index) => {
                particle.update();
                particle.draw();

                // Connect to mouse
                const dxMouse = particle.x - mouse.x;
                const dyMouse = particle.y - mouse.y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distMouse < mouseDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = particle.color;
                    ctx.globalAlpha = (0.3 - distMouse / mouseDistance) * 0.5;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }

                // Connect to other particles
                for (let j = index + 1; j < particles.length; j++) {
                    const dx = particle.x - particles[j].x;
                    const dy = particle.y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = particle.color;
                        ctx.globalAlpha = (0.15 - dist / connectionDistance) * 0.3;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            });

            animFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Adjust for canvas position relative to viewport if needed, 
            // but for full screen fixed canvas clientX/Y is fine
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            cancelAnimationFrame(animFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none opacity-40"
        />
    );
}
