'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  GitHubRepo, MappedRepo,
  filterRepos, mapRepoToTechs, repoToMapped, timeAgo,
} from '../lib/github';

// ─── Tech nodes layout ───────────────────────────────────────────────────────

interface TechNode {
  id: string;
  label: string;
  icon: string;
  color: string;          // text / border colour
  glow: string;           // rgba glow
  size: number;           // diameter px
  orbit: number;          // distance from centre
  angle: number;          // degrees (0 = right)
  floatDelay: number;     // animation-delay s
}

const NODES: TechNode[] = [
  { id: 'spring-boot', label: 'Spring Boot', icon: '🍃', color: '#86efac', glow: 'rgba(134,239,172,0.35)', size: 96, orbit: 0,   angle: 0,   floatDelay: 0 },
  // Orbit 1 (175px)
  { id: 'kafka',       label: 'Kafka',       icon: '⚡', color: '#fbbf24', glow: 'rgba(251,191,36,0.35)',  size: 68, orbit: 175, angle: 0,   floatDelay: 0.4 },
  { id: 'redis',       label: 'Redis',       icon: '🔴', color: '#f87171', glow: 'rgba(248,113,113,0.35)', size: 68, orbit: 175, angle: 72,  floatDelay: 0.9 },
  { id: 'postgresql',  label: 'PostgreSQL',  icon: '🐘', color: '#93c5fd', glow: 'rgba(147,197,253,0.35)', size: 68, orbit: 175, angle: 144, floatDelay: 1.4 },
  { id: 'react',       label: 'React',       icon: '⚛️', color: '#67e8f9', glow: 'rgba(103,232,249,0.35)', size: 68, orbit: 175, angle: 216, floatDelay: 1.9 },
  { id: 'docker',      label: 'Docker',      icon: '🐳', color: '#60a5fa', glow: 'rgba(96,165,250,0.35)',  size: 68, orbit: 175, angle: 288, floatDelay: 2.3 },
  // Orbit 2 (295px)
  { id: 'flutter',     label: 'Flutter',     icon: '💙', color: '#a78bfa', glow: 'rgba(167,139,250,0.35)', size: 58, orbit: 295, angle: 30,  floatDelay: 0.7 },
  { id: 'java',        label: 'Java',        icon: '☕', color: '#f59e0b', glow: 'rgba(245,158,11,0.35)',  size: 58, orbit: 295, angle: 90, floatDelay: 1.6 },
  { id: 'python',      label: 'Python',      icon: '🐍', color: '#fcd34d', glow: 'rgba(252,211,77,0.35)',  size: 58, orbit: 295, angle: 150, floatDelay: 1.1 },
  { id: 'nextjs',      label: 'Next.js',     icon: '▲', color: '#ffffff', glow: 'rgba(255,255,255,0.25)', size: 58, orbit: 295, angle: 210, floatDelay: 0.2 },
  { id: 'typescript',  label: 'TypeScript',  icon: '📘', color: '#93c5fd', glow: 'rgba(147,197,253,0.35)', size: 58, orbit: 295, angle: 270, floatDelay: 2.1 },
  { id: 'sql',         label: 'SQL',         icon: '🗄️', color: '#fdba74', glow: 'rgba(253,186,116,0.35)', size: 58, orbit: 295, angle: 330, floatDelay: 1.8 },
];

