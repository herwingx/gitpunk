import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { TUTORIAL_CONTENT, UI_TEXT } from './constants';
import { Language } from './types';
import TerminalWindow from './components/TerminalWindow';
import CyberButton from './components/CyberButton';
import AiChat from './components/AiChat';
import GitFlowVisualizer from './components/GitFlowVisualizer';
import CommandMatrix from './components/CommandMatrix';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import { IconMap, getPhaseStyles } from './utils/stepHelper';
import { playSfx } from './utils/soundEngine';
import { Terminal, BrainCircuit, ArrowRight, ChevronLeft, Tag } from 'lucide-react';

// ── Static data ───────────────────────────────────────────────────────────────

const proTips = {
    es: [
        'Usa `git log --oneline` para ver el historial de commits de forma compacta.',
        '`git stash` guarda cambios temporalmente sin hacer commit. Ideal para cambiar de rama rápido.',
        'Escribe mensajes de commit en imperativo: "Añadir login" no "Añadí login".',
        '`git diff HEAD` muestra todos los cambios desde el último commit, staged o no.',
        'Usa `git commit --amend` para corregir el mensaje del último commit antes de hacer push.',
        '`git restore <file>` descarta cambios en working directory sin afectar el staging.',
        '`git branch -d` solo borra ramas ya fusionadas. Usa `-D` para forzar el borrado.',
        '`git fetch` descarga cambios del remoto sin aplicarlos. Más seguro que `git pull`.',
        'Configura `git config --global alias.st status` para escribir `git st` en vez de `git status`.',
        'El archivo `.gitignore` evita que Git rastree archivos como `node_modules/` o `.env`.',
    ],
    en: [
        'Use `git log --oneline` to see a compact commit history.',
        '`git stash` saves changes temporarily without committing. Great for quick branch switches.',
        'Write commit messages in imperative: "Add login" not "Added login".',
        '`git diff HEAD` shows all changes since the last commit, staged or not.',
        'Use `git commit --amend` to fix the last commit message before pushing.',
        '`git restore <file>` discards working directory changes without affecting staging.',
        '`git branch -d` only deletes merged branches. Use `-D` to force delete.',
        '`git fetch` downloads remote changes without applying them. Safer than `git pull`.',
        'Set `git config --global alias.st status` to type `git st` instead of `git status`.',
        'The `.gitignore` file prevents Git from tracking files like `node_modules/` or `.env`.',
    ],
};

const gitShortcuts = [
    { cmd: 'git log --oneline', es: 'Historial compacto', en: 'Compact history' },
    { cmd: 'git stash', es: 'Guardar cambios temp.', en: 'Stash changes' },
    { cmd: 'git diff HEAD', es: 'Ver todos los cambios', en: 'See all changes' },
    { cmd: 'git restore .', es: 'Descartar cambios', en: 'Discard changes' },
    { cmd: 'git branch -a', es: 'Ver todas las ramas', en: 'List all branches' },
];

// ─────────────────────────────────────────────────────────────────────────────

