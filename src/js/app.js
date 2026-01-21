import navigationService from './services/NavigationService.js';
import cprService from './services/CprService.js';
import geoService from './services/GeolocationService.js';
import darkModeService from './services/DarkModeService.js';
import { renderHomeView, attachHomeListeners } from './components/HomeView.js';
import { renderGuideView, attachGuideListeners } from './components/GuideView.js';
import { renderCprView, attachCprListeners } from './components/CprView.js';
import { renderInfoView, attachInfoListeners, resetInfoView } from './components/InfoView.js';
import { renderDarkModeToggle, attachDarkModeListener } from './components/HeaderView.js';

/**
 * App Klasse - Hauptanwendung
 */
class App {
  constructor() {
    this.content = document.getElementById('content');
    this.homeBtn = document.getElementById('homeBtn');
    this.darkModeContainer = document.getElementById('darkModeToggleContainer');
    
    this.init();
  }

  init() {
    // Event Listeners
    this.homeBtn.addEventListener('click', () => {
      navigationService.goHome();
    });

    // Subscribe to navigation changes
    navigationService.subscribe(() => this.render());

    // Subscribe to CPR changes
    cprService.subscribe(() => {
      if (navigationService.getState().view === 'CPR') {
        this.render();
      }
    });

    // Subscribe to geolocation changes
    geoService.subscribe(() => {
      if (navigationService.getState().view === 'IDLE') {
        this.render();
      }
    });

    // Subscribe to dark mode changes
    darkModeService.subscribe(() => {
      this.renderHeader();
    });

    // Service Worker registrieren (PWA)
    this.registerServiceWorker();

    // Initial render
    this.renderHeader();
    this.render();
  }

  renderHeader() {
    // Dark Mode Toggle rendern
    if (this.darkModeContainer) {
      this.darkModeContainer.innerHTML = renderDarkModeToggle();
      attachDarkModeListener();
    }
  }

  render() {
    const { view } = navigationService.getState();
    
    let html = '';
    let attachListeners = null;

    switch (view) {
      case 'IDLE':
        html = renderHomeView();
        attachListeners = attachHomeListeners;
        break;
      
      case 'GUIDE':
        html = renderGuideView();
        attachListeners = attachGuideListeners;
        break;
      
      case 'CPR':
        html = renderCprView();
        attachListeners = attachCprListeners;
        break;
      
      case 'INFO':
        html = renderInfoView();
        attachListeners = attachInfoListeners;
        break;
      
      default:
        html = '<div class="text-center text-red-600 dark:text-red-400">Unbekannter View</div>';
    }

    this.content.innerHTML = html;
    
    if (attachListeners) {
      attachListeners();
    }
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registriert:', registration);
      } catch (error) {
        console.error('Service Worker Registrierung fehlgeschlagen:', error);
      }
    }
  }
}

// App starten
document.addEventListener('DOMContentLoaded', () => {
  new App();
});