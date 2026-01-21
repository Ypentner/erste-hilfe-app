/**
 * Geolocation Service - Verwaltet Standort-Informationen
 */
class GeolocationService {
  constructor() {
    this.position = null;
    this.error = null;
    this.listeners = [];
    this.getCurrentPosition();
  }

  /**
   * Subscribe zu State-Änderungen
   */
  subscribe(callback) {
    this.listeners.push(callback);
    // Sofort mit aktuellem State aufrufen
    callback();
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
   * Standort ermitteln
   */
  getCurrentPosition() {
    if (!navigator.geolocation) {
      this.error = 'Geolocation wird nicht unterstützt';
      this.notify();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.position = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        this.error = null;
        this.notify();
      },
      (err) => {
        this.error = 'Standort konnte nicht ermittelt werden';
        console.error('Geolocation error:', err);
        this.notify();
      }
    );
  }

  /**
   * Getter für Position
   */
  getPosition() {
    return this.position;
  }

  /**
   * Getter für Error
   */
  getError() {
    return this.error;
  }
}

export default new GeolocationService();