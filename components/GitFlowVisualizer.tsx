import React, { useEffect, useRef, useState } from 'react';
import { Cloud, FileCode, Layers, Database } from 'lucide-react';
import { Language, OsCommand } from '../types';

interface GitFlowVisualizerProps {
    command: string | OsCommand;
    language: Language;
}

// ─── Active state logic ───────────────────────────────────────────────────────
function getActiveState(cmd: string) {
    const isAdd = cmd.includes('add');
    const isCommit = cmd.includes('commit');
    const isPush = cmd.includes('push');
    const isPull = cmd.includes('pull') || cmd.includes('fetch');
    return {
        nodes: [true, isAdd || isCommit || isPush, isCommit || isPush, isPush || isPull],
        connections: [isAdd || isCommit || isPush, isCommit || isPush, isPush || isPull],
    };
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const NODE_CFG = [
    { color: '#94a3b8', glow: 'rgba(148,163,184,0.5)', bg: 'rgba(148,163,184,0.07)' },
    { color: '#22d3ee', glow: 'rgba(34,211,238,0.55)', bg: 'rgba(34,211,238,0.09)' },
    { color: '#a78bfa', glow: 'rgba(167,139,250,0.55)', bg: 'rgba(167,139,250,0.09)' },
    { color: '#f472b6', glow: 'rgba(244,114,182,0.55)', bg: 'rgba(244,114,182,0.09)' },
];
const CONN_CFG = [
    { color: '#22d3ee', glow: 'rgba(34,211,238,1)' },
    { color: '#a78bfa', glow: 'rgba(167,139,250,1)' },
    { color: '#f472b6', glow: 'rgba(244,114,182,1)' },
];
const ICONS = [
    <FileCode size={20} strokeWidth={1.5} />,
    <Layers size={20} strokeWidth={1.5} />,
    <Database size={20} strokeWidth={1.5} />,
    <Cloud size={20} strokeWidth={1.5} />,
];
const LABELS_ES = ['Working Dir', 'Staging Area', 'Local Repo', 'Remote'];

// ─── CSS injected once ────────────────────────────────────────────────────────
const STYLES = `
@keyframes gfv-packet {
    0%   { transform: translateX(-6px) translateY(-50%); opacity: 0; }
    6%   { opacity: 1; }
    94%  { opacity: 1; }
    100% { transform: translateX(calc(var(--w) + 6px)) translateY(-50%); opacity: 0; }
}
@keyframes gfv-shimmer {
    0%   { transform: translateX(-120%); }
    100% { transform: translateX(220%); }
}
@keyframes gfv-ring {
    0%   { opacity: 0.5; transform: scale(1); }
    80%  { opacity: 0; transform: scale(1.4); }
    100% { opacity: 0; transform: scale(1.4); }
}
@keyframes gfv-dot {
    0%, 100% { transform: scale(1);   opacity: 0.5; }
    50%      { transform: scale(1.5); opacity: 1;   }
}
`;

// ─── FlowNode ─────────────────────────────────────────────────────────────────
const FlowNode: React.FC<{ icon: React.ReactNode; label: string; active: boolean; idx: number }> = ({
    icon, label, active, idx,
}) => {
    const c = NODE_CFG[idx];
    const [in_, setIn] = useState(false);
    useEffect(() => { const t = setTimeout(() => setIn(true), idx * 90 + 50); return () => clearTimeout(t); }, [idx]);

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            width: 72, flexShrink: 0,
            opacity: in_ ? 1 : 0,
            transform: in_ ? 'none' : 'translateY(6px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}>
            {/* Icon box */}
            <div style={{
                position: 'relative',
                width: 58, height: 58, borderRadius: 15,
                border: `1.5px solid ${active ? c.color : 'rgba(255,255,255,0.07)'}`,
                background: active ? c.bg : 'rgba(255,255,255,0.025)',
                boxShadow: active
                    ? `0 0 0 1px ${c.color}22, 0 0 22px 2px ${c.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`
                    : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: active ? c.color : 'rgba(255,255,255,0.2)',
                transform: active ? 'scale(1.09)' : 'scale(1)',
                transition: 'all 0.45s cubic-bezier(0.34,1.4,0.64,1)',
                overflow: 'hidden',
            }}>
                {/* Shimmer */}
                {active && (
                    <div style={{
                        position: 'absolute', inset: 0, borderRadius: 'inherit',
                        background: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.06) 50%, transparent 75%)',
                        animation: 'gfv-shimmer 2.2s 0.2s ease-in-out infinite',
                    }} />
                )}
                {/* Ring pulse */}
                {active && (
                    <div style={{
                        position: 'absolute', inset: -5, borderRadius: 20,
                        border: `1px solid ${c.color}`,
                        animation: 'gfv-ring 2.1s ease-out infinite',
                        pointerEvents: 'none',
                    }} />
                )}
                <div style={{ position: 'relative', zIndex: 1 }}>{icon}</div>
            </div>

            {/* Label */}
            <span style={{
                fontSize: 10, fontFamily: '"JetBrains Mono", monospace',
                fontWeight: active ? 700 : 400, letterSpacing: '0.07em',
                color: active ? c.color : 'rgba(255,255,255,0.25)',
                textShadow: active ? `0 0 12px ${c.glow}` : 'none',
                transition: 'all 0.4s ease', whiteSpace: 'nowrap', textAlign: 'center',
            }}>{label}</span>

            {/* Status dot */}
            <div style={{
                width: 4, height: 4, borderRadius: '50%',
                background: active ? c.color : 'rgba(255,255,255,0.1)',
                boxShadow: active ? `0 0 6px 2px ${c.glow}` : 'none',
                transition: 'all 0.4s ease',
                animation: active ? 'gfv-dot 1.8s ease-in-out infinite' : 'none',
            }} />
        </div>
    );
};

