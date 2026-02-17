import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CyberButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    className?: string;
    disabled?: boolean;
}

const CyberButton: React.FC<CyberButtonProps> = ({ onClick, children, variant = 'primary', className = '', disabled = false }) => {
    // Changed 'font-mono' to 'font-display' for a sleeker tech look on buttons
    const baseStyles = "relative overflow-hidden group font-display text-sm font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2";
    
    const variants = {
        primary: `bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/50 hover:bg-cyber-cyan/20 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]`,
        secondary: `bg-cyber-gray/50 text-gray-400 border border-cyber-gray hover:text-white hover:border-white/50`,
    };

    if (disabled) {
        return (
            <button disabled className={`${baseStyles} opacity-50 cursor-not-allowed bg-cyber-dark text-gray-600 border border-gray-800 ${className}`}>
                {children}
            </button>
        )
    }

    return (
        <button 
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            <span className="relative z-10 flex items-center gap-2">
                {children}
                {variant === 'primary' && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </button>
    );
};

export default CyberButton;