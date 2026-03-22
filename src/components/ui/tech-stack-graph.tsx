import React, { useState } from 'react';
import { motion } from 'framer-motion';

// CATEGORY 1: LANGUAGES (Purple)
// CATEGORY 2: FRAMEWORKS & RUNTIMES (Cyan & Green)
// CATEGORY 3: DATA & APIS (Magenta & Orange)
// CATEGORY 4: DEVOPS (Blue)

const nodes = [
  // Languages (Shifted Left & Down)
  { id: "js", label: "JS", textLabel: "JAVASCRIPT", x: 300, y: 230, size: 100, color: "#a855f7", icon: "js" },
  { id: "ts", label: "TS", textLabel: "TYPESCRIPT", x: 150, y: 380, size: 70, color: "#a855f7", icon: "ts" },
  { id: "py", label: "PY", textLabel: "PYTHON", x: 300, y: 400, size: 70, color: "#a855f7", icon: "python" },
  { id: "go", label: "GO", textLabel: "GOLANG", x: 450, y: 360, size: 70, color: "#a855f7", icon: "go" },
  { id: "rust", label: "RUST", textLabel: "RUST", x: 500, y: 230, size: 70, color: "#a855f7", icon: "rust" },

  // Frameworks & Runtimes
  { id: "react", label: "REACT", textLabel: "REACT", x: 700, y: 500, size: 110, color: "#22d3ee", icon: "react", statusPanel: true },
  { id: "node", label: "Node.js", textLabel: "NODE.JS", x: 900, y: 650, size: 90, color: "#22c55e", icon: "node" },
  { id: "next", label: "NEXT.js", textLabel: "NEXT.JS", x: 550, y: 650, size: 80, color: "#22d3ee", icon: "next" },
  { id: "vue", label: "VUE", textLabel: "VUE", x: 500, y: 500, size: 70, color: "#10b981", icon: "vue" },
  { id: "svelte", label: "SVELTE", textLabel: "SVELTE", x: 420, y: 650, size: 70, color: "#f97316", icon: "svelte" },
  { id: "graphql", label: "GQL", textLabel: "GRAPHQL", x: 480, y: 780, size: 70, color: "#e879f9", icon: "graphql" },

  // Data & APIs
  { id: "pg", label: "PG", textLabel: "POSTGRESQL", x: 1100, y: 350, size: 80, color: "#f97316", icon: "pg" },
  { id: "mongo", label: "MDB", textLabel: "MONGODB", x: 1150, y: 550, size: 80, color: "#e879f9", icon: "mongo" },
  { id: "redis", label: "RED", textLabel: "REDIS", x: 1100, y: 750, size: 75, color: "#f43f5e", icon: "redis" },

  // DevOps
  { id: "docker", label: "DOCKER", textLabel: "DOCKER", x: 700, y: 950, size: 70, color: "#3b82f6", icon: "docker" },
  { id: "k8s", label: "K8S", textLabel: "KUBERNETES", x: 880, y: 950, size: 70, color: "#3b82f6", icon: "k8s" },
  { id: "aws", label: "AWS", textLabel: "AWS", x: 1060, y: 950, size: 70, color: "#f59e0b", icon: "aws" },
];

const labels = [
  { id: "lang-label", text: "LANGUAGES", x: 300, y: 480, color: "#a855f7" },
  { id: "frame-label", text: "FRAMEWORKS & RUNTIMES", x: 700, y: 800, color: "#22d3ee" },
  { id: "data-label", text: "DATA & APIS", x: 1100, y: 850, color: "#e879f9" },
  { id: "devops-label", text: "DEVOPS", x: 880, y: 1050, color: "#3b82f6" },
];

const connections = [
  // Languages (Purple) Origin js
  { from: "js", to: "ts", color: "#a855f7" },
  { from: "js", to: "py", color: "#a855f7" },
  { from: "js", to: "go", color: "#a855f7" },
  { from: "js", to: "rust", color: "#a855f7" },

  // Frameworks & Runtimes (Cyan/Green)
  { from: "react", to: "vue", color: "#22d3ee" },
  { from: "react", to: "next", color: "#22d3ee" },
  { from: "next", to: "svelte", color: "#22d3ee" },
  { from: "node", to: "next", color: "#22c55e" },
  { from: "node", to: "graphql", color: "#22c55e" },
  { from: "react", to: "node", color: "#22c55e" },

  // Data & APIs (Magenta/Orange)
  { from: "react", to: "pg", color: "#f97316" },
  { from: "node", to: "mongo", color: "#e879f9" },
  { from: "node", to: "redis", color: "#f43f5e" },
  { from: "pg", to: "mongo", color: "#e879f9", isDimmedGlobally: true },
  { from: "mongo", to: "redis", color: "#f43f5e", isDimmedGlobally: true },

  // DevOps (Blue)
  { from: "node", to: "docker", color: "#3b82f6" },
  { from: "docker", to: "k8s", color: "#3b82f6" },
  { from: "k8s", to: "aws", color: "#3b82f6" },
];

