import React from 'react';
import {
  Globe, Terminal, Check, Play, Circle, MapPin, BrainCircuit, Github,
  Heart, Star, Languages, Info, GitBranch, Volume2, VolumeX, FolderPlus,
  Download, User, Zap, FileCode, Radar, PackagePlus, Save, ScanEye,
  Layers, Link, UploadCloud, Rocket, RefreshCw, GitMerge, ArrowRightLeft,
  Database, Sun, Moon, Menu, X, ArrowRight, ChevronRight, Layout
} from 'lucide-react';
import { TutorialStep } from '../types';

export const IconMap: Record<string, React.ElementType> = {
  Globe, Terminal, Check, Play, Circle, MapPin, BrainCircuit, Github, Heart, Star,
  Languages, Info, GitBranch, FolderPlus, Download, User, Zap, FileCode, Radar,
  PackagePlus, Save, ScanEye, Layers, Link, UploadCloud, Rocket, RefreshCw,
  GitMerge, ArrowRightLeft
};

export const getPhaseStyles = (cat: string) => {
  if (cat.includes('Staging') || cat.includes('Área')) return { color: 'text-cyber-staging', border: 'border-cyber-staging/30', bg: 'bg-cyber-staging/10' };
  if (cat.includes('Repo') || cat.includes('Repositorio')) return { color: 'text-cyber-repo', border: 'border-cyber-repo/30', bg: 'bg-cyber-repo/10' };
  if (cat.includes('Remote') || cat.includes('Remoto') || cat.includes('GitHub')) return { color: 'text-cyber-remote', border: 'border-cyber-remote/30', bg: 'bg-cyber-remote/10' };
  return { color: 'text-cyber-primary', border: 'border-cyber-primary/30', bg: 'bg-cyber-primary/10' };
};

export const groupStepsByCategory = (steps: TutorialStep[]) => {
  return steps.reduce((acc, step) => {
    if (!acc[step.category]) acc[step.category] = [];
    acc[step.category].push(step);
    return acc;
  }, {} as Record<string, TutorialStep[]>);
};
