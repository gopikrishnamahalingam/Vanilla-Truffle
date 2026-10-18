/**
 * Sound Manager with Web Audio API procedural synthesis + MP3 fallback support
 * Includes Kitchen Lab music box player (Kitchen_Lab_Sound.mp3 & procedural synth)
 * and page-turn storybook audio.
 */

class SoundManager {
  private isMuted: boolean = false;
  private audioCtx: AudioContext | null = null;
  private listeners: Array<(muted: boolean) => void> = [];

  // Kitchen Lab Music state
  private kitchenLabAudio: HTMLAudioElement | null = null;
  private isKitchenLabPlaying: boolean = false;
  private isKitchenLabMuted: boolean = false;
  private kitchenLabSynthTimer: ReturnType<typeof setInterval> | null = null;
  private kitchenLabListeners: Array<(playing: boolean, muted: boolean) => void> = [];

  constructor() {
    const saved = localStorage.getItem('vanillaTruffle_isMuted');
    this.isMuted = saved === 'true';
    const savedKitchenMute = localStorage.getItem('vanillaTruffle_kitchenMuted');
    this.isKitchenLabMuted = savedKitchenMute === 'true';
  }

  private initContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('vanillaTruffle_isMuted', String(this.isMuted));
    if (this.isMuted && this.isKitchenLabPlaying) {
      this.pauseKitchenLabAudio();
    }
    this.listeners.forEach((fn) => fn(this.isMuted));
    return this.isMuted;
  }

  public subscribe(listener: (muted: boolean) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public subscribeKitchenLab(listener: (playing: boolean, muted: boolean) => void): () => void {
    this.kitchenLabListeners.push(listener);
    return () => {
      this.kitchenLabListeners = this.kitchenLabListeners.filter((l) => l !== listener);
    };
  }

  private notifyKitchenLab() {
    this.kitchenLabListeners.forEach((fn) => fn(this.isKitchenLabPlaying, this.isKitchenLabMuted));
  }

  // --- KITCHEN LAB REAL AUDIO ENGINE ---
  public getKitchenLabState() {
    return {
      isPlaying: this.isKitchenLabPlaying,
      isMuted: this.isKitchenLabMuted,
    };
  }

  public toggleKitchenLabMute(): boolean {
    this.isKitchenLabMuted = !this.isKitchenLabMuted;
    localStorage.setItem('vanillaTruffle_kitchenMuted', String(this.isKitchenLabMuted));
    if (this.kitchenLabAudio) {
      this.kitchenLabAudio.muted = this.isKitchenLabMuted || this.isMuted;
    }
    this.notifyKitchenLab();
    return this.isKitchenLabMuted;
  }

  public toggleKitchenLabAudio() {
    if (this.isKitchenLabPlaying) {
      this.stopKitchenLabAudio();
    } else {
      this.startKitchenLabAudio();
    }
  }

  public startKitchenLabAudio() {
    this.initContext();
    this.isKitchenLabPlaying = true;
    this.notifyKitchenLab();

    // 1. Try real audio file: Kitchen_Lab_Sound.mp3
    if (!this.kitchenLabAudio) {
      this.kitchenLabAudio = new Audio('/assets/audio/Kitchen_Lab_Sound.mp3');
      this.kitchenLabAudio.loop = true;
      this.kitchenLabAudio.volume = 0.55;
    }

    this.kitchenLabAudio.muted = this.isKitchenLabMuted || this.isMuted;

    const playPromise = this.kitchenLabAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback to Web Audio API procedural music box synthesizer
        this.startProceduralKitchenMusicBox();
      });
    }
  }

  public pauseKitchenLabAudio() {
    if (this.kitchenLabAudio) {
      this.kitchenLabAudio.pause();
    }
    this.stopProceduralKitchenMusicBox();
  }

  public stopKitchenLabAudio() {
    this.isKitchenLabPlaying = false;
    if (this.kitchenLabAudio) {
      this.kitchenLabAudio.pause();
      this.kitchenLabAudio.currentTime = 0;
    }
    this.stopProceduralKitchenMusicBox();
    this.notifyKitchenLab();
  }

  // Procedural Music Box Synth for Kitchen Lab
  private startProceduralKitchenMusicBox() {
    this.stopProceduralKitchenMusicBox();
    if (!this.audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5, 987.77, 880.0, 659.25, 783.99]; // C5, E5, G5, C6, B5, A5, E5, G5
    let step = 0;

    const playNextNote = () => {
      if (!this.isKitchenLabPlaying || this.isKitchenLabMuted || this.isMuted || !this.audioCtx) return;
      const freq = notes[step % notes.length];
      step++;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    };

    playNextNote();
    this.kitchenLabSynthTimer = setInterval(playNextNote, 600);
  }

  private stopProceduralKitchenMusicBox() {
    if (this.kitchenLabSynthTimer) {
      clearInterval(this.kitchenLabSynthTimer);
      this.kitchenLabSynthTimer = null;
    }
  }

  // --- STORYBOOK PAGE-TURN FLIP SOUND ---
  public playPageTurn() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      // Synthesize soft page rustle using filtered noise & frequency swoosh
      const bufferSize = this.audioCtx.sampleRate * 0.16;
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.audioCtx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 0.08);
      filter.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      filter.Q.setValueAtTime(3.0, now);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.16);

      // Add a subtle paper whoosh tone
      const osc = this.audioCtx.createOscillator();
      const oscGain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);
      oscGain.gain.setValueAtTime(0.04, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(oscGain);
      oscGain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // safe fallback
    }
  }

  // Cute baby dragon chirp / "Ouchy" squeak
  public playDragonOuch() {
    if (this.isMuted) return;
    this.initContext();

    const audio = new Audio('/assets/audio/Vanilla_Truffle_Voice.mp3');
    audio.play().catch(() => {
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(1180, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(850, now + 0.18);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.23);
    });
  }

  // Biscuit bite crunch
  public playBite() {
    if (this.isMuted || !this.audioCtx) {
      this.initContext();
      if (this.isMuted || !this.audioCtx) return;
    }

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.07);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Biscuit yummy celebration
  public playYummy() {
    if (this.isMuted || !this.audioCtx) {
      this.initContext();
      if (this.isMuted || !this.audioCtx) return;
    }

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime + idx * 0.09;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    });
  }

  // Magical sparkle chime
  public playSparkle() {
    if (this.isMuted || !this.audioCtx) {
      this.initContext();
      if (this.isMuted || !this.audioCtx) return;
    }

    const notes = [587.33, 739.99, 880.0, 1174.66, 1479.98];
    notes.forEach((freq, idx) => {
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime + idx * 0.06;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.32);
    });
  }

  // Ingredient select / bubble
  public playBubble() {
    if (this.isMuted || !this.audioCtx) {
      this.initContext();
      if (this.isMuted || !this.audioCtx) return;
    }

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.1);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  // Fire explosion burst
  public playFire() {
    if (this.isMuted || !this.audioCtx) {
      this.initContext();
      if (this.isMuted || !this.audioCtx) return;
    }

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(60, now + 0.45);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.52);
  }

  // Fridge discover / achievement
  public playFridgeUnlock() {
    if (this.isMuted || !this.audioCtx) {
      this.initContext();
      if (this.isMuted || !this.audioCtx) return;
    }

    const arpeggio = [440, 554.37, 659.25, 880, 1108.73];
    arpeggio.forEach((freq, idx) => {
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime + idx * 0.08;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.42);
    });
  }

  // Cooking success fanfare
  public playCookingSuccess() {
    if (this.isMuted || !this.audioCtx) {
      this.initContext();
      if (this.isMuted || !this.audioCtx) return;
    }

    const chords = [523.25, 659.25, 783.99, 987.77, 1046.5];
    chords.forEach((freq, i) => {
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime + i * 0.07;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.13, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.38);
    });
  }
}

export const sounds = new SoundManager();
