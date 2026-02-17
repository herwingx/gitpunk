import React, { useState, useRef, useEffect } from 'react';
import { generateAiResponse } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { UI_TEXT } from '../constants';
import { MessageSquare, Send, X, Bot, Activity, Wifi, Terminal } from 'lucide-react';

type SystemStatus = 'online' | 'processing' | 'overload' | 'offline';

interface AiChatProps {
    language: Language;
}

// --- MESSAGE CONTENT FORMATTER (SAME AS BEFORE) ---
const FormattedMessage: React.FC<{ text: string }> = ({ text }) => {
    const parts = text.split(/(```[\w-]*\n[\s\S]*?```)/g);
    return (
        <div className="space-y-1">
            {parts.map((part, index) => {
                if (part.startsWith('```')) {
                    const match = part.match(/```([\w-]*)\n([\s\S]*?)```/);
                    const lang = match ? match[1] : '';
                    const code = match ? match[2] : part.replace(/```/g, '');
                    return (
                        <div key={index} className="my-3 rounded-lg overflow-hidden border border-cyber-border bg-cyber-bg shadow-lg group">
                            <div className="flex items-center justify-between px-3 py-1.5 bg-cyber-text/5 border-b border-cyber-border">
                                <div className="flex items-center gap-2">
                                    <Terminal size={10} className="text-cyber-muted" />
                                    <span className="text-[10px] text-cyber-muted font-mono uppercase tracking-wider">{lang || 'TERMINAL'}</span>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
                                </div>
                            </div>
                            <pre className="p-3 overflow-x-auto custom-scrollbar text-xs md:text-sm font-mono text-cyber-cyan leading-relaxed whitespace-pre-wrap break-words bg-[#0c0c10]">
                                <code>{code.trim()}</code>
                            </pre>
                        </div>
                    );
                }
                return (
                    <p key={index} className="whitespace-pre-wrap leading-relaxed break-words">
                        {part.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((subPart, subIndex) => {
                            if (subPart.startsWith('`') && subPart.endsWith('`')) {
                                return (
                                    <code key={subIndex} className="bg-cyber-purple/10 text-cyber-purpleGlow px-1.5 py-0.5 rounded text-xs font-mono border border-cyber-purple/20 mx-0.5">
                                        {subPart.slice(1, -1)}
                                    </code>
                                );
                            }
                            if (subPart.startsWith('**') && subPart.endsWith('**')) {
                                return <strong key={subIndex} className="font-bold">{subPart.slice(2, -2)}</strong>;
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
    
    const ui = UI_TEXT[language].chat;

    // Initialize/Update Welcome Message when language changes
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{ role: 'model', text: ui.welcome }]);
        }
    }, [language, ui.welcome]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    useEffect(() => {
        if (systemStatus === 'overload') {
            const timer = setTimeout(() => setSystemStatus('online'), 15000);
            return () => clearTimeout(timer);
        }
    }, [systemStatus]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput('');
        setIsLoading(true);
        setSystemStatus('processing');
        
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setMessages(prev => [...prev, { role: 'model', text: '', isLoading: true }]);

        // Pass language to service
        const response = await generateAiResponse(userMessage, language);

        setIsLoading(false);

        if (response.startsWith('⚠️')) {
            setSystemStatus('overload');
        } else {
            setSystemStatus('online');
        }

        setMessages(prev => {
            const newHistory = prev.filter(msg => !msg.isLoading);
            return [...newHistory, { role: 'model', text: response }];
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const getStatusColor = () => {
        switch(systemStatus) {
            case 'online': return 'text-cyber-green';
            case 'processing': return 'text-cyber-cyan animate-pulse';
            case 'overload': return 'text-cyber-red animate-pulse';
            default: return 'text-gray-500';
        }
    };

    const getStatusText = () => {
        switch(systemStatus) {
            case 'online': return ui.status.online;
            case 'processing': return ui.status.processing;
            case 'overload': return ui.status.overload;
            default: return ui.status.offline;
        }
    };

    return (
        <>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all duration-300 group ${isOpen ? 'bg-cyber-red rotate-90 scale-0 opacity-0' : 'bg-cyber-cyan text-black hover:scale-110'}`}
            >
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-cyber-cyan/50 group-hover:scale-125 transition-all duration-500"></div>
                <MessageSquare size={24} strokeWidth={2.5} />
            </button>

            <div className={`fixed bottom-6 right-6 w-[90vw] md:w-96 h-[500px] bg-cyber-panel/95 backdrop-blur-xl border border-cyber-border rounded-2xl shadow-2xl z-40 transition-all duration-500 transform origin-bottom-right flex flex-col overflow-hidden ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
                
                <div className="px-4 py-3 bg-cyber-bg/60 border-b border-cyber-border flex justify-between items-center backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className={`relative flex items-center justify-center w-8 h-8 rounded bg-cyber-text/5 border border-cyber-text/10 ${getStatusColor()}`}>
                            <Bot size={18} />
                            {systemStatus === 'processing' && (
                                <div className="absolute inset-0 border border-current rounded animate-ping opacity-20"></div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-cyber-text font-bold text-sm tracking-wide">GitPunk AI</span>
                            <div className={`flex items-center gap-1.5 text-[10px] font-mono tracking-widest ${getStatusColor()}`}>
                                <Activity size={10} />
                                <span>{getStatusText()}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-cyber-muted hover:text-cyber-text transition-colors p-1 hover:bg-cyber-text/10 rounded">
                        <X size={18} />
                    </button>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent"></div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-cyber-bg/20 to-transparent">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                            <div className={`max-w-[85%] p-3 rounded-2xl text-sm relative group ${
                                msg.role === 'user' 
                                    ? 'bg-cyber-cyan/10 text-cyber-cyan rounded-br-none border border-cyber-cyan/20' 
                                    : 'bg-cyber-bg text-cyber-text rounded-bl-none border border-cyber-border'
                            }`}>
                                {msg.isLoading ? (
                                    <div className="flex gap-1.5 items-center h-5 px-2">
                                        <span className="w-1.5 h-1.5 bg-cyber-cyan/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-1.5 h-1.5 bg-cyber-cyan/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-1.5 h-1.5 bg-cyber-cyan/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                ) : (
                                    <>
                                        <FormattedMessage text={msg.text} />
                                        <span className="absolute bottom-1 right-2 text-[8px] opacity-0 group-hover:opacity-30 transition-opacity font-mono">
                                            {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-3 bg-cyber-panel/80 border-t border-cyber-border backdrop-blur-sm">
                    <div className="relative group">
                        <div className={`absolute -inset-0.5 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500 ${systemStatus === 'overload' ? 'from-red-500 to-orange-500' : ''}`}></div>
                        <div className="relative flex items-center bg-cyber-bg rounded-xl border border-cyber-border overflow-hidden">
                             <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                disabled={isLoading || systemStatus === 'overload'}
                                placeholder={systemStatus === 'overload' ? ui.placeholderOverload : ui.placeholder}
                                className="w-full bg-transparent py-3 pl-4 pr-12 text-sm text-cyber-text focus:outline-none placeholder-cyber-muted disabled:opacity-50"
                            />
                            <button 
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading || systemStatus === 'overload'}
                                className={`absolute right-1 p-2 rounded-lg transition-all ${
                                    input.trim() && !isLoading && systemStatus !== 'overload'
                                        ? 'text-black bg-cyber-cyan hover:bg-cyber-cyanGlow shadow-[0_0_10px_rgba(6,182,212,0.4)]' 
                                        : 'text-cyber-muted'
                                }`}
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-cyber-muted justify-center font-mono">
                        <Wifi size={10} className={systemStatus === 'online' ? 'text-cyber-green' : 'text-cyber-muted'} />
                        <span>Link Status: {systemStatus === 'online' ? ui.linkStable : systemStatus === 'overload' ? ui.linkUnstable : ui.linkBusy}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AiChat;