import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Terminal, RotateCcw, Play } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { OsCommand, Language } from '../types';
import { playSfx } from '../utils/soundEngine';

interface TerminalWindowProps {
    command: string | OsCommand;
    stepId: number;
    category: string;
    language: Language;
    onComplete: () => void;
}

type OsType = 'windows' | 'linux';

const TerminalWindow: React.FC<TerminalWindowProps> = ({ command, stepId, language, onComplete }) => {
    const [activeOs, setActiveOs] = useState<OsType>('windows');
    const cmdString = typeof command === 'string'
        ? command
        : (command[activeOs === 'windows' ? 'windows' : 'linux'] ?? '');

    const [typed, setTyped] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [typed, isCompleted]);

    // Typing animation
    useEffect(() => {
        setTyped('');
        setIsCompleted(false);
        let i = 0;
        const iv = setInterval(() => {
            if (i <= cmdString.length) {
                setTyped(cmdString.slice(0, i));
                i++;
                if (i % 4 === 0 && typeof playSfx !== 'undefined') playSfx.typing();
            } else {
                clearInterval(iv);
                setIsCompleted(true);
                onComplete();
                if (typeof playSfx !== 'undefined') playSfx.success();
            }
        }, 35);
        return () => clearInterval(iv);
    }, [cmdString, stepId]);

    const handleCopy = () => {
        navigator.clipboard.writeText(cmdString);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleReplay = () => {
        setTyped('');
        setIsCompleted(false);
    };

    const getPrompt = () => activeOs === 'windows'
        ? <span style={{ color: '#3b8eea', userSelect: 'none', marginRight: 8, flexShrink: 0 }}>PS C:\Dev\Project&gt;</span>
        : <span style={{ color: '#4ade80', userSelect: 'none', marginRight: 8, flexShrink: 0 }}>user@dev:~$</span>;

    const getFakeOutput = (cmd: string) => {
        if (!cmd) return null;
        if (cmd.includes('git init')) return <div style={{ color: '#6b7280', marginTop: 4, fontStyle: 'italic' }}>Initialized empty Git repository in ~/project/.git/</div>;
        if (cmd.includes('git status')) return <div style={{ color: '#6b7280', marginTop: 4 }}>On branch main<br />nothing to commit, working tree clean</div>;
        if (cmd.includes('commit')) return <div style={{ color: '#6b7280', marginTop: 4 }}>[main abc1234] {cmd.split('-m')[1]?.replace(/['"]/g, '').trim() || 'update'}<br />1 file changed, 1 insertion(+)</div>;
        if (cmd.includes('push')) return <div style={{ color: '#6b7280', marginTop: 4 }}>Branch 'main' set up to track remote branch 'main' from 'origin'.<br />Everything up-to-date</div>;
        return null;
    };

    return (
        <div style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            background: '#141414',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 13,
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}>

            {/* ── Title bar ─────────────────────────────────────────────── */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px',
                background: '#1c1c1c',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                flexShrink: 0,
            }}>
                {/* Left: dots + title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                        <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f56' }} />
                        <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e' }} />
                        <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#27c93f' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>
                        <Terminal size={11} />
                        <span>bash — 80×24</span>
                    </div>
                </div>

                {/* Right: OS toggle + actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {/* OS toggle */}
                    <div style={{
                        display: 'flex', background: '#0d0d0d',
                        borderRadius: 7, padding: 2,
                        border: '1px solid rgba(255,255,255,0.07)',
                    }}>
                        {(['windows', 'linux'] as OsType[]).map(os => (
                            <button
                                key={os}
                                onClick={() => setActiveOs(os)}
                                style={{
                                    padding: '2px 10px', borderRadius: 5,
                                    fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
                                    border: 'none', cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    background: activeOs === os
                                        ? (os === 'windows' ? '#3b8eea' : '#ffbd2e')
                                        : 'transparent',
                                    color: activeOs === os
                                        ? (os === 'windows' ? '#fff' : '#000')
                                        : 'rgba(255,255,255,0.35)',
                                }}
                            >
                                {os === 'windows' ? 'WIN' : 'LINUX'}
                            </button>
                        ))}
                    </div>

                    <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.1)' }} />

                    <button onClick={handleReplay} title="Replay"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', padding: 4, borderRadius: 5, display: 'flex', alignItems: 'center' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                    >
                        <RotateCcw size={13} />
                    </button>
                    <button onClick={handleCopy} title="Copy"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: isCopied ? '#4ade80' : 'rgba(255,255,255,0.35)', padding: 4, borderRadius: 5, display: 'flex', alignItems: 'center' }}
                        onMouseEnter={e => { if (!isCopied) e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { if (!isCopied) e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
                    >
                        {isCopied ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                </div>
            </div>

            {/* ── Terminal body ──────────────────────────────────────────── */}
            <div
                ref={scrollRef}
                style={{
                    flex: 1, overflowY: 'auto', padding: '16px 18px',
                    background: '#141414',
                    minHeight: 160,
                }}
            >
                {/* Active command line */}
                <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {getPrompt()}
                    <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
                        <SyntaxHighlighter
                            language="bash"
                            style={atomDark}
                            customStyle={{
                                background: 'transparent', padding: 0, margin: 0,
                                display: 'inline', fontSize: 'inherit',
                                lineHeight: '1.6', whiteSpace: 'pre-wrap', wordBreak: 'break-all',
                            }}
                            codeTagProps={{ style: { fontFamily: 'inherit' } }}
                        >
                            {typed || ' '}
                        </SyntaxHighlighter>
                        {!isCompleted && (
                            <span style={{
                                display: 'inline-block', width: 9, height: 18,
                                background: 'rgba(255,255,255,0.7)',
                                verticalAlign: 'middle', marginLeft: 1,
                                animation: 'term-blink 1s step-end infinite',
                            }} />
                        )}
                    </div>
                </div>

                {/* Output */}
                {isCompleted && (
                    <div style={{ marginTop: 4, animation: 'term-fadein 0.3s ease forwards' }}>
                        {getFakeOutput(cmdString)}
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                            {getPrompt()}
                            <span style={{
                                display: 'inline-block', width: 9, height: 18,
                                background: 'rgba(255,255,255,0.7)',
                                verticalAlign: 'middle',
                                animation: 'term-blink 1s step-end infinite',
                            }} />
                        </div>
                    </div>
                )}
            </div>

            {/* ── Mobile quick-action bar ────────────────────────────────── */}
            <div style={{
                display: 'none', // shown via media query below
                borderTop: '1px solid rgba(255,255,255,0.06)',
                background: '#1c1c1c',
                padding: '8px 12px',
                flexShrink: 0,
            }} className="term-mobile-bar">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                        Quick Actions
                    </span>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={handleCopy} style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.7)', borderRadius: 7,
                            padding: '5px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                        }}>
                            <Copy size={11} /> Copy
                        </button>
                        {isCompleted ? (
                            <button disabled style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)',
                                color: '#4ade80', borderRadius: 7,
                                padding: '5px 12px', fontSize: 11, fontWeight: 700, cursor: 'default',
                            }}>
                                <Check size={11} /> Done
                            </button>
                        ) : (
                            <button onClick={() => { setTyped(cmdString); setIsCompleted(true); onComplete(); }} style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                background: '#3b8eea', border: 'none',
                                color: '#fff', borderRadius: 7,
                                padding: '5px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                            }}>
                                <Play size={10} fill="currentColor" /> Run
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Keyframes */}
            <style>{`
                @keyframes term-blink  { 0%,100%{opacity:1} 50%{opacity:0} }
                @keyframes term-fadein { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:none} }
                @media (max-width: 768px) { .term-mobile-bar { display: block !important; } }
            `}</style>
        </div>
    );
};

export default TerminalWindow;