import React, { useEffect, useState, useRef } from 'react';
import { OsCommand, Language } from '../types';
import { UI_TEXT } from '../constants';
import { Terminal, Laptop, Server, Copy, Check, Info, Lock } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { playSfx } from '../utils/soundEngine';

interface TerminalWindowProps {
    command: string | OsCommand;
    stepId: number;
    category?: string;
    language: Language;
    onComplete: () => void;
}

type OsType = 'windows' | 'linux';
type ExecStatus = 'typing' | 'completed';

const TerminalWindow: React.FC<TerminalWindowProps> = ({ command, stepId, category, language, onComplete }) => {
    const [displayedCommand, setDisplayedCommand] = useState('');
    const [status, setStatus] = useState<ExecStatus>('typing');
    const [activeOs, setActiveOs] = useState<OsType>('windows');
    const [copied, setCopied] = useState(false);
    
    // Refs for cleanup
    const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    const isIntro = category === UI_TEXT[language].terminal.headerIntro || category === "CONCEPTOS CLAVE" || category === "KEY CONCEPTS"; 
    const isMultiOs = typeof command !== 'string';
    const currentCommandString = isMultiOs ? (command as OsCommand)[activeOs] : (command as string);
    const ui = UI_TEXT[language].terminal;

    // Determine syntax highlighter language
    const getSyntaxLanguage = () => {
        if (isIntro) return 'text';
        if (activeOs === 'windows') return 'powershell';
        return 'bash';
    };

    // Helper to generate mock output based on command
    const getMockOutput = (cmd: string): string => {
        if (cmd.includes('git init')) return `Initialized empty Git repository in /Users/dev/CyberProfile/.git/`;
        if (cmd.includes('git status')) return `On branch main\nNo commits yet\n\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n\tindex.html`;
        if (cmd.includes('git commit')) return `[main (root-commit) 1a2b3c] ${cmd.split('-m')[1]?.replace(/"/g, '') || 'commit'}\n 1 file changed, 1 insertion(+)`;
        if (cmd.includes('git push')) return `Enumerating objects: 3, done.\nCounting objects: 100% (3/3), done.\nTo https://github.com/repo.git\n * [new branch]      main -> main`;
        if (cmd.includes('npm run build')) return `> cyber-profile@1.0.0 build\n> vite build\n\n✓ built in 1.45s`;
        if (cmd.includes('mkdir')) return '';
        if (cmd.includes('echo')) return '';
        return language === 'es' ? 'Comando ejecutado exitosamente.' : 'Command executed successfully.';
    };

    // Typing Animation Logic
    useEffect(() => {
        // Reset state on step change
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);
        
        setDisplayedCommand('');
        setStatus('typing');

        startTimeoutRef.current = setTimeout(() => {
            let i = 0;
            const fullText = currentCommandString;
            
            typingIntervalRef.current = setInterval(() => {
                if (i < fullText.length) {
                    setDisplayedCommand(fullText.substring(0, i + 1));
                    
                    // SFX: Play random typing beep every 3rd character to not be annoying
                    if (i % 3 === 0) playSfx.typing();
                    
                    i++;
                } else {
                    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
                    
                    // Automatically complete when typing finishes
                    setStatus('completed');
                    playSfx.success(); // Success chime
                    onComplete();
                }
            }, 30); 
        }, 200);

        return () => {
            if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
            if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);
        };
    }, [currentCommandString, stepId, activeOs, isIntro, onComplete]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(currentCommandString);
            playSfx.click();
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const handleOsChange = (os: OsType) => {
        playSfx.click();
        setActiveOs(os);
    }

    const promptText = isIntro 
        ? <span className="text-cyber-cyan">SYSTEM@CORE:~/CONCEPTS$</span>
        : <span>{activeOs === 'windows' ? 'PS C:\\Users\\Dev\\CyberProfile>' : 'dev@cyberdeck:~/CyberProfile$'}</span>;

    return (
        <div className="w-full mx-auto my-8 relative group" ref={terminalRef}>
            {/* Ambient Glow */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-cyber-cyan/30 to-cyber-purple/30 rounded-xl blur opacity-30 transition duration-1000 group-hover:opacity-60`}></div>
            
            <div className="relative bg-cyber-panel border border-cyber-border rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
                
                {/* Terminal Header */}
                <div className="bg-[#18181b] px-4 py-3 flex flex-col md:flex-row md:items-center justify-between border-b border-cyber-border gap-3">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50 hover:bg-yellow-500 transition-colors"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50 hover:bg-green-500 transition-colors"></div>
                        </div>
                        
                        <div className="text-xs text-cyber-muted font-mono flex items-center gap-2 opacity-60">
                            <Terminal size={12} />
                            <span>{isIntro ? ui.headerIntro : ui.headerShell}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-auto">
                        {!isIntro && (
                            <div className="flex items-center gap-3 bg-cyber-bg/20 rounded-lg p-1 border border-cyber-border/50">
                                <span className="hidden md:flex text-[10px] uppercase font-bold text-cyber-muted px-2 items-center gap-1">
                                    <Info size={10} />
                                    {activeOs === 'windows' ? ui.openWin : ui.openUnix}
                                </span>
                                <div className="flex bg-[#09090b] rounded-md p-0.5 border border-cyber-border">
                                    <button 
                                        onClick={() => handleOsChange('windows')}
                                        className={`flex items-center gap-2 px-2 py-1 rounded transition-all text-xs font-medium ${activeOs === 'windows' ? 'bg-cyber-cyan/20 text-cyber-cyan shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                        title="Windows (PowerShell)"
                                    >
                                        <Laptop size={14} />
                                        <span>Win</span>
                                    </button>
                                    <button 
                                        onClick={() => handleOsChange('linux')}
                                        className={`flex items-center gap-2 px-2 py-1 rounded transition-all text-xs font-medium ${activeOs === 'linux' ? 'bg-cyber-purple/20 text-cyber-purple shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                        title="Linux / macOS (Bash)"
                                    >
                                        <Server size={14} />
                                        <span>Mac/Linux</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {!isIntro ? (
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs text-gray-300 font-mono"
                                title={ui.copy}
                            >
                                {copied ? <Check size={14} className="text-cyber-green" /> : <Copy size={14} />}
                                <span className="hidden sm:inline">{copied ? ui.copied : ui.copy}</span>
                            </button>
                        ) : (
                             <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-xs text-gray-500 font-mono">
                                <Lock size={12} />
                                <span>{ui.readOnly}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Terminal Body - Always Dark for Code Readability */}
                <div className="p-6 font-mono text-sm md:text-base min-h-[160px] flex flex-col bg-[#0c0c10] relative">
                    
                    {/* Command Line */}
                    <div className="w-full mb-2">
                        <div className="flex gap-3 text-cyber-green mb-1 opacity-60 text-xs md:text-sm select-none">
                            {promptText}
                        </div>
                        <div className="flex flex-wrap items-center font-medium break-all relative">
                            {status !== 'typing' && <span className="mr-3 text-cyber-purple font-bold select-none">❯</span>}
                            
                            <SyntaxHighlighter
                                language={getSyntaxLanguage()}
                                style={atomDark}
                                customStyle={{
                                    background: 'transparent',
                                    padding: 0,
                                    margin: 0,
                                    lineHeight: 'inherit',
                                    fontSize: 'inherit',
                                    display: 'inline',
                                    textShadow: '0 0 10px rgba(34,211,238,0.2)' 
                                }}
                                codeTagProps={{
                                    style: { fontFamily: 'inherit' }
                                }}
                                PreTag="span"
                            >
                                {displayedCommand}
                            </SyntaxHighlighter>

                            {/* Cursor */}
                            <span className={`w-2 h-5 bg-cyber-cyan ml-1 ${status === 'typing' ? 'opacity-100' : 'animate-pulse'}`}></span>
                        </div>
                    </div>

                    {/* Output (Completed State) */}
                    {status === 'completed' && !isIntro && (
                        <div className="mt-2 animate-fade-in-up text-gray-400 text-xs md:text-sm leading-relaxed whitespace-pre-wrap opacity-80 border-l-2 border-cyber-border pl-3 ml-1">
                            {getMockOutput(currentCommandString)}
                        </div>
                    )}

                     {/* New Prompt Line (Completed State) */}
                     {status === 'completed' && (
                        <div className="mt-4 pt-2 border-t border-white/5 opacity-50 flex gap-3 text-cyber-green text-xs md:text-sm select-none">
                            {promptText}
                            <span className="w-2 h-5 bg-cyber-cyan/50"></span>
                        </div>
                    )}

                </div>
                
                {/* Mobile Helper Text */}
                {!isIntro && (
                    <div className="md:hidden px-4 pb-2 text-[10px] text-gray-500 text-center border-t border-cyber-border/20 pt-2 bg-[#18181b]">
                        {activeOs === 'windows' ? ui.mobileWin : ui.mobileUnix}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TerminalWindow;