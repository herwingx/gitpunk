import React, { useState, useEffect, useRef } from 'react';
import { TUTORIAL_CONTENT, UI_TEXT } from './constants';
import { StepCategory, Language, TutorialStep } from './types';
import TerminalWindow from './components/TerminalWindow';
import CyberButton from './components/CyberButton';
import AiChat from './components/AiChat';
import GitFlowVisualizer from './components/GitFlowVisualizer';
import CommandMatrix from './components/CommandMatrix';
import { Globe, Terminal, Check, Play, Circle, MapPin, BrainCircuit, Github, Heart, Star, Languages, Info, GitBranch, Volume2, VolumeX, FolderPlus, Download, User, Zap, FileCode, Radar, PackagePlus, Save, ScanEye, Layers, Link, UploadCloud, Rocket, RefreshCw, GitMerge, ArrowRightLeft, Database, Sun, Moon } from 'lucide-react';
import { playSfx, toggleMute } from './utils/soundEngine';

// Icon mapping helper
const IconMap: Record<string, React.ElementType> = {
    Globe, Terminal, Check, Play, Circle, MapPin, BrainCircuit, Github, Heart, Star, Languages, Info, GitBranch,
    FolderPlus, Download, User, Zap, FileCode, Radar, PackagePlus, Save, ScanEye, Layers, Link, UploadCloud, Rocket, RefreshCw, GitMerge, ArrowRightLeft
};

