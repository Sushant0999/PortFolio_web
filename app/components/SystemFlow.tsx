'use client';

import { useState } from 'react';
import { SYSTEM_FLOWS, type FlowNode, type SystemFlowDef } from '../data/portfolio';

// ── Node type styling ──────────────────────────────────────────────────────────

const NODE_STYLES: Record<FlowNode['type'], { bg: string; border: string; color: string; icon: string }> = {
  client:   { bg: 'rgba(99,102,241,0.15)',  border: '#818cf8', color: '#818cf8', icon: '👤' },
  api:      { bg: 'rgba(56,189,248,0.15)',  border: '#38bdf8', color: '#38bdf8', icon: '🔌' },
  service:  { bg: 'rgba(52,211,153,0.15)',  border: '#34d399', color: '#34d399', icon: '⚙️' },
  queue:    { bg: 'rgba(251,191,36,0.15)',  border: '#fbbf24', color: '#fbbf24', icon: '📨' },
  cache:    { bg: 'rgba(248,113,113,0.15)', border: '#f87171', color: '#f87171', icon: '⚡' },
  database: { bg: 'rgba(167,139,250,0.15)', border: '#a78bfa', color: '#a78bfa', icon: '🗄️' },
};

// ── Animated SVG Arrow ─────────────────────────────────────────────────────────

function Arrow({ delay = 0 }) {
  return (
    <div className="flex items-center shrink-0 w-14 relative">
      <svg viewBox="0 0 56 20" className="w-full h-5 overflow-visible">
        {/* Base line */}
        <line x1="0" y1="10" x2="48" y2="10" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        {/* Animated dot */}
        <circle r="3" fill="rgba(56,189,248,0.9)">
          <animateMotion
            dur="1.8s"
            repeatCount="indefinite"
            begin={`${delay}s`}
            path="M 0 10 L 48 10"
          />
        </circle>
        {/* Arrowhead */}
        <polygon points="48,6 56,10 48,14" fill="rgba(255,255,255,0.25)" />
      </svg>
    </div>
  );
}

// ── Single Flow Diagram ────────────────────────────────────────────────────────

function FlowDiagram({ flow }: { flow: SystemFlowDef }) {
  const [activeNode, setActiveNode] = useState<FlowNode | null>(null);

  return (
    <div className="glass-panel rounded-3xl p-8 border border-white/10">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-black tracking-tight text-white mb-1">{flow.title}</h3>
        <p className="text-slate-400 text-sm font-mono">{flow.subtitle}</p>
      </div>

      {/* Flow nodes */}
      <div className="flex items-center overflow-x-auto pb-4 gap-0 min-w-0">
        {flow.nodes.map((node, i) => {
          const style = NODE_STYLES[node.type];
          const isActive = activeNode?.id === node.id;
          return (
            <div key={node.id} className="flex items-center shrink-0">
              <button
                onClick={() => setActiveNode(isActive ? null : node)}
                className="flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 cursor-pointer group shrink-0"
                style={{
                  width: 100,
                  minHeight: 80,
                  background: isActive ? style.bg : 'rgba(15,23,42,0.6)',
                  borderColor: isActive ? style.border : 'rgba(255,255,255,0.08)',
                  boxShadow: isActive ? `0 0 20px ${style.bg}` : 'none',
                  padding: '10px 8px',
                  backdropFilter: 'blur(8px)',
                  transform: isActive ? 'translateY(-4px) scale(1.05)' : 'none',
                }}
                aria-label={`Flow node: ${node.label}`}
              >
                <span className="text-lg mb-1">{style.icon}</span>
                <span
                  className="text-[10px] font-bold uppercase tracking-widest text-center leading-tight"
                  style={{ color: isActive ? style.color : '#94a3b8' }}
                >
                  {node.label}
                </span>
                {node.sublabel && (
                  <span className="text-[8px] text-slate-600 mt-0.5 text-center">{node.sublabel}</span>
                )}
              </button>
              {i < flow.nodes.length - 1 && <Arrow delay={i * 0.3} />}
            </div>
          );
        })}
      </div>

      {/* Detail card */}
      <div
        style={{
          maxHeight: activeNode ? '180px' : '0px',
          opacity: activeNode ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s ease, opacity 0.3s ease',
          marginTop: activeNode ? '24px' : '0px',
        }}
      >
        {activeNode && (() => {
          const style = NODE_STYLES[activeNode.type];
          return (
            <div
              className="rounded-2xl p-5 border"
              style={{ background: style.bg, borderColor: `${style.border}40` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">{style.icon}</span>
                <h4 className="font-bold text-sm" style={{ color: style.color }}>{activeNode.label}</h4>
                <span className="ml-auto text-xs text-slate-500 font-mono uppercase">{activeNode.type}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
                <div>
                  <p className="text-slate-500 uppercase tracking-widest font-bold mb-1 text-[9px]">Purpose</p>
                  <p className="leading-relaxed">{activeNode.purpose}</p>
                </div>
                <div>
                  <p className="text-slate-500 uppercase tracking-widest font-bold mb-1 text-[9px]">Why used</p>
                  <p className="leading-relaxed">{activeNode.why}</p>
                </div>
                <div>
                  <p className="text-slate-500 uppercase tracking-widest font-bold mb-1 text-[9px]">Performance</p>
                  <p className="leading-relaxed">{activeNode.benefit}</p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {!activeNode && (
        <p className="text-slate-700 text-xs mt-4 text-center">↑ Click any node to inspect it</p>
      )}
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────

export default function SystemFlow() {
  return (
    <section className="py-32 px-4 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            System <span className="text-gradient">Flow</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Projects visualised as data pipelines. Click any node to see its purpose, trade-offs and performance impact.
          </p>
        </div>

        <div className="space-y-10">
          {SYSTEM_FLOWS.map(flow => (
            <FlowDiagram key={flow.projectId} flow={flow} />
          ))}
        </div>
      </div>
    </section>
  );
}