const drawBezier = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = Math.abs(x2 - x1);
  const cx1 = x1 + dx * 0.5;
  const cx2 = x2 - dx * 0.5;
  return `M ${x1} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${x2} ${y2}`;
};

const TechIcon = ({ icon, color, size }: { icon: string, color: string, size: number }) => {
  const iconSize = size * 0.45;
  switch (icon) {
    case 'js':
      return <div className="bg-[#f7df1e] text-black font-bold flex items-center justify-center rounded-[4px]" style={{ width: iconSize, height: iconSize, fontSize: iconSize * 0.6, transform: 'translateY(1px)' }}>JS</div>;
    case 'ts':
      return <div className="bg-[#3178c6] text-white font-bold flex items-center justify-center rounded-[4px]" style={{ width: iconSize, height: iconSize, fontSize: iconSize * 0.6 }}>TS</div>;
    case 'python':
      return (
        <svg fill="none" viewBox="0 0 24 24" width={iconSize * 1.3} height={iconSize * 1.3} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <path d="M12 7V17M8 10L16 10M8 14L16 14" />
        </svg>
      );
    case 'go':
      return <div className="font-black italic tracking-tighter" style={{ fontSize: iconSize, color: '#00add8' }}>GO</div>;
    case 'rust':
      return (
        <svg fill="none" viewBox="0 0 24 24" width={iconSize * 1.4} height={iconSize * 1.4} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2M6.5 6.5L5 5M19 19l-1.5-1.5M6.5 17.5L5 19M19 5l-1.5 1.5" />
        </svg>
      );
    case 'react':
      return (
        <svg width={iconSize * 1.6} height={iconSize * 1.6} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" className="animate-[spin_8s_linear_infinite]">
          <ellipse cx="12" cy="12" rx="10" ry="3" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="3" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="3" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" fill={color} />
        </svg>
      );
    case 'node':
      return (
        <svg width={iconSize * 1.4} height={iconSize * 1.4} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
          <polygon points="12,2 22,7.5 22,16.5 12,22 2,16.5 2,7.5" strokeLinejoin="round" />
          <text x="12" y="15" fill={color} fontSize="8" fontWeight="bold" textAnchor="middle" stroke="none">JS</text>
        </svg>
      );
    case 'vue':
      return (
        <svg width={iconSize * 1.3} height={iconSize * 1.3} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <path d="M2 4L12 20L22 4" />
          <path d="M7 4L12 12L17 4" />
        </svg>
      );
    case 'svelte':
      return <div className="bg-[#ff3e00] text-white font-bold flex items-center justify-center rounded-full" style={{ width: iconSize, height: iconSize, fontSize: iconSize * 0.7, fontStyle: 'italic' }}>S</div>;
    case 'next':
      return <div className="bg-black border border-white/20 text-white font-bold flex items-center justify-center rounded-full tracking-tighter" style={{ width: iconSize * 1.2, height: iconSize * 1.2, fontSize: iconSize * 0.55 }}>N</div>;
    case 'graphql':
      return (
        <svg width={iconSize * 1.4} height={iconSize * 1.4} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round">
          <polygon points="12,2 22,7.5 22,16.5 12,22 2,16.5 2,7.5" />
          <circle cx="12" cy="12" r="3" fill={color} />
        </svg>
      );
    case 'pg':
      return (
        <svg width={iconSize * 1.3} height={iconSize * 1.3} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3c-4.4 0-8 2-8 4v10c0 2 3.6 4 8 4s8-2 8-4V7c0-2-3.6-4-8-4Z" />
          <path d="M4 12c0 2 3.6 4 8 4s8-2 8-4" />
          <path d="M4 7c0 2 3.6 4 8 4s8-2 8-4" />
        </svg>
      );
    case 'mongo':
      return (
        <svg width={iconSize * 1.3} height={iconSize * 1.3} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C12 2 4 8 4 14C4 18.4 8 22 12 22C16 22 20 18.4 20 14C20 8 12 2 12 2Z" />
          <path d="M12 2V22" />
        </svg>
      );
    case 'redis':
      return <div className="font-bold flex items-center justify-center rounded-sm" style={{ width: iconSize, height: iconSize, fontSize: iconSize * 1.1, color: '#dc382c' }}>R</div>;
    case 'docker':
      return (
        <svg width={iconSize * 1.3} height={iconSize * 1.3} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12.5h-2c0-3-2.5-5.5-5.5-5.5S9 9.5 9 12.5H2c0 4.4 3.6 8 8 8h10c1.7 0 3-1.3 3-3v-5z" />
          <rect x="12" y="2" width="4" height="3" />
          <rect x="8" y="2" width="4" height="3" />
        </svg>
      );
    case 'k8s':
      return (
        <svg width={iconSize * 1.4} height={iconSize * 1.4} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round">
          <polygon points="12,2 22,7.5 22,16.5 12,22 2,16.5 2,7.5" />
          <circle cx="12" cy="12" r="5" strokeDasharray="2 2" />
        </svg>
      );
    case 'aws':
      return <div className="font-bold text-[#ff9900]" style={{ fontSize: iconSize * 0.7 }}>AWS</div>;
    default:
      return null;
  }
};

