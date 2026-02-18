// Simple Web Audio API Synthesizer for Cyberpunk SFX
// No external files required.

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isMuted = false;

const initAudio = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        masterGain = audioCtx.createGain();
        masterGain.gain.value = 0.3; // Global volume
        masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(err => console.warn("AudioContext resume failed:", err));
    }
};

// Auto-init on first real user interaction to satisfy browser policies
if (typeof window !== 'undefined') {
    const unlockAudio = () => {
        initAudio();
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
}


export const toggleMute = () => {
    isMuted = !isMuted;
    return isMuted;
};

const createOscillator = (type: OscillatorType, freq: number, duration: number, volume: number = 0.1, delay: number = 0) => {
    if (isMuted || !audioCtx || !masterGain) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);

    gain.gain.setValueAtTime(volume, audioCtx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + duration);
};

export const playSfx = {
    hover: () => {
        initAudio();
        // High pitch short blip
        createOscillator('sine', 800, 0.05, 0.05);
    },
    click: () => {
        initAudio();
        // Mechanical click
        createOscillator('square', 150, 0.1, 0.1);
        createOscillator('sawtooth', 100, 0.05, 0.1);
    },
    typing: () => {
        initAudio();
        // Very short random click
        const freq = 600 + Math.random() * 200;
        createOscillator('triangle', freq, 0.03, 0.05);
    },
    success: () => {
        initAudio();
        // Ascending Arpeggio
        createOscillator('sine', 440, 0.2, 0.1, 0);       // A4
        createOscillator('sine', 554.37, 0.2, 0.1, 0.1); // C#5
        createOscillator('sine', 659.25, 0.4, 0.1, 0.2); // E5
        createOscillator('square', 880, 0.5, 0.05, 0.3); // A5 (sparkle)
    },
    error: () => {
        initAudio();
        createOscillator('sawtooth', 150, 0.3, 0.2);
        createOscillator('sawtooth', 100, 0.3, 0.2, 0.1);
    }
};