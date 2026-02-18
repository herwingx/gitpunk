import React, { useState, useRef, useEffect } from 'react';
import { generateAiResponse } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { UI_TEXT } from '../constants';
import { MessageSquare, Send, X, Bot, Activity, Wifi, Terminal, Sparkles, Cpu, ChevronDown } from 'lucide-react';

type SystemStatus = 'online' | 'processing' | 'overload' | 'offline';

interface AiChatProps {
    language: Language;
}

// --- MESSAGE FORMATTER ---
const FormattedMessage: React.FC<{ text: string }> = ({ text }) => {
    const parts = text.split(/(```[\w-]*\n[\s\S]*?```)/g);
    return (
        <div className="space-y-2 text-sm">
            {parts.map((part, index) => {
                // Code Block Rendering
                if (part.startsWith('```')) {
                    const match = part.match(/```([\w-]*)\n([\s\S]*?)```/);
                    const lang = match ? match[1] : '';
                    const code = match ? match[2] : part.replace(/```/g, '');
                    return (
                        <div key={index} className="my-3 rounded-lg overflow-hidden border border-white/10 bg-[#0d1117] shadow-xl group">
                            <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/5">
                                <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                                    <Terminal size={12} />
                                    <span className="uppercase">{lang || 'BASH'}</span>
                                </div>
                                <div className="flex gap-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                            </div>
                            <pre className="p-3 overflow-x-auto custom-scrollbar text-xs font-mono text-cyan-300 leading-relaxed whitespace-pre-wrap">
                                <code>{code.trim()}</code>
                            </pre>
                        </div>
                    );
                }
                // Standard Text with Markdown-like bold/code
                return (
                    <p key={index} className="whitespace-pre-wrap leading-relaxed">
                        {part.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((subPart, subIndex) => {
                            if (subPart.startsWith('`') && subPart.endsWith('`')) {
                                return (
                                    <code key={subIndex} className="bg-cyber-primary/20 text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono border border-cyber-primary/30 mx-0.5">
                                        {subPart.slice(1, -1)}
                                    </code>
                                );
                            }
                            if (subPart.startsWith('**') && subPart.endsWith('**')) {
                                return <strong key={subIndex} className="font-bold text-white">{subPart.slice(2, -2)}</strong>;
                            }
                            return subPart;
                        })}
                    </p>
                );
            })}
        </div>
    );
};

const AiChat: React.FC<AiChatProps> = ({ language }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [systemStatus, setSystemStatus] = useState<SystemStatus>('online');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const ui = UI_TEXT[language]?.chat || {
        welcome: "Sistema listo. ¿En qué te ayudo con Git?",
        status: { online: "ONLINE", processing: "THINKING", overload: "HIGH TRAFFIC", offline: "OFFLINE" },
        placeholder: "Escribe tu duda sobre Git...",
        placeholderOverload: "Sistema saturado...",
        linkStable: "Stable",
        linkUnstable: "Unstable",
        linkBusy: "Busy"
    };

    // Initialize Welcome
    useEffect(() => {
        if (messages.length === 0) setMessages([{ role: 'model', text: ui.welcome }]);
    }, [language]);

    // Scroll Logic
    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(() => scrollToBottom(), [messages, isOpen, isLoading]);

    // Status Auto-Reset
    useEffect(() => {
        if (systemStatus === 'overload') {
            const timer = setTimeout(() => setSystemStatus('online'), 8000);
            return () => clearTimeout(timer);
        }
    }, [systemStatus]);

    // Send Logic
    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput('');
        setIsLoading(true);
        setSystemStatus('processing');
        playSfx.click(); // Optional sound hook if imported

        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);

        try {
            const response = await generateAiResponse(userMessage, language);

            if (response.startsWith('⚠️')) setSystemStatus('overload');
            else setSystemStatus('online');

            setMessages(prev => [...prev, { role: 'model', text: response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: "Error connection to mainframe." }]);
            setSystemStatus('offline');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // UI Helpers
    const getStatusColor = () => {
        switch (systemStatus) {
            case 'online': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            case 'processing': return 'text-amber-400 bg-amber-500/10 border-amber-500/20 animate-pulse';
            case 'overload': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
            default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
        }
    };

    const getStatusText = () => {
        switch (systemStatus) {
            case 'online': return ui.status.online;
            case 'processing': return ui.status.processing;
            case 'overload': return ui.status.overload;
            default: return ui.status.offline;
        }
    };

    return (
        <>
            {/* FLOATING TRIGGER BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full transition-all duration-500 shadow-2xl backdrop-blur-sm group
                    ${isOpen
                        ? 'bg-rose-500 rotate-90 scale-90 opacity-0 pointer-events-none'
                        : 'bg-white text-black border-2 border-transparent hover:scale-105' // White/Light mode button
                    } dark:bg-cyber-panel dark:text-white dark:border dark:border-white/10 dark:shadow-cyan-900/20`}
            >
                {/* Glow effect in Dark Mode */}
                <div className="absolute inset-0 rounded-full dark:bg-cyan-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center">
                    <Sparkles size={22} className="group-hover:text-cyan-400 transition-colors" />
                </div>
            </button>

            {/* CHAT WINDOW */}
            <div
                className={`fixed bottom-6 right-6 w-[92vw] md:w-[400px] h-[600px] max-h-[75vh] 
                    glass-panel flex flex-col overflow-hidden rounded-2xl z-40 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) origin-bottom-right
                    shadow-2xl shadow-black/50
                    ${isOpen
                        ? 'scale-100 opacity-100 translate-y-0'
                        : 'scale-75 opacity-0 translate-y-12 pointer-events-none'}`}
            >
                {/* 1. Header */}
                <div className="h-16 px-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${getStatusColor()}`}>
                            {systemStatus === 'processing' ? <Cpu size={20} className="animate-spin-slow" /> : <Bot size={20} />}
                        </div>
                        <div className="flex flex-col justify-center h-full">
                            <span className="font-display font-bold text-white text-sm leading-tight">AI Assistant</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${systemStatus === 'online' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                                <span className="text-[10px] font-mono font-medium text-cyber-muted tracking-wide uppercase opacity-80">{getStatusText()}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg text-cyber-muted hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <ChevronDown size={20} />
                    </button>
                </div>

                {/* 2. Messages Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex flex-col max-w-[90%] ${msg.role === 'user' ? 'ml-auto items-end' : 'items-start'} animate-fade-in-up`}>

                            <div className={`p-4 text-sm relative shadow-md backdrop-blur-sm 
                                ${msg.role === 'user'
                                    ? 'bg-cyber-primary text-white rounded-2xl rounded-tr-sm border border-cyber-primary/50'
                                    : 'bg-white/5 text-cyber-text rounded-2xl rounded-tl-sm border border-white/10'
                                }`}>
                                <FormattedMessage text={msg.text} />
                            </div>

                            <span className="text-[9px] font-mono text-cyber-muted mt-1 px-1 opacity-50">
                                {msg.role === 'user' ? 'YOU' : 'SYSTEM'} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    ))}

                    {/* Loading Bubble */}
                    {isLoading && (
                        <div className="flex items-start max-w-[80%] animate-fade-in-up">
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-cyber-text/40 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-cyber-text/40 rounded-full animate-bounce delay-150"></span>
                                <span className="w-1.5 h-1.5 bg-cyber-text/40 rounded-full animate-bounce delay-300"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* 3. Input Area */}
                <div className="p-4 bg-white/[0.02] border-t border-white/5 backdrop-blur-xl">
                    <div className="relative group">
                        {/* Input Glow */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-primary via-purple-500 to-pink-500 rounded-xl opacity-0 group-focus-within:opacity-20 transition-opacity duration-500 blur"></div>

                        <div className="relative flex items-center bg-[#050505] rounded-xl border border-white/10 focus-within:border-cyber-primary/40 transition-colors">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                disabled={isLoading || systemStatus === 'overload'}
                                placeholder={systemStatus === 'overload' ? ui.placeholderOverload : ui.placeholder}
                                className="w-full bg-transparent py-3 pl-4 pr-12 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none disabled:opacity-50 font-sans"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className={`absolute right-2 p-1.5 rounded-lg transition-all 
                                    ${input.trim()
                                        ? 'text-white bg-cyber-primary hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 scale-100'
                                        : 'text-gray-600 scale-90'
                                    }`}
                            >
                                <Send size={16} fill={input.trim() ? "currentColor" : "none"} />
                            </button>
                        </div>
                    </div>

                    {/* Connection Footer */}
                    <div className="flex justify-center items-center gap-2 mt-3 opacity-40 hover:opacity-100 transition-opacity">
                        <Wifi size={10} className={systemStatus === 'online' ? 'text-green-500' : 'text-red-500'} />
                        <span className="text-[9px] font-mono tracking-widest text-cyber-muted uppercase">
                            NET: {systemStatus} {isLoading ? '// UPLOADING' : '// IDLE'}
                        </span>
                    </div>
                </div>

            </div>
        </>
    );
};

// Add explicit import needed inside component in legacy env
import { playSfx } from '../utils/soundEngine'; // Ensure import is present or keep playing handled carefully

export default AiChat;