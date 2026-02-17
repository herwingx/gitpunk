export type Language = 'es' | 'en';

export enum StepCategory {
    INTRO = 'CONCEPTOS CLAVE', // These will be keys for translation maps now
    INSTALL = 'INSTALACIÓN',
    SETUP = 'CONFIGURACIÓN',
    BASICS = 'CICLO BÁSICO',
    BRANCHING = 'UNIVERSOS PARALELOS',
    REMOTE = 'NUBE & COLABORACIÓN'
}

export interface OsCommand {
    windows: string;
    linux: string; // Also Mac usually
}

export interface TutorialStep {
    id: number;
    title: string;
    // If command is string, it's universal. If object, it's OS specific.
    command: string | OsCommand; 
    description: string;
    explanation: string;
    practicalTask: string; // New field: Explicit instruction for the user to do
    category: string; // Changed from enum to string to allow translation
    icon: string; // Lucide icon name
    flagDetails?: { flag: string; description: string }[]; // New field for command breakdown
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    isLoading?: boolean;
}