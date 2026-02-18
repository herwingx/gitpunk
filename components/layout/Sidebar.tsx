import React, { useRef } from 'react';
import { GitBranch, X } from 'lucide-react';
import { TutorialStep } from '../../types';
import { groupStepsByCategory } from '../../utils/stepHelper';

interface SidebarProps {
  steps: TutorialStep[];
  currentStepIndex: number;
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
  onStepClick: (stepId: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  steps,
  currentStepIndex,
  isMobileMenuOpen,
  onCloseMobileMenu,
  onStepClick
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stepsByCategory = groupStepsByCategory(steps);
  const currentStep = steps[currentStepIndex];
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onCloseMobileMenu}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72
          border-r border-cyber-border
          transition-transform duration-300 ease-in-out flex flex-col
          ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl shadow-black/50' : '-translate-x-full'}
          md:static md:translate-x-0 md:shadow-none md:w-72 md:shrink-0 md:h-screen md:sticky md:top-0
        `}
        style={{ background: 'var(--bg-panel)' }}
      >
        {/* Header Brand */}
        <div className="h-14 flex items-center px-5 border-b border-cyber-border shrink-0" style={{ background: 'var(--bg-panel)' }}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyber-primary to-cyber-repo flex items-center justify-center text-white mr-3 shadow-lg shadow-cyber-primary/20 flex-shrink-0">
            <GitBranch size={16} />
          </div>
          <h1 className="text-base font-display font-bold text-cyber-text tracking-tight">GitPunk</h1>
          <button
            onClick={onCloseMobileMenu}
            className="md:hidden ml-auto text-cyber-muted hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Steps Scroll Area — NO padding top so sticky headers flush perfectly */}
        <div className="flex-1 overflow-y-auto custom-scrollbar" ref={scrollRef}>
          {Object.entries(stepsByCategory).map(([category, catSteps], idx) => (
            <div key={category} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>

              {/* Category Header — sticky, full width, zero gap */}
              <div
                className="sticky top-0 z-10 flex items-center gap-2 px-5 py-2 border-b border-cyber-border/50"
                style={{ background: 'var(--bg-panel)' }}
              >
                <div className="w-0.5 h-3 rounded-full bg-cyber-primary flex-shrink-0" />
                <span className="text-[9px] font-bold text-cyber-muted uppercase tracking-[0.18em]">{category}</span>
                <div className="flex-1 h-px bg-cyber-border/30 ml-1" />
              </div>

              {/* Steps list */}
              <div className="px-4 py-2 space-y-0.5 relative border-l-0 mb-1">
                {catSteps.map((step) => {
                  const active = step.id === currentStep.id;
                  const done = step.id < currentStep.id;
                  return (
                    <button
                      key={step.id}
                      id={`step-${step.id}`}
                      onClick={() => onStepClick(step.id)}
                      className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-cyber-primary/20
                        ${active
                          ? 'bg-cyber-primary/10 text-cyber-text border border-cyber-primary/20 shadow-sm translate-x-1 font-medium'
                          : 'text-cyber-muted hover:text-cyber-text hover:bg-white/5'
                        }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ring-2 ring-offset-1 ring-offset-[var(--bg-panel)] flex-shrink-0 transition-colors
                        ${active ? 'bg-cyber-primary ring-cyber-primary/30 animate-pulse'
                          : done ? 'bg-cyber-success ring-transparent'
                            : 'bg-cyber-border ring-transparent'}`}
                      />
                      <span className="truncate">{step.title}</span>
                    </button>
                  );
                })}
              </div>

            </div>
          ))}
          {/* Bottom spacer */}
          <div className="h-2" />
        </div>

        {/* Sidebar Footer */}
        <div className="px-5 py-4 border-t border-cyber-border shrink-0" style={{ background: 'var(--bg-panel)' }}>
          {/* Label row */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-bold text-cyber-muted uppercase tracking-[0.15em] font-mono">PROGRESS</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-cyber-muted font-mono">
                {currentStepIndex + 1}<span className="opacity-40">/{steps.length}</span>
              </span>
              <span className="text-[10px] font-bold text-cyber-primary font-mono">{Math.round(progressPercentage)}%</span>
            </div>
          </div>
          {/* Bar */}
          <div className="h-1.5 w-full bg-cyber-border/50 rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPercentage}%`,
                background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)',
              }}
            />
          </div>
          {/* Status message */}
          <p className="text-[9px] text-cyber-muted font-mono opacity-60 truncate">
            {progressPercentage === 0
              ? '▶ Iniciando protocolo...'
              : progressPercentage < 50
                ? `▶ ${currentStep.category}`
                : progressPercentage < 100
                  ? `▶ ${currentStep.category} — casi listo`
                  : '✓ Protocolo completado'}
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
