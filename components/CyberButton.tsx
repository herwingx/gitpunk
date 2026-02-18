import React from 'react';
import { Loader2 } from 'lucide-react';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    isLoading?: boolean;
    icon?: React.ReactNode;
}

const CyberButton: React.FC<CyberButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    className = '',
    disabled,
    isLoading = false,
    icon,
    ...props
}) => {

    // Base structural classes - Modern SaaS feel (Rounded-XL, Sans Font)
    const baseStyles = "relative isolate overflow-hidden font-sans font-semibold text-sm py-2.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98] select-none";

    // Variant Styles mapping to our new CSS Variables
    const variants = {
        primary: `
            bg-cyber-primary text-white 
            shadow-[0_4px_14px_0_rgba(var(--primary-core),0.3)] 
            hover:shadow-[0_6px_20px_rgba(var(--primary-core),0.4)] 
            hover:-translate-y-0.5 
            border border-transparent
        `,
        secondary: `
            bg-cyber-panel border border-cyber-border 
            text-cyber-muted hover:text-cyber-text 
            hover:bg-cyber-text/5 hover:border-cyber-text/20
            hover:shadow-sm
        `,
        danger: `
            bg-red-500/10 text-red-500 border border-red-500/50 
            hover:bg-red-500 hover:text-white hover:border-red-500
            shadow-[0_0_15px_rgba(239,68,68,0.2)]
        `,
        ghost: `
            bg-transparent text-cyber-muted hover:text-cyber-primary 
            hover:bg-cyber-primary/5
        `
    };

    // Disabled State
    const disabledStyles = "opacity-50 cursor-not-allowed pointer-events-none grayscale";

    return (
        <button
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`
                ${baseStyles} 
                ${variants[variant]} 
                ${(disabled || isLoading) ? disabledStyles : ''} 
                ${className}
            `}
            {...props}
        >
            {/* Loading Spinner */}
            {isLoading && (
                <Loader2 size={16} className="animate-spin absolute left-4" />
            )}

            {/* Content Wrapper */}
            <span className={`relative z-10 flex items-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                {icon && <span>{icon}</span>}
                {children}
            </span>

            {/* Premium Shine Effect (Only for Primary) */}
            {variant === 'primary' && !disabled && !isLoading && (
                <div className="absolute inset-0 -z-10 overflow-hidden rounded-xl">
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                </div>
            )}
        </button>
    );
};

export default CyberButton;