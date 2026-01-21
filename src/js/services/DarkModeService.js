/**
 * Dark Mode Service - Verwaltet Dark/Light Theme
 */
class DarkModeService {
  constructor() {
    this.isDark = false;
    this.listeners = [];
    this.init();
  }

  /**
   * Initialisierung - Lade gespeicherte Präferenz
   */
  init() {
    // Prüfe localStorage
    const saved = localStorage.getItem('darkMode');
    
    if (saved !== null) {
      // Nutzer-Präferenz vorhanden
      this.isDark = saved === 'true';
    } else {
      // System-Präferenz nutzen
      this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    this.apply();
  }

  /**
   * Subscribe zu Theme-Änderungen
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
   * Toggle Dark Mode
   */
  toggle() {
    this.isDark = !this.isDark;
    localStorage.setItem('darkMode', this.isDark);
    this.apply();
    this.notify();
  }

  /**
   * Dark Mode aktivieren
   */
  enable() {
    if (!this.isDark) {
      this.toggle();
    }
  }

  /**
   * Dark Mode deaktivieren
   */
  disable() {
    if (this.isDark) {
      this.toggle();
    }
  }

  /**
   * Dark Mode auf HTML anwenden
   */
  apply() {
    if (this.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  /**
   * Getter für aktuellen State
   */
  getIsDark() {
    return this.isDark;
  }
}

export default new DarkModeService();