const App: React.FC = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [language, setLanguage] = useState<Language>('es');
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [isMatrixOpen, setIsMatrixOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const steps = TUTORIAL_CONTENT[language];
    const ui = UI_TEXT[language];
    const currentStep = steps[currentStepIndex];
    if (!currentStep) return null;

    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;
    const StepIcon = IconMap[currentStep.icon] || Terminal;
    const phaseStyle = getPhaseStyles(currentStep.category);

    useEffect(() => {
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [theme]);

    const handleNext = () => { if (!isLastStep) { playSfx.click(); setCurrentStepIndex(p => p + 1); } };
    const handlePrev = () => { if (!isFirstStep) { playSfx.click(); setCurrentStepIndex(p => p - 1); } };
    const handleStepClick = (stepId: number) => {
        playSfx.click();
        const index = steps.findIndex(s => s.id === stepId);
        if (index !== -1) setCurrentStepIndex(index);
        setIsMobileMenuOpen(false);
    };
    const toggleTheme = () => { playSfx.click(); setTheme(p => p === 'dark' ? 'light' : 'dark'); };

    const currentTip = language === 'es'
        ? proTips.es[currentStepIndex % proTips.es.length]
        : proTips.en[currentStepIndex % proTips.en.length];

    return (
        <div className="h-screen w-screen font-sans selection:bg-cyber-primary/30 overflow-hidden flex flex-row bg-cyber-bg transition-colors duration-500">

            {/* Ambient orbs */}
            <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyber-primary/15 blur-[120px] pointer-events-none mix-blend-screen animate-pulse-slow z-0" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyber-repo/10 blur-[100px] pointer-events-none mix-blend-screen z-0" />

            {/* Sidebar */}
            <Sidebar
                steps={steps}
                currentStepIndex={currentStepIndex}
                isMobileMenuOpen={isMobileMenuOpen}
                onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
                onStepClick={handleStepClick}
            />

            {/* Main */}
            <main className="flex-1 min-w-0 relative flex flex-col overflow-hidden">

                <Header
                    currentStep={currentStep}
                    onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
                    onToggleMatrix={() => setIsMatrixOpen(!isMatrixOpen)}
                    theme={theme}
                    toggleTheme={toggleTheme}
                    language={language}
                    setLanguage={setLanguage}
                />

                {/* ── WORKSPACE ── */}
                <div className="flex-1 overflow-y-auto custom-scrollbar z-10" style={{ padding: '20px 24px 100px' }}>
                    <div style={{ maxWidth: 1400, margin: '0 auto' }}>

                        {/* ── STEP HEADER ── */}
                        <div className="mb-5 animate-fade-in-up">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold font-mono uppercase tracking-widest ${phaseStyle.border} ${phaseStyle.color} ${phaseStyle.bg}`}>
                                    <StepIcon size={10} />
                                    {ui.phase} {Math.ceil((currentStepIndex + 1) / 4)}
                                </div>
                                <span className="text-[10px] font-mono text-cyber-muted uppercase tracking-widest opacity-60">
                                    {currentStep.category}
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-cyber-text leading-tight tracking-tight">
                                {currentStep.title}
                            </h2>
                            <p className="text-sm md:text-base text-cyber-muted font-light leading-relaxed mt-1 max-w-xl">
                                {currentStep.description}
                            </p>
                        </div>

                        {/* ══════════════════════════════════════════════════
                            ROW 1 — 3 columns, all same height (items-stretch)
                            Col A (3): Knowledge base
                            Col B (6): Objective + Terminal
                            Col C (3): Flags + Pro Tip + Shortcuts
                        ══════════════════════════════════════════════════ */}
                        <div
                            className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in-up lg:items-stretch"
                            style={{ animationDelay: '80ms' }}
                        >

                            {/* ── COL A: Knowledge base ── */}
                            <div className="lg:col-span-3 order-3 lg:order-1">
                                <div className="glass-panel rounded-2xl p-5 h-full flex flex-col">
                                    <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2 shrink-0 ${phaseStyle.color}`}>
                                        <BrainCircuit size={13} />
                                        {ui.knowledgeBase}
                                    </h3>
                                    {/* flex-1 makes text fill remaining height so card stretches */}
                                    <p className="text-sm text-cyber-text leading-relaxed opacity-90 flex-1">
                                        {currentStep.explanation}
                                    </p>
                                </div>
                            </div>

                            {/* ── COL B: Objective + Terminal ── */}
                            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-3">

                                {/* Objective */}
                                {currentStep.practicalTask && (
                                    <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-cyber-primary/25 bg-cyber-primary/5 backdrop-blur-sm shrink-0">
                                        <span className="text-cyber-primary shrink-0 mt-0.5 text-base">◎</span>
                                        <p className="text-sm text-cyber-text leading-snug">{currentStep.practicalTask}</p>
                                    </div>
                                )}

                                {/* Terminal — flex-1 fills remaining height */}
                                <div className="flex-1" style={{ minHeight: 260 }}>
                                    <TerminalWindow
                                        command={currentStep.command}
                                        stepId={currentStep.id}
                                        category={currentStep.category}
                                        language={language}
                                        onComplete={() => playSfx.success()}
                                    />
                                </div>
                            </div>

                            {/* ── COL C: Flags + Pro Tip + Shortcuts ── */}
                            <div className="lg:col-span-3 order-2 lg:order-3 flex flex-col gap-3">

                                {/* Flags header */}
                                <div className="flex items-center gap-2 shrink-0">
                                    {currentStep.flagDetails
                                        ? <Tag size={11} className={phaseStyle.color} />
                                        : <Terminal size={11} className={phaseStyle.color} />
                                    }
                                    <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${phaseStyle.color}`}>
                                        {currentStep.flagDetails
                                            ? ui.commandBreakdown
                                            : (language === 'es' ? 'Referencia Rápida' : 'Quick Reference')}
                                    </span>
                                </div>

                                {/* Flag cards */}
                                {currentStep.flagDetails && currentStep.flagDetails.map((f, i) => (
                                    <div
                                        key={i}
                                        className="glass-panel rounded-xl p-3 hover:border-cyber-primary/30 transition-all group cursor-default shrink-0"
                                    >
                                        <code className={`block text-[12px] font-bold font-mono mb-1.5 ${phaseStyle.color}`}>
                                            {f.flag}
                                        </code>
                                        <p className="text-xs text-cyber-muted leading-relaxed group-hover:text-cyber-text transition-colors">
                                            {f.description}
                                        </p>
                                    </div>
                                ))}

                                {/* Pro Tip */}
                                <div className="glass-panel rounded-xl p-3.5 border border-amber-400/15 bg-amber-400/5 shrink-0">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <span className="text-amber-400 text-xs leading-none">⚡</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-amber-400/80">
                                            Pro Tip
                                        </span>
                                    </div>
                                    <p className="text-xs text-cyber-muted leading-relaxed">{currentTip}</p>
                                </div>

                                {/* Shortcuts — flex-1 so it stretches to match col height */}
                                <div className="glass-panel rounded-xl p-3.5 flex-1 flex flex-col">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest font-mono block mb-3 shrink-0 ${phaseStyle.color}`}>
                                        {language === 'es' ? 'Atajos útiles' : 'Useful shortcuts'}
                                    </span>
                                    <div className="space-y-2.5 flex-1">
                                        {gitShortcuts.map((s, i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <code className="shrink-0 text-[10px] font-mono bg-cyber-border/30 px-1.5 py-0.5 rounded text-cyber-text/70 whitespace-nowrap">
                                                    {s.cmd}
                                                </code>
                                                <span className="text-[10px] text-cyber-muted leading-tight pt-0.5">
                                                    {language === 'es' ? s.es : s.en}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* ══════════════════════════════════════════════════
                            ROW 2 — Git Flow visualizer, full width, tall
                        ══════════════════════════════════════════════════ */}
                        <div className="mt-4 animate-fade-in-up" style={{ animationDelay: '160ms' }}>
                            <div className="glass-panel rounded-2xl overflow-hidden hover:border-cyber-primary/30 transition-colors">
                                {/* Title bar */}
                                <div className="flex items-center justify-between px-5 pt-3 pb-2.5 border-b border-cyber-border/30">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${phaseStyle.color}`}>
                                        Git Flow — {currentStep.title}
                                    </span>
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                                    </div>
                                </div>
                                {/* Visualizer — overflow-x-auto so it scrolls on mobile instead of clipping */}
                                <div className="overflow-x-auto" style={{ minHeight: 180, height: 'clamp(160px, 22vh, 240px)' }}>
                                    <div className="flex items-center justify-center relative h-full" style={{ minWidth: 420 }}>
                                        <GitFlowVisualizer command={currentStep.command} language={language} />
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyber-bg/30 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ── BOTTOM NAV ── */}
                <div className="absolute bottom-0 inset-x-0 z-20 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, var(--color-cyber-bg) 60%, transparent)' }}>
                    <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between pointer-events-auto">
                        <CyberButton
                            onClick={handlePrev}
                            disabled={isFirstStep}
                            variant="secondary"
                            className="glass-button text-sm flex items-center gap-2"
                        >
                            <ChevronLeft size={15} />
                            {ui.prev}
                        </CyberButton>

                        <CyberButton
                            onClick={handleNext}
                            disabled={isLastStep}
                            variant="primary"
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm"
                        >
                            {isLastStep ? ui.completedTitle : ui.next}
                            {!isLastStep && <ArrowRight size={15} />}
                        </CyberButton>
                    </div>
                </div>

            </main>

            {/* Floating widgets */}
            <AiChat language={language} />
            <CommandMatrix isOpen={isMatrixOpen} onClose={() => setIsMatrixOpen(false)} language={language} />
            <Analytics />

        </div>
    );
};

export default App;