const App: React.FC = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [language, setLanguage] = useState<Language>('es');
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [repoStars, setRepoStars] = useState<number>(0);
    const [muted, setMuted] = useState(false);
    const [isMatrixOpen, setIsMatrixOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Get current data based on language
    const steps = TUTORIAL_CONTENT[language];
    const ui = UI_TEXT[language];
    
    const currentStep = steps[currentStepIndex];
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;

    // Calculate progress
    const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

    // Apply Theme Class
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Determine if we should show the Git Flow Visualizer
    const getShowVisualizer = () => {
        const cmd = typeof currentStep.command === 'string' ? currentStep.command : currentStep.command.windows;
        const visualizerKeywords = ['git init', 'git add', 'git commit', 'git push', 'git pull', 'git status', 'git diff', 'git checkout', 'git branch', 'git merge'];
        return visualizerKeywords.some(keyword => cmd.includes(keyword));
    };

    const showVisualizer = getShowVisualizer();
    const StepIcon = IconMap[currentStep.icon] || Terminal;

    // Group steps by category for the sidebar
    const stepsByCategory = steps.reduce((acc, step) => {
        if (!acc[step.category]) acc[step.category] = [];
        acc[step.category].push(step);
        return acc;
    }, {} as Record<string, TutorialStep[]>);

    // Fetch GitHub Stars
    useEffect(() => {
        const fetchStars = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/herwingx/GitPunk');
                if (response.ok) {
                    const data = await response.json();
                    setRepoStars(data.stargazers_count);
                } else {
                    setRepoStars(0);
                }
            } catch (e) {
                setRepoStars(0);
            }
        };
        fetchStars();
    }, []);

    // Auto scroll sidebar when step changes
    useEffect(() => {
        const activeElement = document.getElementById(`step-${currentStep.id}`);
        if (activeElement && scrollRef.current) {
            const topPos = activeElement.offsetTop;
            scrollRef.current.scrollTo({ top: topPos - 150, behavior: 'smooth' });
        }
    }, [currentStepIndex, currentStep.id]);

    const handleNext = () => {
        if (!isLastStep) {
            playSfx.click();
            setCurrentStepIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (!isFirstStep) {
            playSfx.click();
            setCurrentStepIndex(prev => prev - 1);
        }
    };
    
    const handleStepClick = (stepId: number) => {
        playSfx.click();
        setCurrentStepIndex(stepId - 1);
    }

    const handleToggleMute = () => {
        const newMuteState = toggleMute();
        setMuted(newMuteState);
        if (!newMuteState) playSfx.hover(); // Test sound
    };

    const toggleTheme = () => {
        playSfx.click();
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="min-h-screen font-sans selection:bg-cyber-cyan/30 selection:text-white overflow-hidden flex flex-col md:flex-row transition-colors duration-300">
            
            {/* Background Layers */}
            <div className="fixed inset-0 z-0 bg-cyber-bg transition-colors duration-300"></div>
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
                 style={{ 
                     backgroundImage: `linear-gradient(${theme === 'dark' ? 'rgba(255,255,255, 0.1)' : 'rgba(0,0,0, 0.1)'} 1px, transparent 1px), linear-gradient(90deg, ${theme === 'dark' ? 'rgba(255,255,255, 0.1)' : 'rgba(0,0,0, 0.1)'} 1px, transparent 1px)`, 
                     backgroundSize: '50px 50px' 
                 }}>
            </div>
            
            {/* Sidebar Navigation - Roadmap Style */}
            <aside className="w-full md:w-80 h-auto md:h-screen flex flex-col bg-cyber-panel/90 border-r border-cyber-border z-20 md:backdrop-blur-xl transition-colors duration-300">
                <div className="p-6 border-b border-cyber-border bg-cyber-bg flex justify-between items-start">
                    <div>
                        <h1 className="text-xl font-bold font-display tracking-tighter text-cyber-text flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                                <GitBranch size={18} strokeWidth={3} />
                            </div>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-text to-cyber-muted">
                                {ui.title}<span className="font-light"></span>
                            </span>
                        </h1>
                        <div className="mt-4 flex items-center gap-2 text-[10px] text-cyber-muted font-mono uppercase tracking-widest">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse shadow-[0_0_8px_#10b981]"></span>
                            {ui.roadmap}
                        </div>
                    </div>
                    
                    {/* Controls Row */}
                    <div className="flex gap-1">
                        {/* Theme Toggle */}
                        <button 
                            onClick={toggleTheme}
                            className="p-2 rounded hover:bg-cyber-text/5 text-cyber-muted hover:text-cyber-text transition-colors"
                            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                        >
                            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                        </button>

                        {/* Language Switcher */}
                        <button 
                            onClick={() => { playSfx.click(); setLanguage(l => l === 'es' ? 'en' : 'es'); }}
                            className="p-2 rounded hover:bg-cyber-text/5 text-cyber-muted hover:text-cyber-text transition-colors"
                            title="Change Language"
                        >
                            <span className="font-mono text-xs font-bold">{language === 'es' ? 'ES' : 'EN'}</span>
                        </button>
                    </div>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar hidden md:block bg-cyber-bg">
                    <div className="p-6 relative">
                        {/* Continuous Vertical Line for Roadmap */}
                        <div className="absolute left-[29px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyber-cyan/20 via-cyber-purple/20 to-transparent"></div>

                        {Object.entries(stepsByCategory).map(([category, catSteps]) => {
                            const steps = catSteps as TutorialStep[];
                            return (
                                <div key={category} className="mb-8 relative">
                                    <h3 className="text-[10px] font-bold font-display text-cyber-cyan uppercase tracking-widest mb-4 pl-10 opacity-90 flex items-center gap-2">
                                        <MapPin size={10} /> {category}
                                    </h3>
                                    <div className="space-y-4">
                                        {steps.map((step) => {
                                            const isActive = step.id === currentStep.id;
                                            const isCompleted = step.id < currentStep.id;
                                            
                                            return (
                                                <button 
                                                    key={step.id}
                                                    id={`step-${step.id}`}
                                                    onClick={() => handleStepClick(step.id)}
                                                    onMouseEnter={() => playSfx.hover()}
                                                    className={`w-full text-left group relative pl-10 pr-2 py-1 transition-all duration-300`}
                                                >
                                                    {/* Node on the line */}
                                                    <div className={`absolute left-[22px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 ${
                                                        isActive 
                                                            ? 'bg-cyber-cyan border-cyber-cyan shadow-[0_0_10px_#06b6d4] scale-125' 
                                                            : isCompleted 
                                                                ? 'bg-cyber-panel border-cyber-green text-cyber-green' 
                                                                : 'bg-cyber-panel border-cyber-muted'
                                                    }`}>
                                                        {isCompleted && <div className="absolute inset-0 flex items-center justify-center"><Check size={8} /></div>}
                                                        {isActive && <div className="absolute inset-0 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div></div>}
                                                    </div>

                                                    <div className={`rounded-lg p-2 transition-all duration-200 ${isActive ? 'bg-cyber-cyan/5 border border-cyber-cyan/10 translate-x-2' : 'group-hover:bg-cyber-text/5 border border-transparent'}`}>
                                                        <span className={`block text-xs font-medium font-display transition-colors ${isActive ? 'text-cyber-cyan' : isCompleted ? 'text-cyber-muted' : 'text-cyber-text'}`}>
                                                            {step.title}
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Sidebar Footer - Credits */}
                <div className="hidden md:flex flex-col items-center justify-center p-4 border-t border-cyber-border bg-cyber-bg gap-2">
                     {/* Sound Toggle */}
                     <button 
                        onClick={handleToggleMute}
                        className="flex items-center gap-2 text-[10px] text-cyber-muted hover:text-cyber-cyan transition-colors mb-2 uppercase font-mono tracking-wider"
                    >
                        {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                        {muted ? 'Audio: Muted' : 'Audio: Active'}
                    </button>

                    <a 
                        href="https://github.com/herwingx" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-text/5 hover:bg-cyber-text/10 transition-all border border-transparent hover:border-cyber-cyan/20 w-full justify-center"
                    >
                        <span className="text-[10px] text-cyber-muted font-mono group-hover:text-cyber-text transition-colors">{ui.credits}</span>
                        <span className="text-xs font-bold text-cyber-cyan group-hover:text-cyber-cyanGlow transition-colors">herwingx</span>
                        <Heart size={10} className="text-red-500 fill-red-500/20 animate-pulse" />
                    </a>
                </div>
                
                {/* Mobile Progress */}
                <div className="md:hidden h-1 bg-cyber-border w-full">
                    <div className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-purple transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 relative overflow-hidden flex flex-col h-[calc(100vh-60px)] md:h-screen transition-colors duration-300">
                
                {/* Top Bar Actions (Stars + Matrix) */}
                <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30 flex items-center gap-3">
                    
                    {/* Command Matrix Button */}
                    <button
                        onClick={() => { playSfx.click(); setIsMatrixOpen(true); }}
                        className="flex items-center gap-2 bg-cyber-panel/80 backdrop-blur-md border border-cyber-cyan/30 rounded-lg px-3 py-2 text-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all group"
                    >
                        <Database size={16} />
                        <span className="hidden md:inline text-xs font-display font-bold">{ui.openMatrix}</span>
                    </button>

                    {/* Repo Link */}
                    <a 
                        href="https://github.com/herwingx/GitPunk" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => playSfx.click()}
                        className="flex items-center gap-0 bg-cyber-panel/80 backdrop-blur-md border border-cyber-border rounded-lg overflow-hidden group hover:border-cyber-text transition-all shadow-lg"
                    >
                        <div className="px-3 py-2 bg-cyber-text/5 border-r border-cyber-text/5 flex items-center justify-center">
                            <Github size={18} className="text-cyber-text" />
                        </div>
                        <div className="px-3 py-2 flex items-center gap-2">
                            <span className="text-xs font-bold font-display text-cyber-muted group-hover:text-cyber-text">{ui.star}</span>
                            <div className="flex items-center gap-1 bg-cyber-text/10 px-1.5 py-0.5 rounded text-[10px] text-cyber-muted min-w-[30px] justify-center font-mono">
                                <Star size={8} className={`text-yellow-500 fill-yellow-500 ${repoStars > 0 ? 'animate-pulse' : ''}`} />
                                <span>{repoStars}</span>
                            </div>
                        </div>
                    </a>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 pb-32">
                    <div className="max-w-4xl mx-auto w-full">
                        
                        {/* Header Tags */}
                        <div className="flex flex-wrap gap-3 mb-6 items-center animate-fade-in-up">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold font-display tracking-wider bg-cyber-panel border border-cyber-border text-cyber-muted uppercase backdrop-blur-sm shadow-sm">
                                {currentStep.category}
                            </span>
                            <div className="h-px w-8 bg-cyber-border"></div>
                            <span className="text-cyber-cyan font-mono text-xs">
                                {ui.phase} {Math.floor((currentStep.id >= 3 ? (currentStepIndex + 2) / 4 : 0) + 1)} <span className="text-cyber-muted">::</span> {ui.node} {currentStep.id}
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl md:text-5xl font-bold font-display text-cyber-text mb-6 tracking-tight drop-shadow-lg leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            {currentStep.title}
                        </h2>

                        {/* Description & Practical Task Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <div>
                                <p className="text-lg text-cyber-muted font-light leading-relaxed mb-6">
                                    {currentStep.description}
                                </p>
                                <div className="glass-panel rounded-xl p-5 relative overflow-hidden group hover:border-cyber-purple/30 transition-colors">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyber-purple to-transparent opacity-70"></div>
                                    <h3 className="text-cyber-purple font-display text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Globe size={14} />
                                        {ui.knowledgeBase}
                                    </h3>
                                    <p className="text-sm text-cyber-text leading-relaxed opacity-90">
                                        {currentStep.explanation}
                                    </p>
                                </div>
                            </div>

                            {/* Conditional Rendering: GitFlow Visualizer or Static Icon */}
                            <div className="bg-cyber-panel border border-cyber-cyan/20 rounded-xl p-6 flex flex-col shadow-lg relative overflow-hidden justify-center items-center text-center">
                                
                                {showVisualizer ? (
                                    <div className="h-24 md:h-32 w-full mb-4 relative z-10 flex items-center justify-center">
                                        <GitFlowVisualizer command={currentStep.command} language={language} />
                                    </div>
                                ) : (
                                    <div className="h-24 md:h-32 w-full mb-4 relative z-10 flex items-center justify-center opacity-80">
                                         <StepIcon size={80} strokeWidth={1} className="text-cyber-cyan drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]" />
                                    </div>
                                )}

                                <div className="w-full text-left">
                                    <h3 className="text-cyber-cyan font-display text-xs uppercase tracking-widest mb-3 flex items-center gap-2 relative z-10">
                                        <Play size={14} fill="currentColor" />
                                        {currentStep.category === (language === 'es' ? "CONCEPTOS CLAVE" : "KEY CONCEPTS") ? ui.objective : ui.activeInstruction}
                                    </h3>
                                    <p className="text-sm md:text-base text-cyber-text font-medium relative z-10 leading-relaxed">
                                        {currentStep.practicalTask}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Terminal */}
                        <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                            <TerminalWindow 
                                command={currentStep.command} 
                                stepId={currentStep.id}
                                category={currentStep.category}
                                language={language}
                                onComplete={() => {}} 
                            />

                            {/* Command Breakdown */}
                            {currentStep.flagDetails && currentStep.flagDetails.length > 0 && (
                                <div className="mt-6 bg-cyber-panel/40 border border-cyber-border rounded-xl p-5 backdrop-blur-sm relative overflow-hidden">
                                     <div className="absolute left-0 top-0 w-1 h-full bg-cyber-purple/50"></div>
                                     <h3 className="text-xs font-bold font-display text-cyber-purple uppercase tracking-widest mb-4 flex items-center gap-2">
                                         <Info size={14} />
                                         {ui.commandBreakdown}
                                     </h3>
                                     <div className="grid gap-3">
                                         {currentStep.flagDetails.map((item, idx) => (
                                             <div key={idx} className="flex items-start gap-4 text-sm group">
                                                 <div className="min-w-[4rem] md:min-w-[6rem] text-center">
                                                     <span className="inline-block w-full py-1 px-2 rounded bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purpleGlow font-mono text-xs font-bold shadow-[0_0_10px_rgba(139,92,246,0.1)] group-hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all">
                                                         {item.flag}
                                                     </span>
                                                 </div>
                                                 <p className="text-cyber-muted font-light leading-relaxed pt-0.5">
                                                     {item.description}
                                                 </p>
                                             </div>
                                         ))}
                                     </div>
                                </div>
                            )}
                        </div>

                        {/* Navigation Footer */}
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-cyber-border">
                            <CyberButton 
                                variant="secondary" 
                                onClick={handlePrev} 
                                disabled={isFirstStep}
                            >
                                {ui.prev}
                            </CyberButton>

                            <CyberButton 
                                onClick={handleNext} 
                                disabled={isLastStep}
                            >
                                {isLastStep ? ui.completedTitle : ui.next}
                            </CyberButton>
                        </div>
                    </div>
                </div>
            </main>
            
            {/* AI Assistant Chat - Fixed Bottom Right */}
            <AiChat language={language} />

            {/* Matrix Modal */}
            <CommandMatrix 
                isOpen={isMatrixOpen} 
                onClose={() => setIsMatrixOpen(false)} 
                language={language} 
            />

        </div>
    );
};

export default App;