const CENTER = NODES[0];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TechUniverse() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<TechNode | null>(null);
  const [panelRepos, setPanelRepos] = useState<MappedRepo[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cx, setCx] = useState(350);
  const [cy, setCy] = useState(310);
  const [mounted, setMounted] = useState(false);

  // Recalculate centre on resize
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setCx(containerRef.current.offsetWidth / 2);
        setCy(containerRef.current.offsetHeight / 2);
      }
    };
    update();
    setMounted(true);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Fetch GitHub repos
  useEffect(() => {
    fetch('https://api.github.com/users/Sushant0999/repos?per_page=100&sort=updated')
      .then(r => r.json())
      .then((data: GitHubRepo[]) => {
        setRepos(filterRepos(data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleNodeClick = useCallback((node: TechNode) => {
    if (selected?.id === node.id) { setSelected(null); return; }
    setSelected(node);
    const matched = repos
      .filter(r => mapRepoToTechs(r).includes(node.id))
      .map(repoToMapped);
    setPanelRepos(matched);
  }, [repos, selected]);

  // ── Bubble positions ──────────────────────────────────────────────────────
  const pos = (n: TechNode) => {
    const rad = (n.angle * Math.PI) / 180;
    return { x: cx + n.orbit * Math.cos(rad), y: cy + n.orbit * Math.sin(rad) };
  };

  // ── Connection lines ──────────────────────────────────────────────────────
  const allConnections = useMemo(() => {
    const pairs = new Set<string>();
    repos.forEach(r => {
      const techs = mapRepoToTechs(r);
      for (let i = 0; i < techs.length; i++) {
        for (let j = i + 1; j < techs.length; j++) {
           const a = techs[i];
           const b = techs[j];
           const pair = a < b ? `${a}:${b}` : `${b}:${a}`;
           pairs.add(pair);
        }
      }
    });
    return Array.from(pairs).map(p => p.split(':'));
  }, [repos]);

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sky-500/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            Tech <span className="text-gradient">Universe</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Click any node to explore my GitHub projects built with that technology.
          </p>
        </div>

        {/* Main layout: bubble map + panel */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── Bubble Map ── */}
          <div
            ref={containerRef}
            className="relative flex-shrink-0 w-full lg:w-[700px] h-[620px] mx-auto"
          >
            {/* SVG connection lines */}
            {mounted && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                {allConnections.map(([idA, idB]) => {
                  const nA = NODES.find(n => n.id === idA);
                  const nB = NODES.find(n => n.id === idB);
                  if (!nA || !nB) return null;

                  const pA = nA.orbit === 0 ? { x: cx, y: cy } : pos(nA);
                  const pB = nB.orbit === 0 ? { x: cx, y: cy } : pos(nB);

                  const isConnectedToSelected = selected && (selected.id === idA || selected.id === idB);
                  const isFaint = selected && !isConnectedToSelected;
                  const activeColor = isConnectedToSelected ? selected.color : 'rgba(255,255,255,0.06)';

                  return (
                    <line
                      key={`${idA}-${idB}`}
                      x1={pA.x} y1={pA.y}
                      x2={pB.x} y2={pB.y}
                      stroke={activeColor}
                      strokeWidth={isConnectedToSelected ? 1.5 : 0.6}
                      strokeDasharray={isConnectedToSelected ? '6 4' : '4 8'}
                      className={isConnectedToSelected ? 'animate-dash' : ''}
                      filter={isConnectedToSelected ? 'url(#glow)' : undefined}
                      style={{ transition: 'all 0.4s ease', opacity: isFaint ? 0.05 : 1 }}
                    />
                  );
                })}
              </svg>
            )}

            {/* Bubbles */}
            {mounted && NODES.map(n => {
              const p = n.orbit === 0 ? { x: cx, y: cy } : pos(n);
              const isCenter = n.orbit === 0;
              const isActive = selected?.id === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => handleNodeClick(n)}
                  className="absolute flex flex-col items-center justify-center rounded-full border-2 transition-all duration-300 cursor-pointer group"
                  style={{
                    width: n.size,
                    height: n.size,
                    left: p.x - n.size / 2,
                    top:  p.y - n.size / 2,
                    borderColor: isActive ? n.color : 'rgba(255,255,255,0.12)',
                    background: isActive
                      ? `radial-gradient(circle, ${n.glow}, rgba(15,23,42,0.9))`
                      : 'rgba(15,23,42,0.75)',
                    boxShadow: isActive ? `0 0 24px ${n.glow}, 0 0 60px ${n.glow}` : 'none',
                    backdropFilter: 'blur(12px)',
                    animationName: 'bubbleFloat',
                    animationDuration: `${4 + n.floatDelay}s`,
                    animationDelay: `${n.floatDelay}s`,
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                    animationDirection: 'alternate',
                    zIndex: isCenter ? 10 : 5,
                    transform: isActive ? 'scale(1.12)' : 'scale(1)',
                  }}
                  aria-label={`Tech: ${n.label}`}
                >
                  <span className="text-xl mb-0.5 group-hover:scale-125 transition-transform">{n.icon}</span>
                  <span
                    className="font-bold text-center leading-tight"
                    style={{
                      color: n.color,
                      fontSize: isCenter ? '11px' : '9px',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {n.label}
                  </span>
                </button>
              );
            })}

            {/* Loading overlay */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-slate-500 text-sm animate-pulse">Fetching GitHub data…</p>
              </div>
            )}
          </div>

          {/* ── Side Panel ── */}
          <div
            className="flex-1 w-full min-h-[400px] transition-all duration-500"
            style={{ opacity: selected ? 1 : 0.4, transform: selected ? 'translateX(0)' : 'translateX(10px)' }}
          >
            {selected ? (
              <div className="glass-panel rounded-3xl p-8 h-full border border-white/10">
                {/* Panel header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{selected.icon}</span>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight" style={{ color: selected.color }}>
                      {selected.label}
                    </h3>
                    <p className="text-slate-400 text-sm mt-0.5">
                      {panelRepos.length === 0 ? 'No matched repos' : `${panelRepos.length} project${panelRepos.length !== 1 ? 's' : ''} found`}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="ml-auto text-slate-500 hover:text-white transition-colors text-2xl leading-none"
                    aria-label="Close panel"
                  >
                    ×
                  </button>
                </div>

                {/* Repo list */}
                <div className="space-y-4 overflow-y-auto" style={{ maxHeight: '460px' }}>
                  {panelRepos.length === 0 && (
                    <p className="text-slate-500 text-sm">No public repos explicitly tagged with this technology yet.</p>
                  )}
                  {panelRepos.map(r => (
                    <a
                      key={r.name}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block glass-card rounded-2xl p-5 border border-white/5 hover:border-white/20 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white text-sm group-hover:text-sky-400 transition-colors">
                          {r.displayName}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0 ml-3">
                          {r.stars > 0 && <span>⭐ {r.stars}</span>}
                          <span>{timeAgo(r.updatedAt)}</span>
                        </div>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">
                        {r.description}
                      </p>
                      {r.features.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {r.features.map(f => (
                            <span
                              key={f}
                              className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border"
                              style={{ borderColor: `${selected.color}40`, color: selected.color, background: `${selected.glow}` }}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="glass-panel rounded-3xl p-8 h-full border border-white/5 flex items-center justify-center">
                <p className="text-slate-600 text-center text-sm">
                  ← Click a bubble to see<br />GitHub projects for that tech
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
