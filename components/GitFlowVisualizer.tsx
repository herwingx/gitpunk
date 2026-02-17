import React from 'react';
import { Database, HardDrive, ArrowRight, Cloud, FileCode, Layers } from 'lucide-react';
import { Language, OsCommand } from '../types';

interface GitFlowVisualizerProps {
    command: string | OsCommand;
    language: Language;
}

const GitFlowVisualizer: React.FC<GitFlowVisualizerProps> = ({ command, language }) => {
    // Determine active flow based on command string
    const cmd = typeof command === 'string' ? command : command.windows;
    
    const isAdd = cmd.includes('add');
    const isCommit = cmd.includes('commit');
    const isPush = cmd.includes('push');
    const isPull = cmd.includes('pull');
    const isInit = cmd.includes('init');
    
    // Labels
    const labels = {
        work: language === 'es' ? 'Trabajo' : 'Work Dir',
        stage: language === 'es' ? 'Stage' : 'Stage',
        local: language === 'es' ? 'Repo Local' : 'Local Repo',
        remote: language === 'es' ? 'GitHub' : 'Remote',
    };

    const getNodeStyle = (active: boolean) => 
        `flex flex-col items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl border transition-all duration-500 relative z-10 bg-cyber-panel ${
            active 
            ? 'border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-110' 
            : 'border-cyber-border text-cyber-muted'
        }`;

    const getArrowStyle = (active: boolean) => 
        `flex-1 h-0.5 mx-1 relative transition-all duration-500 ${
            active ? 'bg-cyber-cyan' : 'bg-cyber-border'
        }`;
        
    const nodeWrapperClass = "flex flex-col items-center gap-2 z-20 w-16 md:w-20 shrink-0";

    return (
        <div className="w-full h-full flex items-center justify-center p-0 md:p-2 relative rounded-lg">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.05]" 
                 style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
            </div>

            <div className="flex items-center justify-between w-full max-w-lg mx-auto relative">
                
                {/* 1. Working Directory */}
                <div className={nodeWrapperClass}>
                    <div className={getNodeStyle(isAdd || isInit)}>
                        <FileCode size={20} className="md:w-7 md:h-7" />
                    </div>
                    <span className={`text-[9px] md:text-[11px] font-mono font-bold tracking-wider text-center w-full truncate ${isAdd ? 'text-cyber-cyan' : 'text-cyber-muted'}`}>
                        {labels.work}
                    </span>
                </div>

                {/* Arrow 1 */}
                <div className={getArrowStyle(isAdd)}>
                    {isAdd && (
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-cyber-cyan rounded-full animate-flow-right shadow-[0_0_10px_#06b6d4]"></div>
                    )}
                </div>

                {/* 2. Staging Area */}
                <div className={nodeWrapperClass}>
                    <div className={getNodeStyle(isAdd || isCommit)}>
                        <Layers size={20} className="md:w-7 md:h-7" />
                    </div>
                    <span className={`text-[9px] md:text-[11px] font-mono font-bold tracking-wider text-center w-full truncate ${isAdd || isCommit ? 'text-cyber-cyan' : 'text-cyber-muted'}`}>
                        {labels.stage}
                    </span>
                </div>

                {/* Arrow 2 */}
                <div className={getArrowStyle(isCommit)}>
                    {isCommit && (
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-cyber-cyan rounded-full animate-flow-right shadow-[0_0_10px_#06b6d4]"></div>
                    )}
                </div>

                {/* 3. Local Repo */}
                <div className={nodeWrapperClass}>
                    <div className={getNodeStyle(isCommit || isPush)}>
                        <HardDrive size={20} className="md:w-7 md:h-7" />
                    </div>
                    <span className={`text-[9px] md:text-[11px] font-mono font-bold tracking-wider text-center w-full truncate ${isCommit || isPush ? 'text-cyber-cyan' : 'text-cyber-muted'}`}>
                        {labels.local}
                    </span>
                </div>

                {/* Arrow 3 */}
                <div className={getArrowStyle(isPush)}>
                    {isPush && (
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-cyber-cyan rounded-full animate-flow-right shadow-[0_0_10px_#06b6d4]"></div>
                    )}
                </div>

                {/* 4. Remote */}
                <div className={nodeWrapperClass}>
                    <div className={getNodeStyle(isPush)}>
                        <Cloud size={20} className="md:w-7 md:h-7" />
                    </div>
                    <span className={`text-[9px] md:text-[11px] font-mono font-bold tracking-wider text-center w-full truncate ${isPush ? 'text-cyber-cyan' : 'text-cyber-muted'}`}>
                        {labels.remote}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default GitFlowVisualizer;