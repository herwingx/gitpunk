import React from 'react';
import { X, Terminal, Database, Shield } from 'lucide-react';
import { CHEAT_SHEET_DATA, UI_TEXT } from '../constants';
import { Language } from '../types';

interface CommandMatrixProps {
    isOpen: boolean;
    onClose: () => void;
    language: Language;
}

const CommandMatrix: React.FC<CommandMatrixProps> = ({ isOpen, onClose, language }) => {
    if (!isOpen) return null;

    const data = CHEAT_SHEET_DATA[language];
    const ui = UI_TEXT[language];

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in-up" 
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="bg-cyber-panel border border-cyber-cyan/30 rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden relative shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col animate-scale-in">
                
                {/* Header */}
                <div className="p-5 border-b border-cyber-border bg-cyber-bg/95 flex justify-between items-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-cyan opacity-50 animate-shimmer"></div>
                    
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyber-cyan/10 rounded-lg border border-cyber-cyan/30">
                            <Database size={20} className="text-cyber-cyan" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold font-display text-cyber-text tracking-wide">{ui.matrixTitle}</h2>
                            <p className="text-[10px] text-cyber-muted font-mono uppercase tracking-widest">ACCESS_LEVEL: UNRESTRICTED</p>
                        </div>
                    </div>

                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-cyber-text/10 rounded-full transition-colors text-cyber-muted hover:text-cyber-text"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content Grid */}
                <div className="p-6 overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-cyber-bg/50">
                    {data.map((section, idx) => (
                        <div key={idx} className="bg-cyber-panel border border-cyber-border rounded-xl overflow-hidden group hover:border-cyber-cyan/30 transition-all duration-300">
                            <div className="bg-cyber-bg px-4 py-2 border-b border-cyber-border flex items-center justify-between">
                                <span className="font-display font-bold text-cyber-purple text-xs uppercase tracking-wider flex items-center gap-2">
                                    <Shield size={10} />
                                    {section.category}
                                </span>
                                <span className="text-[9px] text-cyber-muted font-mono">SEC_0{idx+1}</span>
                            </div>
                            <div className="p-3 space-y-3">
                                {section.commands.map((item, cIdx) => (
                                    <div key={cIdx} className="group/cmd">
                                        <div className="font-mono text-xs text-cyber-cyan bg-cyber-bg px-2 py-1.5 rounded border border-transparent group-hover/cmd:border-cyber-cyan/20 group-hover/cmd:bg-cyber-cyan/5 transition-all mb-1 select-all">
                                            $ {item.cmd}
                                        </div>
                                        <div className="text-[10px] text-cyber-muted pl-2 border-l border-cyber-border">
                                            {item.desc}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Decor */}
                <div className="p-3 bg-cyber-bg border-t border-cyber-border flex justify-between items-center text-[10px] text-cyber-muted font-mono">
                    <div className="flex items-center gap-2">
                         <span className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-pulse"></span>
                         DATABASE_CONNECTED
                    </div>
                    <div>V.2.0.77</div>
                </div>
            </div>
        </div>
    );
};

export default CommandMatrix;