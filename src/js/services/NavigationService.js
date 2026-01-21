/**
 * Navigation Service - Verwaltet App-Navigation und State
 */
class NavigationService {
  constructor() {
    this.currentView = 'IDLE';
    this.currentStepId = 'START';
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
   * Navigate zu einem View
   */
  navigateTo(view, stepId = null) {
    this.currentView = view;
    if (stepId) {
      this.currentStepId = stepId;
    }
    this.notify();
  }

  /**
   * Zurück zum Home
   */
  goHome() {
    this.currentView = 'IDLE';
    this.currentStepId = 'START';
    this.notify();
  }

  /**
   * Nächster Schritt im Guide
   */
  nextStep(stepId) {
    if (stepId === 'FINISH') {
      this.goHome();
      return;
    }
    if (stepId === 'CPR_RUNNING') {
      this.currentView = 'CPR';
      this.notify();
      return;
    }
    this.currentStepId = stepId;
    this.currentView = 'GUIDE';
    this.notify();
  }

  /**
   * Getter für aktuellen State
   */
  getState() {
    return {
      view: this.currentView,
      stepId: this.currentStepId
    };
  }
}

export default new NavigationService();