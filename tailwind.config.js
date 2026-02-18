/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // Asegura que escanee la carpeta src
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'], // Tipografía moderna SaaS
        mono: ['"JetBrains Mono"', 'monospace'], // Ligaduras de código
        display: ['"Space Grotesk"', 'sans-serif'], // Títulos técnicos
      },
      colors: {
        cyber: {
          bg: 'var(--bg-primary)',
          panel: 'var(--bg-panel)',
          border: 'var(--border-color)',
          text: 'var(--text-main)',
          muted: 'var(--text-muted)',

          // Tokens Semánticos para Git
          primary: 'var(--primary-core)',   // Azul Interfaz
          staging: 'var(--git-staging)',    // Cyan (git add)
          repo: 'var(--git-repo)',          // Purple (git commit)
          remote: 'var(--git-remote)',      // Pink/Rose (git push)
          success: '#10b981',

          // Legacy support (para evitar errores si no actualizas otros componentes aun)
          cyan: 'var(--git-staging)',
          purple: 'var(--git-repo)',
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'flow-right': 'flowRight 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'flow-right-delay': 'flowRight 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'data-blink': 'dataBlink 1.2s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'node-enter': 'nodeEnter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        flowRight: {
          '0%': { left: '-8px', opacity: '0', transform: 'translateY(-50%) scale(0.5)' },
          '10%': { opacity: '1', transform: 'translateY(-50%) scale(1)' },
          '85%': { opacity: '1', transform: 'translateY(-50%) scale(1)' },
          '100%': { left: 'calc(100% + 8px)', opacity: '0', transform: 'translateY(-50%) scale(0.5)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 8px 2px currentColor', opacity: '0.6' },
          '50%': { boxShadow: '0 0 20px 6px currentColor', opacity: '1' },
        },
        dataBlink: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        scanLine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        nodeEnter: {
          '0%': { opacity: '0', transform: 'scale(0.6)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      }
    }
  },
  plugins: [],
}