export function TechStackGraph() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-end overflow-hidden">
      <div
        className="relative w-[1400px] h-[1100px] origin-right scale-[0.5] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 translate-x-[5%] -translate-y-[5%]"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((conn, idx) => {
            const nodeFrom = nodes.find(n => n.id === conn.from);
            if (!nodeFrom) return null;
            const startX = nodeFrom.x;
            const startY = nodeFrom.y;

            const nodeTo = nodes.find(n => n.id === conn.to);
            if (!nodeTo) return null;

            const isDimmed = (activeNode && (conn.from !== activeNode && conn.to !== activeNode)) || conn.isDimmedGlobally;

            return (
              <motion.path
                key={idx}
                d={drawBezier(startX, startY, nodeTo.x, nodeTo.y)}
                fill="none"
                stroke={conn.color}
                strokeWidth={activeNode === conn.to || activeNode === conn.from ? "4" : "1.5"}
                opacity={isDimmed ? 0.15 : 0.6}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: isDimmed ? 0.15 : 0.6 }}
                transition={{ duration: 1.5, delay: idx * 0.05, ease: 'easeInOut' }}
                style={{
                  filter: isDimmed ? 'none' : `drop-shadow(0 0 6px ${conn.color}80)`
                }}
              />
            )
          })}
        </svg>

        {labels.map(l => (
          <motion.div
            key={l.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute font-bold text-lg tracking-[0.2em] pointer-events-none"
            style={{ left: l.x, top: l.y, x: "-50%", y: "-50%", color: l.color, textShadow: `0 0 15px ${l.color}80` }}
          >
            {l.text}
          </motion.div>
        ))}

        {nodes.map((node, i) => {
          const isHovered = activeNode === node.id;
          const isDimmed = activeNode && !isHovered;

          return (
            <motion.div
              key={node.id}
              className="absolute flex flex-col items-center justify-center pointer-events-auto cursor-pointer"
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                x: "-50%",
                y: "-50%"
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isDimmed ? 0.85 : 1,
                opacity: isDimmed ? 0.4 : 1,
                y: ["-50%", "-51%", "-50%", "-49%", "-50%"]
              }}
              transition={{
                scale: { type: "spring", stiffness: 100, damping: 10 },
                opacity: { duration: 0.3 },
                y: { duration: 4 + Math.random() * 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
              }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              <div
                className="relative flex items-center justify-center rounded-full bg-[#020617]/80 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300 group"
                style={{
                  width: `${node.size}px`,
                  height: `${node.size}px`,
                  boxShadow: isHovered ? `0 0 35px ${node.color}60, inset 0 0 20px ${node.color}40` : `0 0 20px ${node.color}30`,
                  borderColor: isHovered ? node.color : `${node.color}60`
                }}
              >
                <TechIcon icon={node.icon} color={node.color} size={node.size} />

                {/* React Info Panel Simulation */}
                {node.statusPanel && isHovered && (
                  <motion.div
                    className="absolute left-[130%] top-1/2 -translate-y-1/2 w-56 bg-[#0a0f1e]/95 backdrop-blur-xl border border-white/10 rounded-lg p-4 pointer-events-none z-50 text-left"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="text-xs text-white/60 font-mono mb-2 uppercase tracking-widest border-b border-white/10 pb-2">
                      {node.textLabel} INTEGRATION STATUS
                    </div>
                    <div className="text-xs text-white/90 space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-3 rounded-sm bg-green-400 animate-pulse" />
                        <span className="font-mono text-[11px] truncate">{`> Active Modules:`} 32</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-3 rounded-sm bg-rose-400" />
                        <span className="font-mono text-[11px] truncate">{`> Error Rate:`} 0.01%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-3 rounded-sm bg-cyan-400" />
                        <span className="font-mono text-[11px] truncate">{`> Build Time:`} 45s</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <motion.span
                className="absolute top-[110%] font-mono text-xs text-white/60 tracking-[0.25em] whitespace-nowrap drop-shadow-md"
                animate={{ opacity: isDimmed ? 0.3 : 1 }}
              >
                {node.textLabel}
              </motion.span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