// ─── Connection ───────────────────────────────────────────────────────────────
const Connection: React.FC<{ active: boolean; idx: number }> = ({ active, idx }) => {
    const c = CONN_CFG[idx];
    const ref = useRef<HTMLDivElement>(null);
    const [w, setW] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ro = new ResizeObserver(() => setW(el.offsetWidth));
        ro.observe(el);
        setW(el.offsetWidth);
        return () => ro.disconnect();
    }, []);

    const PARTICLE_DURATION = 1.5; // seconds
    const PARTICLE_COUNT = 3;

    return (
        <div
            ref={ref}
            style={{
                flex: 1, position: 'relative', height: 2,
                marginTop: 28,   // half of box height (58px) minus half of line (1px) = centers line on box
                marginLeft: 8, marginRight: 8,
                alignSelf: 'auto',
                ['--w' as string]: `${w}px`,
            }}
        >
            {/* Base track */}
            <div style={{
                position: 'absolute', inset: 0, borderRadius: 99,
                background: 'rgba(255,255,255,0.05)',
            }} />

            {/* Active glow track */}
            <div style={{
                position: 'absolute', inset: 0, borderRadius: 99,
                background: `linear-gradient(90deg, transparent, ${c.color}60, transparent)`,
                opacity: active ? 1 : 0,
                transform: active ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'opacity 0.5s ease, transform 0.6s ease',
            }} />

            {/* Particles — clipped to this element */}
            {active && w > 0 && Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        width: 7, height: 7,
                        borderRadius: '50%',
                        background: c.color,
                        boxShadow: `0 0 6px 3px ${c.glow}`,
                        animation: `gfv-packet ${PARTICLE_DURATION}s ${(i * PARTICLE_DURATION / PARTICLE_COUNT).toFixed(2)}s linear infinite`,
                        pointerEvents: 'none',
                        zIndex: 5,
                        // Clip glow visually by fading at edges via opacity
                    }}
                />
            ))}
        </div>
    );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const GitFlowVisualizer: React.FC<GitFlowVisualizerProps> = ({ command, language }) => {
    const cmdStr = typeof command === 'string' ? command : command.windows;
    const { nodes, connections } = getActiveState(cmdStr);
    const labels = LABELS_ES; // same in both languages for now

    return (
        <>
            <style>{STYLES}</style>
            <div style={{
                width: '100%', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                padding: '28px 20px', userSelect: 'none',
            }}>
                <div style={{
                    display: 'flex', alignItems: 'flex-start',
                    width: '100%', maxWidth: 600,
                }}>
                    {ICONS.map((icon, i) => (
                        <React.Fragment key={i}>
                            <FlowNode icon={icon} label={labels[i]} active={nodes[i]} idx={i} />
                            {i < 3 && <Connection active={connections[i]} idx={i} />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    );
};

export default GitFlowVisualizer;