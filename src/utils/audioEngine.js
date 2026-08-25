// Web Audio API Ambient Synthesizer & Sound FX Engine
// Generates dreamy celestial lo-fi melodies and tactile UI sound effects procedurally without needing heavy external audio files.

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.volume = 0.4;
    this.masterGain = null;
    this.ambientTimer = null;
    this.currentTrackIndex = 0;
    this.isMuted = false;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // Play a soft warm synth note
  playSynthNote(freq, duration = 1.8, type = "sine", gainAmount = 0.15) {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + duration);

      noteGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(gainAmount, this.ctx.currentTime + 0.1);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio note error:", e);
    }
  }

  // Ambient Celestial Lo-Fi Harmony Loop
  startAmbientMusic() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Dreamy pentatonic chord progressions
    const scales = [
      // F# major pentatonic dreamy
      [277.18, 329.63, 369.99, 440.0, 554.37, 659.25, 739.99],
      // Eb celestial
      [311.13, 349.23, 392.0, 466.16, 523.25, 622.25, 698.46],
      // D flat warm serenity
      [277.18, 311.13, 349.23, 415.3, 466.16, 554.37, 622.25],
    ];

    let noteIndex = 0;
    const playNextBar = () => {
      if (!this.isPlaying) return;

      const currentScale = scales[this.currentTrackIndex % scales.length];
      const root = currentScale[noteIndex % currentScale.length];
      const fifth = currentScale[(noteIndex + 2) % currentScale.length];
      const high = currentScale[(noteIndex + 4) % currentScale.length];

      // Play soft arpeggio
      this.playSynthNote(root, 2.5, "sine", 0.12);
      setTimeout(() => {
        if (this.isPlaying) this.playSynthNote(fifth, 2.2, "sine", 0.09);
      }, 400);
      setTimeout(() => {
        if (this.isPlaying) this.playSynthNote(high, 2.8, "triangle", 0.08);
      }, 900);

      noteIndex++;
      const nextDelay = 2200 + Math.random() * 800;
      this.ambientTimer = setTimeout(playNextBar, nextDelay);
    };

    playNextBar();
  }

  stopAmbientMusic() {
    this.isPlaying = false;
    if (this.ambientTimer) {
      clearTimeout(this.ambientTimer);
      this.ambientTimer = null;
    }
  }

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % 3;
  }

  // SFX: Sparkle Chime (for star clicks, card clicks, navigation)
  playChime() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    const notes = [587.33, 739.99, 880.0, 1174.66];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playSynthNote(freq, 0.8, "sine", 0.08);
      }, i * 70);
    });
  }

  // SFX: Star Catch Note (pleasant glockenspiel)
  playStarCatch(pitchMultiplier = 1) {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    const base = 523.25 * pitchMultiplier;
    this.playSynthNote(base, 1.2, "triangle", 0.14);
    setTimeout(() => {
      this.playSynthNote(base * 1.5, 0.9, "sine", 0.1);
    }, 80);
  }

  // SFX: Candle Blowout
  playBlowout() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    try {
      // Noise burst for puff
      const bufferSize = this.ctx.sampleRate * 0.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.masterGain);

      whiteNoise.start();
    } catch (e) {
      console.warn("Blowout audio error:", e);
    }
  }

  // SFX: Confetti Fanfare Pop
  playFanfare() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    const fanfareNotes = [440, 554.37, 659.25, 880, 1108.73];
    fanfareNotes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playSynthNote(freq, 1.5, "triangle", 0.15);
      }, idx * 110);
    });
  }

  // SFX: Wax Seal Open / Paper Rustle
  playUnseal() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    this.playSynthNote(350, 0.4, "sine", 0.08);
    setTimeout(() => {
      this.playSynthNote(520, 0.5, "sine", 0.06);
    }, 90);
  }
}

export const audioEngine = new SoundEngine();
