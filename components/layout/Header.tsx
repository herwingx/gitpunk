
import React from 'react';
import { MapPin, ChevronRight, Menu, Database, Sun, Moon, Github } from 'lucide-react';
import { TutorialStep, Language } from '../../types';
import { getPhaseStyles } from '../../utils/stepHelper';

interface HeaderProps {
  currentStep: TutorialStep;
  onToggleMobileMenu: () => void;
  onToggleMatrix: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

const Header: React.FC<HeaderProps> = ({
  currentStep,
  onToggleMobileMenu,
  onToggleMatrix,
  theme,
  toggleTheme,
  language,
  setLanguage
}) => {
  const phaseStyle = getPhaseStyles(currentStep.category);
  const [stars, setStars] = React.useState<number | null>(null);

  React.useEffect(() => {
    fetch('https://api.github.com/repos/herwingx/gitpunk')
      .then(res => res.json())
      .then(data => {
        if (typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <header className="h-16 border-b border-cyber-border bg-cyber-bg/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 z-30 sticky top-0 w-full transition-colors duration-300">
      <div className="flex items-center gap-4 min-w-0">
        <button onClick={onToggleMobileMenu} className="md:hidden text-cyber-text p-2 rounded hover:bg-white/5 active:bg-white/10 transition-colors">
          <Menu size={20} />
        </button>

        {/* Breadcrumbs */}
        <div className="hidden md:flex items-center gap-2 text-sm text-cyber-muted whitespace-nowrap overflow-hidden">
          <MapPin size={14} className="opacity-50 flex-shrink-0" />
          <span className="truncate max-w-[150px]">{currentStep.category}</span>
          <ChevronRight size={14} className="opacity-30 flex-shrink-0" />
          <span className={`font-medium truncate ${phaseStyle.color}`}>Node {currentStep.id}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Desktop Tools */}
        <a
          href="https://github.com/herwingx/gitpunk"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border border-cyber-border hover:bg-cyber-panel transition-all group active:scale-95"
          title="Star on GitHub"
        >
          <Github size={14} className="text-cyber-staging group-hover:scale-110 transition-transform" />
          <span className="text-cyber-muted group-hover:text-cyber-text">
            {stars !== null ? `${stars} Stars` : 'GitHub'}
          </span>
        </a>
        <button
          onClick={onToggleMatrix}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border border-cyber-border hover:bg-cyber-panel transition-all group active:scale-95"
          title="Open Command Matrix"
        >
          <Database size={14} className="text-cyber-staging group-hover:scale-110 transition-transform" />
          <span className="text-cyber-muted group-hover:text-cyber-text">MATRIX</span>
        </button>

        <div className="w-px h-6 bg-cyber-border mx-2 hidden md:block"></div>

        <button
          onClick={toggleTheme}
          className="p-2 text-cyber-muted hover:text-cyber-text transition-transform active:scale-90 active:rotate-12 rounded-full hover:bg-white/5"
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          onClick={() => setLanguage(l => l === 'es' ? 'en' : 'es')}
          className="w-8 h-8 rounded border border-cyber-border flex items-center justify-center text-[10px] font-bold font-mono text-cyber-muted hover:border-cyber-text hover:text-cyber-text transition-colors active:bg-white/5"
          title="Switch Language"
        >
          {language === 'es' ? 'ES' : 'EN'}
        </button>
      </div>
    </header>
  );
};

export default Header;
