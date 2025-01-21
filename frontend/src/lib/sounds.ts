// Sound effects using Web Audio API
class SoundEffects {
    private context: AudioContext;
    private gainNode: GainNode;
  
    constructor() {
      this.context = new AudioContext();
      this.gainNode = this.context.createGain();
      this.gainNode.connect(this.context.destination);
      this.gainNode.gain.value = 0.3; // Set default volume
    }
  
    private createOscillator(frequency: number, duration: number) {
      const oscillator = this.context.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      oscillator.connect(this.gainNode);
      oscillator.start();
      oscillator.stop(this.context.currentTime + duration);
    }
  
    hover() {
      this.createOscillator(440, 0.1); // A4 note
    }
  
    select() {
      this.createOscillator(523.25, 0.15); // C5 note
    }
  
    complete() {
      // Play a short ascending arpeggio
      this.createOscillator(523.25, 0.1); // C5
      setTimeout(() => this.createOscillator(659.25, 0.1), 100); // E5
      setTimeout(() => this.createOscillator(783.99, 0.2), 200); // G5
    }
  }
  
  export const sounds = new SoundEffects();