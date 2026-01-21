/**
 * CPR Service - Verwaltet Wiederbelebungs-Taktgeber
 */
class CprService {
  constructor() {
    this.isActive = false;
    this.count = 0;
    this.intervalId = null;
    this.audioContext = null;
    this.listeners = [];
  }

  /**
   * Subscribe zu State-Änderungen
   */
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  /**
   * Notify all listeners
   */
  notify() {
    this.listeners.forEach(callback => callback());
  }

  /**
   * CPR Taktgeber starten
   */
  start() {
    if (this.isActive) return;
    
    this.isActive = true;
    this.intervalId = setInterval(() => {
      this.tick();
    }, 545); // ~110 BPM
    this.notify();
  }

  /**
   * CPR Taktgeber stoppen
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isActive = false;
    this.count = 0;
    this.notify();
  }

  /**
   * Toggle CPR
   */
  toggle() {
    if (this.isActive) {
      this.stop();
    } else {
      this.start();
    }
  }

  /**
   * Einzelner Tick
   */
  tick() {
    this.count = (this.count + 1) % 31;
    this.playBeep();
    this.notify();
  }

  /**
   * Audio-Feedback
   */
  playBeep() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  /**
   * Getter für State
   */
  getState() {
    return {
      isActive: this.isActive,
      count: this.count
    };
  }
}

export default new CprService();