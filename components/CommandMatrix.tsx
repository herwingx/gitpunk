import React, { useState } from 'react';
import { X, BookOpen, Copy, Check } from 'lucide-react';
import { CHEAT_SHEET_DATA, UI_TEXT } from '../constants';
import { Language } from '../types';

interface CommandMatrixProps {
    isOpen: boolean;
    onClose: () => void;
    language: Language;
}

// Color per category index — cycles through the git semantic palette
const CATEGORY_COLORS = [
    { text: 'text-cyber-primary', bg: 'bg-cyber-primary/10', border: 'border-cyber-primary/20' },
    { text: 'text-cyber-staging', bg: 'bg-cyber-staging/10', border: 'border-cyber-staging/20' },
    { text: 'text-cyber-repo', bg: 'bg-cyber-repo/10', border: 'border-cyber-repo/20' },
    { text: 'text-cyber-remote', bg: 'bg-cyber-remote/10', border: 'border-cyber-remote/20' },
    { text: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
    { text: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
    { text: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/20' },
    { text: 'text-sky-400', bg: 'bg-sky-400/10', border: 'border-sky-400/20' },
];

const CommandMatrix: React.FC<CommandMatrixProps> = ({ isOpen, onClose, language }) => {
    const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

    if (!isOpen) return null;

    const data = CHEAT_SHEET_DATA[language];
    const ui = UI_TEXT[language];

    const handleCopy = (cmd: string) => {
        navigator.clipboard.writeText(cmd).then(() => {
            setCopiedCmd(cmd);
            setTimeout(() => setCopiedCmd(null), 1800);
        });
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/75 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-5xl max-h-[88vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-cyber-border/60"
                style={{ background: 'var(--bg-panel)' }}>

                {/* ── Header ── */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-cyber-border/50 shrink-0"
                    style={{ background: 'var(--bg-primary)' }}>

                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyber-primary via-cyber-repo to-cyber-staging opacity-70" />

                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-cyber-primary/15 border border-cyber-primary/30 flex items-center justify-center">
                            <BookOpen size={17} className="text-cyber-primary" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold font-display text-cyber-text tracking-wide leading-none">
                                {ui.matrixTitle}
                            </h2>
                            <p className="text-[10px] text-cyber-muted font-mono uppercase tracking-widest mt-0.5 opacity-70">
                                {language === 'es' ? 'Referencia rápida de comandos Git' : 'Git command quick reference'}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-cyber-text/10 transition-colors text-cyber-muted hover:text-cyber-text"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* ── Grid ── */}
                <div className="overflow-y-auto custom-scrollbar p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data.map((section, idx) => {
                        const color = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
                        return (
                            <div
                                key={idx}
                                className={`rounded-xl border overflow-hidden flex flex-col ${color.border}`}
                                style={{ background: 'var(--bg-primary)' }}
                            >
                                {/* Category header */}
                                <div className={`px-3 py-2 border-b ${color.border} ${color.bg} flex items-center justify-between`}>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${color.text}`}>
                                        {section.category}
                                    </span>
                                    <span className="text-[9px] text-cyber-muted font-mono opacity-50">
                                        {section.commands.length} cmds
                                    </span>
                                </div>

                                {/* Commands */}
                                <div className="p-2.5 space-y-1.5 flex-1">
                                    {section.commands.map((item, cIdx) => (
                                        <div
                                            key={cIdx}
                                            className="group/cmd rounded-lg p-2 hover:bg-cyber-border/20 transition-all cursor-pointer"
                                            onClick={() => handleCopy(item.cmd)}
                                            title={language === 'es' ? 'Clic para copiar' : 'Click to copy'}
                                        >
                                            <div className="flex items-start justify-between gap-1.5 mb-0.5">
                                                <code className={`text-[11px] font-mono font-semibold leading-snug ${color.text} break-all`}>
                                                    {item.cmd}
                                                </code>
                                                <span className="shrink-0 opacity-0 group-hover/cmd:opacity-100 transition-opacity mt-0.5">
                                                    {copiedCmd === item.cmd
                                                        ? <Check size={11} className="text-green-400" />
                                                        : <Copy size={11} className="text-cyber-muted" />
                                                    }
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-cyber-muted leading-snug pl-0">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── Footer ── */}
                <div className="px-5 py-2.5 border-t border-cyber-border/40 flex items-center justify-between shrink-0"
                    style={{ background: 'var(--bg-primary)' }}>
                    <div className="flex items-center gap-2 text-[10px] text-cyber-muted font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                        {language === 'es' ? 'Clic en cualquier comando para copiarlo' : 'Click any command to copy it'}
                    </div>
                    <span className="text-[10px] text-cyber-muted font-mono opacity-40">
                        {data.reduce((acc, s) => acc + s.commands.length, 0)} {language === 'es' ? 'comandos' : 'commands'}
                    </span>
                </div>

            </div>
        </div>
    );
};

export default CommandMatrix;